$(document).ready(function(){
    $("a#trigger").hover(function(){
    	$(this).parents("#external-card").children("div#pop-up").show();
        $(this).parents("#external-card").css("background-color", "#FFFF99");
        }, function(){
        $(this).parents("#external-card").children("div#pop-up").hide();
        $(this).parents("#external-card").css("background-color", "white");
    });
});