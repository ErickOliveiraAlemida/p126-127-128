var music = ""
var pulsoEsquerdoY = 0
var pulsoDireitoY = 0
var pulsoEsquerdoX = 0
var pulsoDireitoX = 0
var pontosDoPulsoEsquerda = 0
var pontosDoPulsoDireito = 0

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
    if (pontosDoPulsoDireito > 0){
    circle(pulsoDireitoX, pulsoDireitoY, 30)
    if(pulsoDireitoY > 0 && pulsoDireitoY <= 100){
        music.rate(0.5)
        document.getElementById("speed").innerHTML = "velocidade = 0.5X"
    }else if(pulsoDireitoY > 100 && pulsoDireitoY <= 200){
        music.rate(1)
        document.getElementById("speed").innerHTML = "velocidade = 1.X"
    }else if(pulsoDireitoY > 200 && pulsoDireitoY <= 300){
        music.rate(1.5)
        document.getElementById("speed").innerHTML = "velocidade = 1.5X"
    }else if(pulsoDireitoY > 300 && pulsoDireitoY <= 400){
        music.rate(2)
        document.getElementById("speed").innerHTML = "velocidade = 2.X"
    }else if(pulsoDireitoY > 400 && pulsoDireitoY <= 500){
        music.rate(2.5)
        document.getElementById("speed").innerHTML = "velocidade = 2.5X"
    }
}
    if (pontosDoPulsoEsquerda > 0){
    circle(pulsoEsquerdoX, pulsoEsquerdoY, 30)
    volume = floor(Number(pulsoEsquerdoX)/50)
    document.getElementById("volume").innerHTML = "volume = " + volume
    music.setVolume(volume)
    }
}

function modelLoad(){
    console.log("modelo carregado")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        pontosDoPulsoEsquerda = results[0].pose.keypoints[9].score
        pontosDoPulsoDireito = results[0].pose.keypoints[10].score
        pulsoEsquerdoX = results[0].pose.leftWrist.x
        pulsoEsquerdoY = results[0].pose.leftWrist.y
        pulsoDireitoX = results[0].pose.rightWrist.x
        pulsoDireitoY = results[0].pose.rightWrist.y
    }
}