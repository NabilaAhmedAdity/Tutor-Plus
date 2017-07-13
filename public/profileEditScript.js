$(document).ready(function(){
    $("a#classesAndSubjects").click(function(){
        const txt = prompt("Classes And Subjects:", "Class 1 to 5 All");
        if (!(txt == null || txt == "")) {
            var data = {};
            data.txt = txt;
            data.type = "classesAndSubjects";
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/'+uid+'/profile/add',                      
                success: function(data, status) {
                    if (status === 'success') {
                        $("ul#classesAndSubjectsList").append("<li>"+txt+"</li>");
                    }
                }
            });
        }
    });
});