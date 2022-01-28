video = "";
status = "";
object_name = "";

function setup()
{
    canvas = createCanvas(360, 360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function Start()
{
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 400, 400);
}