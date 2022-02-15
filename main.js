status = "";
object = [];
video = "";
object_name = "";
object_label = "";

function setup()
{
    canvas = createCanvas(360, 360);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(360, 360)
}

function start()    
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}



function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }else{
        console.log(results);
        object = results;
    }
}


function draw()
{
    image(video, 0, 0, 360, 360);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i = object.length; i++)
        {
            percent = floor(object[i].confidence * 100);
            object_label = object[i].label;
            text(object_label + " " + percent + "%", object[i].x, object[i].y);
            fill("red");
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y , object[i].width, object[i].height);
            
        if(object[i].label == object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = object_name + "Found";

            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance('Object Mentioned Found');
            synth.speak(utterThis);
        }

    else{
        document.getElementById("status").innerHTML = "Object Mentioned Not Found";
    }
}
    }
}