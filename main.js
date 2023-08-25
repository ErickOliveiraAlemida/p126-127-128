var music = ""
var music2 = ""
var pulsoEsquerdoY = 0
var pulsoDireitoY = 0
var pulsoEsquerdoX = 0
var pulsoDireitoX = 0
function setup (){
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoad)
    poseNet.on("pose", gotPoses)
}

function preload (){
    music = loadSound("music.mp3")
    music2 = loadSound("music2.mp3")
}

function play (){
    music.play()
    music.setVolume(1)
    music.rate(1)
}

function draw (){
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("#FF0000")
    circle(pulsoEsquerdoX, pulsoEsquerdoY, 30)
    circle(pulsoDireitoX, pulsoDireitoY, 30)  
}

function modelLoad(){
    console.log("modelo carregado")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        pulsoEsquerdoX = results[0].pose.leftWrist.x
        pulsoEsquerdoY = results[0].pose.leftWrist.y
        pulsoDireitoX = results[0].pose.leftWrist.x
        pulsoDireitoY = results[0].pose.leftWrist.y
    }
}