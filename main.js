song = ""

srw = 0;
slw = 0;

rwX = 0;
rwY = 0;

lwX = 0;
lwY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500)

    fill("#FF0000")
    stroke("#FF0000")

    if(srw > 0.2){
        circle(rwX, rwY, 20)

        if(rwY >0 && rwY <= 100){
             document.getElementById("speed").innerHTML = "Speed = 0.5x"; 
             song.rate(0.5); 
            }
            else if(rwY >100 && rwY <= 200)
            {
                document.getElementById("speed").innerHTML = "Speed = 1x"; 
                song.rate(1); 
            }
            else if(rwY >200 && rwY <= 300)
            {
                document.getElementById("speed").innerHTML = "Speed = 1.5x"; 
                song.rate(1.5); 
            }
            else if(rwY >300 && rwY <= 400)
            {
                document.getElementById("speed").innerHTML = "Speed = 2x"; 
                song.rate(2); 
            }
                else if(rwY >300 && rwY <= 500)
            {
                document.getElementById("speed").innerHTML = "Speed = 2.5x"; 
                song.rate(2.5); 
            }
    }

    if(slw > 0.2){
        circle(lwX, lwY,20)
        inlwY = Number(lwY)
        nlwY = floor(inlwY *2)
        lwY_d_1000 = nlwY/1000
        document.getElementById("volume").innerHTML = "volume = " + lwY_d_1000
        song.setVolume(lwY_d_1000) 
    }
}

function modelLoaded(){
    console.log("uuhhh.wav")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results[0])

        srw = results[0].pose.keypoints[10].score;
        slw = results[0].pose.keypoints[9].score;

        rwX = results[0].pose.rightWrist.x;
        rwY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rwX + "rightWristY = " + rwY)

        lwX = results[0].pose.leftWrist.x;
        lwY = results[0].pose.leftWrist.y;
    }
}

function preload(){
    song = loadSound("bomb.mp4")
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
    document.getElementById("player").disabled = true
    document.getElementById("pauser").disabled = false
}

function pause(){
    song.pause()
    document.getElementById("player").disabled = false
    document.getElementById("pauser").disabled = true
}