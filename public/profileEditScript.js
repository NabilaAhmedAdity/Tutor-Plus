$(document).ready(function(){
    $("a#classesAndSubjects").click(function(){
        alert(uid);
        const txt = prompt("Classes And Subjects:", "Class 1 to 5 All");
        if (!(txt == null || txt == "")) {
            /*
            $.post("/"+session.uid+"/profile/classesAndSubjects",
            {
              txt: txt,
            },
            function(status){
                alert("Status: " + status);
            });
            */

            var data = {};
            data.txt = txt;

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/profile/classesAndSubjects',                      
                success: function(data, status) {
                    console.log(status);
                    console.log(data);
                }
            });
        }
    });
});