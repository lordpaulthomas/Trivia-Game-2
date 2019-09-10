$('#start').on('click', function(){
    $('#start').remove();
    console.log(game.loadQuestion)
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
  game.clicked(e);
})

const questions = [
  {
      question: "Who becomes the Minister for Magic When Cornelius Fudge resigns?",
      answers: ["Rufus Scrimgeour","Professor Umbridge","Professor Snape","Mr Crouch"],
      correctAnswer: "Rufus Scrimgeour",
  },
  {
      question: "How many brothers and sisters does Ron have?",
      answers: ["2", "6", "5", "8" ],
      correctAnswer: '6',
  },
  {
      question: "Who was Ginny Weasley's first boyfriend?",
      answers: ["Dean Thomas", "Harry Potter","Michael Corner", "Draco Malfoy"],
      correctAnswer: 'Michael Corner'
  },
  {
      question: "What profession are Hermoine Granger's Muggle parents?",
      answers: ['Chefs', 'Dentists', 'Opticians', 'Artists'],
      correctAnswer: 'Dentists'
  },
  {
      question: "What was Fred and George's joke shop's name?",
      answers: ["Wizard's Tricks", "Weasley's Wizarding Gadets", "Weasley's Wizard Wheezes", 'Cloaks and Jokes'],
      correctAnswer: "Weasley's Wizard Wheezes"
  },
  {
      question: "What is the position that Harry Potter played on the Quidditch team?",
      answers: ['Beater', 'Keeper', 'Chaser', 'Seeker'],
      correctAnswer: 'Seeker'
  },
  {
      question: "What is Hermione Granger's Patronus?",
      answers: ['otter', 'horse', 'fox','rabbit'],
      correctAnswer: 'otter'
  },
  {
      question: "What color are Dobby the House Elf's eyes?",
      answers: ['Brown', 'Green', 'Blue', 'Black'],
      correctAnswer: 'Green'
  },
  {
      question: "What spell does Gilderoy Lockhart accidentally cast on himself in Harry Potter and the Chamber of Secrets?",
      answers: ['Sectumsempra', 'Imperio','Expelliarmus', 'Obliviate'],
      correctAnswer: 'Obliviate'
  },
  {
      question: "What does Vernon Dursley's company sell?",
      answers: ['Drills', 'Cars', 'Software', 'Furniture'],
      correctAnswer: 'Drills'
  }

]
$(document).on('click','#reset', function (){
  game.reset();
})
var audioElement = document.createElement("audio");
// attach to mp3 file
audioElement.setAttribute("src", "./assests/images/harry-potter-dubstep-remix.mp3");
// play audio button 
$(".theme-button").on("click", function () {
    audioElement.play();
});
// pause audio button
$(".pause-button").on("click", function () {
    audioElement.pause();
});
var game = {
  questions: questions,
  currentQuestion:0,
  counter: 30,
  correct: 0,
  incorrect: 0,
  unanswered:0,
  countdown: function(){
    game.counter--;
    $('#counter').html(game.counter);
    if(game.counter<=0){
      console.log('time up!');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000)  
    $('#subwrapper').html("<h2>Time Remaining <span id='counter' class='sec'>30</span> Seconds</h2>")
    $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>')
    for(let i = 0; i < questions[game.currentQuestion].answers.length;i++){
      $('#subwrapper').append('<button class="answer-button" id="button-'+i+'"data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
    }
  },
  nextQuestion: function(){
    game.counter = 30;
    $('#counter').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function(){
    clearInterval(timer);
    $('#subwrapper').html("<h2>OUT OF TIME!</h3>");
    $('#subwrapper').html("<h3>The Correct Answer Was: " + questions[game.currentQuestion].correctAnswer+"</h3")
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3*1000)
    } else {
    setTimeout(game.nextQuestion,3*1000)
    }
    game.unanswered++
  },
  results: function(){
    clearInterval(timer);
    $('#subwrapper').html("<h2>ALL DONE</h2>");
    $('#subwrapper').append("<h3>Correct: " + game.correct+"</h3>");
    $('#subwrapper').append("<h3>Incorrect: " + game.incorrect+"</h3>");   
    $('#subwrapper').append("<h3>Unaswered: " + game.unanswered+"</h3>");
    $('#subwrapper').append("<button id='reset'>Reset</button>")



  },
  clicked: function(e){
    clearInterval(timer);
    if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
      game.answeredCorrectly();
    } else {
      game.answeredIncorrectly();
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    $('#subwrapper').html("<h2>YOU GOT IT RIGHT!</h2>")
    $('#subwrapper').append("<img src='https://media.giphy.com/media/8l1UFvNSS5SwM/giphy.gif'>")
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3*1000)
    } else {
    setTimeout(game.nextQuestion,3*1000)
    }
  },
  answeredIncorrectly: function(){
    clearInterval(timer);
    game.incorrect++;
    $('#subwrapper').html("<h2>YOU GOT IT WRONG!</h2><h3>The Correct Answer Was: " + questions[game.currentQuestion].correctAnswer+"</h3")
    $('#subwrapper').append("<img src='https://media.giphy.com/media/720g7C1jz13wI/source.gif'></img>")
    if(game.currentQuestion==questions.length-1){
      setTimeout(game.results,3*1000)
    } else {
    setTimeout(game.nextQuestion,3*1000)
    }
  },
  reset: function(){
    game.currentQuestion = 0;
    game.counter = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    game.loadQuestion();
  }
}