var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).one('keypress', function (e) {
        started = true;
    $("#level-desc").text(" ");
        nextSequence();

});


$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    //  animatePress(userChosenColour);
});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



function nextSequence() {
  userClickedPattern = [];
  level= level+1;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
    //console.log(userClickedPattern);

};

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
