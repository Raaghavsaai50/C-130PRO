song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftwrist=0
scoreRightwrist=0;

song1_status="";
song2_status="";

function preload()
{
	song1 = loadSound("music.mp3");
	song2 = loadSound("music2.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {	
	console.log(results);
    scoreLeftwrist=results[0].pose.keypoints[9].score;
    scoreRightwrist=results[0].pose.keypoints[10].score;
	console.log("scoreLeftwrist = "+scoreLeftwrist+" scoreRightwrist = "+scoreRightwrist);

	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("#ff0000");
	stroke("#ff0000");
	if(scoreLeftwrist>0.2){
		circle(leftWristX,leftWristY,20);
		song2.stop();
		if(song1_status==false){
			song1.play();
			document.getElementById("song").innerHTML="Harry potter theme";
		}
	}
    if(scoreRightwrist>0.2){
		circle(rightWristX,rightWristY,20);
		song1.stop();
		if(song1_status==false){
			song2.play();
			document.getElementById("song").innerHTML="Uptown funk";
		}
}
}

function play()
{
	song1.play();
	song1.setVolume(1);
	song1.rate(1);
}