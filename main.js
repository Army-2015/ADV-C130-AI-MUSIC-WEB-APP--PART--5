var leftWristX = 0;
var leftWristY = 0;
var score_leftWrist = 0;

var rightWristX = 0;
var rightWristY = 0;
var score_rightWrist = 0;

var leftWrist_piano_music_song1_status = "";
var rightWrist_guitar_music_song2_status = "";

function preload(){
    leftWrist_piano_music_song1 = loadSound("piano_music.mp3");
    rightWrist_guitar_music_song2 = loadSound("guitar_music.mp3");
}

function setup(){
    canvas = createCanvas(450, 450);
    canvas.position(530, 455);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Model is Loaded !");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X position = " + leftWristX);
        console.log( "Left Wrist Y position = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X position = " + rightWristX);
        console.log("Right Wrist Y position = " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 450, 450);  
    fill("#FF0000");
    stroke("#FF0000");

    leftWrist_piano_music_song1_status = leftWrist_piano_music_song1.isPlaying();
    rightWrist_guitar_music_song2_status = rightWrist_guitar_music_song2.isPlaying();

    if(score_leftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        rightWrist_guitar_music_song2.stop()
        if(leftWrist_piano_music_song1_status = "false")
        {
            leftWrist_piano_music_song1.play();
            document.getElementById("song_btn").innerHTML = "Piano music is playing!";
        }
    }    

    if(score_rightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,  20)
        leftWrist_piano_music_song1.stop()
        if(rightWrist_guitar_music_song2_status = "false")
        {
            rightWrist_guitar_music_song2.play();
            document.getElementById("song_btn").innerHTML = "Guitar Music is playing!";
        }
    }
}