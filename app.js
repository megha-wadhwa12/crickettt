//strike button
var strikeButton = document.querySelector("#strike");
//reset button
var resetButton = document.querySelector("#reset");

//score tags
var team1score_tag = document.getElementById("score-team1");
var team2score_tag = document.getElementById("score-team2");

//wicket tags
var team1Wicket_tag = document.getElementById("wicket-team1");
var team2Wicket_tag = document.getElementById("wicket-team2");

//audio variables
var strikeAudio = new Audio("http://bit.ly/so-ball-hit");
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

//variables to keep track of game
var team1Score = 0;
var team2Score = 0;
var team1Wickets = 0;
var team2Wickets = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

var possibleOutcomes = [0,1,2,4,6,"W"];

// console.log(possibleOutcomes[6]);

// console.log(Math.random())

strikeButton.addEventListener("click",strikeButtonClicked);

function strikeButtonClicked(){
    //Audio Play
    strikeAudio.pause();//pause the previous playing audio
    strikeAudio.currentTime = 0;//bring the time to 0
    strikeAudio.play();

    //random value choosing
    var randomness = Math.random();
    console.log("randomness:" ,randomness);
    var random1 = randomness* possibleOutcomes.length;
    var randomIndex = Math.floor(random1);
    console.log("RandomIndex:" ,randomIndex);
    var randomValue = possibleOutcomes[randomIndex];
    console.log("randomValue: ",randomValue);

    //Pakistan batting
    if (turn==2){
        team2BallsFaced++;
        var ball =document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`)
        ball.innerHTML = randomValue;

        if (randomValue=="W"){
            team2Wickets++;
        }else{
            //team2Score = team2Score + randomValue
            team2Score+=randomValue;
        }

        if(team2Score>team1Score || team2Wickets==2 || team2BallsFaced==6){
            turn = 3;
        setTimeout(()=>{
            gameOver();
        },10)
        }

        updateScore()
    }

    //India batting
    if (turn==1){
        team1BallsFaced++;
        var ball = document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`)
        ball.innerHTML = randomValue;

    //if random Element is wicket then increase wicket count by 1 or just add that random value to score of team-1
        if (randomValue=="W"){
            team1Wickets++;
        }else{
            //team1Score = team1Score + randomValue
            team1Score+=randomValue;
        }

        if(team1BallsFaced == 6 || team1Wickets == 2){
            turn = 2;
        }
        updateScore()
    }

function updateScore(){
    team1score_tag.innerHTML = team1Score;
    team1Wicket_tag.innerHTML = team1Wickets;
    team2score_tag.innerHTML = team2Score;
    team2Wicket_tag.innerHTML = team2Wickets;
}

function gameOver(){
    gameOverAudio.play("http://bit.ly/so-crowd-cheer")
    if(team1Score>team2Score){
        alert("INDIA WINS");
    }else if(team1Score<team2Score){
        alert("PAKISTAN WINS");
    }else{
        alert("It's a tie");
    }
    document.querySelectorAll(".ball").forEach(e=>{
        if(e.innerHTML==""){
            e.innerHTML = "X"
            e.style.backgroundColor = "grey";
        }
    })
  }
}

resetButton.addEventListener("click",resetFunction);

function resetFunction(){
    window.location.reload();
}