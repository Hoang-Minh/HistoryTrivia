$(document).ready(function(){
    var pickedQuestion = null;
    var randomIndex;
    var win = 0;
    var loss = 0;
    var timeToAnswer = 5; // time in seconds to have to answer a question
    var count = timeToAnswer;
    var timer = null;

    // Set of questions
    var options = [
        {
            question : "Who was the first American astronaut that landed on the moon in 1969?",
            choice : ["Donald Trump", "Lance Armstrong", "Neil Armstrong"],
            answer : 2,
            image : "assets/images/neil-armstrong.jpg"
        },
        {
            question : "Which major battle of WWII started on August 23, 1942 and was fought in what is now the city of Volgograd?",
            choice : ["The Battle of Normandy", "The Battle of Stalingrad", "D-Day"],
            answer : 1,
            image : "assets/images/stalingrad.jpg"
        },
        {
            question : "The Principality of Monaco is a sovereign city-state bordered on three sides by which country?",
            choice : ["France", "Germany", "Italy"],
            answer : 0,            
            image : "assets/images/france.jpg"
        },
        {
            question : "Who is credited with the assassination of American outlaw Jesse James?",
            choice : ["Gerald Ford", "James Hunter", "Robert Ford"],
            answer : 2,
            image : "assets/images/robert-ford.jpg"
        },        
        {
            question : "In the movie The Terminator, what is the name of the company that created Skynet?",
            choice : ["Cyberdyne Systems", "Cisco System", "Cyberborg System"],
            answer : 0,
            image : "assets/images/cyberdyne.jpg"
        },
        {
            question : "Regarding data storage, what does the acronym SSD stand for?",
            choice : ["Super Speed Disk", "Structured Set Data", "Solid State Drive"],
            answer : 2,
            image : "assets/images/ssd.jpg"
        },
        {
            question : "What is the name for the branch of the French Army created for foreign recruits?",
            choice : ["French Foregin Army", "French Foreign Legion", "French Foregin Airforce"],
            answer : 1,
            image : "assets/images/foreign-legion.jpg"
        },
        {
            question : "In geometry, how many sides are on a heptagon?",
            choice : ["Seven", "Four", "Eight"],
            answer : 0,
            image : "assets/images/heptagon.jpg"
        },
        {
            question : "Which sea separates the East African coast and the Saudi Arabian peninsula?",
            choice : ["Red Sea", "Blue Sea", "Black Sea"],
            answer : 0,
            image : "assets/images/red-sea.jpg"
        }
    ]    

    // countdown timer
    function countdowntimer() {        
        count--;
        $("#timer").text(count);       
        
        if(count < 0) {
            clearInterval(timer);
            loss++;
            displayAnswer(pickedQuestion);
        }
    }

    
    // return the random picked question
    function getPickedQuestion(){
        if(options.length > 0){
            randomIndex = Math.floor(Math.random() * options.length);            
            var question = options[randomIndex];            
            return question;
        }
        else {
            return null;
        }
    }

    // display random question
    function displayQuestion(){
        count = timeToAnswer; // reset time
        $("#timer").text(count); // display initial time
        timer = setInterval(countdowntimer, 1000);
        // debugger
        pickedQuestion = getPickedQuestion();
        
        console.log("option length: " + options.length)
        
        $("#win").text(win);
        $("#loss").text(loss);

        if(options.length > 0){
            //<p class="text-primary">This text is important.</p>
            // var questionTag = $("<div>" + pickedQuestion.question + "</div>");
            var questionTag = $("<p class='text-success font-weight-bold question'>" + pickedQuestion.question + "</p>");
            $(".challenge").empty(); // reset question and answer
            $(".challenge").append(questionTag);
    
            for(var i = 0; i < pickedQuestion.choice.length; i++){                
                var answer = $("<button type='button' class='btn btn-info answer'>" + pickedQuestion.choice[i] + "</div>");
                answer.attr("data-value", i);
                $(".challenge").append(answer);
            }
    
            options.splice(randomIndex, 1);     // remove from the options
        }
        else {
            $(".container").empty();
            clearInterval(timer);
        }
    }

    // display answer
    function displayAnswer(){
        var timerTag = $("#timer");
        timerTag.addClass("text-danger");
        timerTag.text("Time out !!!!");
                
        $(".challenge").empty(); // reset question and answer

        var answerIndex = pickedQuestion.answer;
        var answer = $("<div>Correct Answer: <span class='correct-answer'>" + pickedQuestion.choice[answerIndex] + "</span></div>");
        var container = $("<div>");

        var image = $("<img src='" + pickedQuestion.image + "'>");
        var continueButton = $("<button type='button' class='btn btn-success' id='continue'>Next Question</button>");
        container.append(answer, image);        
        
        $(".challenge").append(container, continueButton);
        $("#win").text(win);
        $("#loss").text(loss);
    }    

    
    $(document).on("click", ".answer", function(){
                        
        var value = $(this).attr("data-value");
        console.log("Value: " + value);
        console.log("answer from pickedQuestion: " + pickedQuestion.answer);
        
        if(value == pickedQuestion.answer) { // don't care about type, let compiler convert and compare
            win++;
            console.log(win);
            clearInterval(timer);             
            displayQuestion();
        }
        else {
            loss++;
            console.log(loss);
            clearInterval(timer);
            displayAnswer();
        }
    })  

    $(document).on("click", "#continue", function(){
        displayQuestion();
    })

    displayQuestion()     
})