status = "";
objects = [];

function setup()
{
    canvas = createCanvas(360, 360);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(360, 360)
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function start()    
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
        console.log(results);
        objects = results;
}



function draw()
{
    image(video, 0, 0, 360, 360);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {   
            document.getElementById("status").innerHTML = "Status : Object Detected";
          
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            fill("red");
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            
        if(objects[i].label == object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("number_of_objects").innerHTML = object_name + "Found";

            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
        }

    else{
        document.getElementById("number_of_objects").innerHTML = object_name + "Not Found";
         }
       }
   }
}