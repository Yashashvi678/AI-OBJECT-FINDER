status = "";
video = "";
objects = [];
object_name = "";

function setup()
{
    canvas = createCanvas(360, 360);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}   

function start()
{
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;  
}

function draw()
{
    image(video, 0, 0, 400, 400);

    if(status != "")
    {
        ObjectDetector.detect(video, gotResult);
        for(i = 0 ; i = objects[i].length ; i++)
        {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            document.getElementById("number_if_objects").innerHTML = "Number Of Objects Detected Are : " + objects[i].length;

            fill("green");
            percent = floor(objects[i].confidence * 100);
            noFill();
            stroke("green");
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            
            if(objects[i].label == object_name)
           {
             video.stop();
             objectDetector.detect(gotResult);
             document.getElementById("number_of_objects").innerHTML = object_name + " Found";
             synth = window.speechSynthesis;
             utterThis = new SpeechSynthesisUtterance(object_name + "Found");
             synth.speak(utterThis);
           }
           else
           {
             document.getElementById("number_of_objects").innerHTML = object_name + " Not Found";
           }     
       }
            
        }

    }

function gotResult(error, results)
{
    if(error)
    {
        console.error();
    }else{
        console.log(results);
        objects = results;
    }
}