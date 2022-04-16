function setup(){
    canvas= createCanvas(280,280)
    background("white")
    canvas.center()
    canvas.mouseReleased(ClassifyCanvas)
    synth= window.speechSynthesis
}
function preload(){
classifier = ml5.imageClassifier('DoodleNet')
}
function draw(){
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed){
        line(pmouseX , pmouseY , mouseX , mouseY)
    }
}
function ClassifyCanvas(){
    classifier.classify(canvas , gotResults)
}
function gotResults(error , results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_doodle").innerHTML="Label: "+results[0].label
        document.getElementById("result_confidence").innerHTML="Confidence: "+Math.round(results[0].confidence * 100)+ "%"
        utterThis=new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterThis)
    }
}

function clearCanvas(){
    background("white")
}