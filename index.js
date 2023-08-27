var userClickedPattern=[];
var gamePattern =[];
var buttonColor=["green","red","yellow","blue"];

$(".btn").click(function () {
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 ;
});
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
    

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    
   
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    
        $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
        animatePress(randomChosenColor);
}
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence()},1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    level =0;
    gamePattern=[];
    started=false;
}
var started =false;
var level =0;
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }

});

