function startQuiz() {
    $('#start-btn').on('click', function(event){
      displayquestion();
    }
    );
  }
  
  function tryAgain() {
    $('body').on('click','#restart', (event) => {
      displayquestion();
    });
  }
  
  function questionArray() {
    $('body').on('click','#next-btn', (event) => {
      STORE.questionAsked === STORE.questions.length?displayResults() : displayquestion();
    });
  }
  
  
  function displayquestion() {
    let question = STORE.questions[STORE.questionAsked];
    updateQuestionAndScore();
    const questionDisplayed = $(`
    <div>
      <form id="question_list" class="questionbutton">
        
        <fieldset>
          <div class="starting_content question">
            <div class="other_content">
              <legend> ${question.question}</legend>
            </div>
          </div>
  
          <div class="starting_content options">
            <div class="other_content">
              <div class="choices"> </div>
          </div>
        </div>
      
  
        <div class="starting_content">
          <div class="other_content">
            <button type ="submit" id="answer" >Submit</button>
            <button type ="button" id="next-btn" class="next-btn btn"> Next Question</button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);
  $("main").html(questionDisplayed);
  updateOptions();
  $("#next-btn").hide();
  }
  
  function updateQuestionAndScore() {
    const html = $(`<ul>
        <li id="answered">Questions Number: ${STORE.questionAsked + 1}/${STORE.questions.length}</li>
        <li id="q_scored">Score: ${STORE.score}/${STORE.questions.length}</li>
      </ul>`);
    $(".question-and-score").html(html);
  }
  
  function updateOptions()
  {
    let question = STORE.questions[STORE.questionAsked];
    for(let i=0; i<question.options.length; i++)
    {
      $('.choices').append(`
          <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
          <label for="option${i+1}"> ${question.options[i]}</label> <br/>
          <span id="js-r${i+1}"></span>
      `);
    }
    
  }
  
  function displayResults() {
    let finalScore = $(
      `<div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div class="starting_content">
              <div class="other_content">
                <p id="scoreboard">You have scored: ${STORE.score}/${STORE.questions.length}</p>
              </div>
            </div>
          
            <div class="starting_content">
              <div class="ending">
                <button type="button" id="restart"> Try Again! </button>
              </div>
            </div>
          </fieldset>
      </form>
      </div>`);
      STORE.questionAsked = 0;
      STORE.score = 0;
    $("main").html(finalScore);
  }
  
  
  
  function checkAnswer() {
    $('body').on("submit",'#question_list', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions[STORE.questionAsked];
      let selectedOption = $("input[name=options]:checked").val();
      if (!selectedOption) {   
      alert("You must answer the question before pressing submit!");
        return;
      } 
      let id_num = currentQues.options.findIndex(i => i === selectedOption);
      let id = "#js-r" + ++id_num;
      $('span').removeClass("correct-answer incorrect-answer");
      if(selectedOption === currentQues.answer) {
        STORE.score++; 
        $(`${id}`).append(`Correct!`);
        $(`${id}`).addClass("correct-answer");
      }
      else {
        $(`${id}`).append(`Incorrect! <br/> The answer is "${currentQues.answer}"<br/>`);
        $(`${id}`).addClass("incorrect-answer");
      }
  
      STORE.questionAsked++;
      $("#q_scored").text(`Score: ${STORE.score}/${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
      $('#next-btn').show();
    });
  }
  
  
  function runApp() {
    startQuiz();
    questionArray();
    checkAnswer();
    tryAgain();
  }
  
  $(runApp);
