$(document).ready(function(){
    myFunction = function(promptMsg1, promptMsg2, dataType, list) {
        const txt = prompt(promptMsg1, promptMsg2);
        if (!(txt == null || txt == "")) {
            const data = {};
            data.txt = txt;
            data.type = dataType;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/'+uid+'/profile/add',                      
                success: function(data, status) {
                    if (status === 'success') {
                        $("ul#"+list).append("<li>"+txt+"</li>");
                    }
                }
            });
        }
    }

    $("a#classesAndSubjects").click(function(){
        myFunction("Classes And Subjects:", "Class 1 to 5 All", 
            "classesAndSubjects", "classesAndSubjectsList");
    });

    $("a#educationalBackground").click(function(){
        myFunction("Background:", "School from Willes Little Flower", 
            "educationalBackground", "educationalBackgroundList");
    });

    $("a#experiences").click(function(){
        myFunction("Experience:", "Two years teaching experience", 
            "experiences", "experiencesList");
    });

    $("a#times").click(function(){
        myFunction("Time:", "Monday 10am - 2pm", 
            "times", "timesList");
    });
    
    $("a#contactNumbers").click(function(){
        myFunction("Contact Number:", "", 
            "contactNumbers", "contactNumbersList");
    });

    $("a#currentAddress").click(function(){
        const txt = prompt("Current Address:", "598 Block-C, Malibagh Chowdhury Para, Dhaka-1219");
        if (!(txt == null || txt == "")) {
            const data = {};
            data.txt = txt;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/'+uid+'/profile/currentAddress',                      
                success: function(data, status) {
                    if (status === 'success') {
                        $("p#currentAddress").text(txt);
                    }
                }
            });
        }
    });

    $("a#awardsAndAccomplishments").click(function(){
        myFunction("Awards and Accomplishments:", "Daily Start award in A'Level", 
            "awardsAndAccomplishments", "awardsAndAccomplishmentsList");
    });

    $('#uploadForm').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                const a = document.createElement("a");
                const newItem = document.createElement("li");
                a.textContent = (response.name).toString();
                a.setAttribute('href', "/download/"+(response.path).toString());
                newItem.appendChild(a);
                $("ul#certificatesList").append(newItem);
                $("#status").empty();
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });   

    $('#uploadForm2').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                const a = document.createElement("a");
                const newItem = document.createElement("li");
                a.textContent = (response.name).toString();
                a.setAttribute('href', "/download/"+(response.path).toString());
                newItem.appendChild(a);
                $("ul#sampleResourcesList").append(newItem);
                $("#status").empty();
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });    
});