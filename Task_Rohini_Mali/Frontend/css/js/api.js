$(document).ready(function(){
    $(".page").removeClass("active");
    $("#login").addClass("active");

    let currentUser=null;

    $.post("/api/login",{username,})
})