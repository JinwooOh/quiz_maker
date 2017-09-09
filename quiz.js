var quiz = {
	questions: [],
	addQuestion: function(question, answer, wrong1, wrong2, wrong3){
		this.questions.push({
			question: question,
			answer: answer,
			wrong1: wrong1,
			wrong2: wrong2, 
			wrong3: wrong3
		});
		view.displayNumQuestions();
	},
	movingToNextQuestion: function(){
    //find all next buttons and add event lisener to them
	    var nextButton = document.querySelectorAll(".nextButton");
	    for(i = 0; i < nextButton.length; i++){
	      nextButton[i].addEventListener("click", function(event){
	        //Find the element that was clicked
	        var elementClicked = event.target;
	        //If it was a next button then remove the is-active class from it parent
	        if(elementClicked.className === "nextButton"){
	          elementClicked.parentNode.classList.remove("is-active");
	          //If there isnt a next sibling then reshow the options to add questions and the info div
	          if(elementClicked.parentNode.nextElementSibling === null) {
	            var showAdd = document.querySelector(".addQuestion");
	            var showInfo = document.querySelector(".info");
	            showAdd.style.display = "block";
	            showInfo.style.display = "block";
	          } else {
	            //If there is a next siblng then add the is-active class to it
	            elementClicked.parentNode.nextElementSibling.classList.add("is-active");
	          }
	        }
	      });
	    };
  	}
};

var handler = {
	addQuestion: function(){
		
		var questionInput = document.getElementById("questionInput");
		var answerInput = document.getElementById("correctAnswer");
		var wrong1Input = document.getElementById("wrongAnswer1");
		var wrong2Input = document.getElementById("wrongAnswer2");
		var wrong3Input = document.getElementById("wrongAnswer3");
		
		if(questionInput.value && answerInput.value){//check empty input
			quiz.addQuestion(questionInput.value, answerInput.value, wrongAnswer1.value, 
				wrongAnswer2.value, wrongAnswer3.value);
			//reset the inputs 
			questionInput.value = "";
			answerInput.value = "";
			wrongAnswer1.value = "";
			wrongAnswer2.value = "";
			wrongAnswer3.value = "";
		}else{
			alert("Question and correct answer cannot be empty!");
		}

	}	

};

var view = {
	displayQuestions: function(){
		if(quiz.questions.length > 0){
			var hideAdd = document.querySelector(".addQuestion");
	    	var hideInfo = document.querySelector(".info");
	    	hideAdd.style.display = "none";
	    	hideInfo.style.display = "none";

	    	var questionsWrapper = document.querySelector(".questionsWrapper");
	    	questionsWrapper.innerHTML = "";
	    	
	    	quiz.questions.forEach(function(question, index){

	    	  var questionDiv = document.createElement("div");
		      questionDiv.setAttribute("class", "questionDiv");
		      var nextButton = document.createElement("button");
		      nextButton.setAttribute("class", "nextButton");
		      var questionLi = document.createElement("li");
		      var answerLi = document.createElement("li");
		      answerLi.setAttribute("class", "answer");//to check correct answer later
		      var wrong1Li = document.createElement("li");
		      wrong1Li.setAttribute("class", "wrong");
		      var wrong2Li = document.createElement("li");
		      wrong2Li.setAttribute("class", "wrong");
		      var wrong3Li = document.createElement("li");
		      wrong3Li.setAttribute("class", "wrong");

		    	var nextButton = document.createElement("button");
		        nextButton.setAttribute("class", "btn btn-secondary");

		    	if(index === quiz.questions.length-1){
		    		nextButton.textContent = "Finish!";
		    	}else{
		    		nextButton.textContent = "Next";
		    	}
		    	
		    	questionsWrapper.appendChild(questionDiv);
	      		questionsWrapper.firstChild.classList.add("is-active");

	      		//add user inputs to list text content
		   		questionLi.textContent = question.question;
		   		answerLi.textContent = question.answer;
		   		wrong1Li.textContent = question.wrong1;
		   		wrong2Li.textContent = question.wrong2;
		   		wrong3Li.textContent = question.wrong3;
		   		
		   		//add lists to questiondiv to show on html
		   		
		   		var qSet = [answerLi, wrong1Li, wrong2Li, wrong3Li];
		   		
		   		//shuffle the array
		   		function shuffle(a) {
				    for (let i = a.length; i; i--) {
				        let j = Math.floor(Math.random() * i);
				        [a[i - 1], a[j]] = [a[j], a[i - 1]];
				    }
				}
				shuffle(qSet);
				questionDiv.appendChild(questionLi);
		    	qSet.forEach(function(item){
		    		questionDiv.appendChild(item);
		    	});

		   		questionDiv.appendChild(nextButton);
		    	
		    	this.displayAnswersCorrect();
	      		quiz.movingToNextQuestion();
	    	}, this);

		}else{
			alert("There is no added question");
		}
	},
	displayNumQuestions: function(){
		if(quiz.questions.length == 1){
			document.getElementById("numOfQuestions").textContent = "1 question added";
		}else{
			document.getElementById("numOfQuestions").textContent = quiz.questions.length+" questions added";
		}
	},
	displayAnswersCorrect: function(){
	    var questionDiv = document.querySelectorAll(".questionDiv");
	    var correctAnswers = 0;
	    var answersCorrect = document.querySelector(".answersCorrect");
	    answersCorrect.textContent = "Correct answers: " + correctAnswers;

	    //add click event to each question div if the element clicked has class correct then add 1 to correctAnswers and change the color of element to green.
	    //Else change the color of element to red and find the elemtn with correct class and make it green
	    for (var i = 0; i < questionDiv.length; i++) {
	      questionDiv[i].onclick = function(event) {
	        event = event || window.event;
	        if(event.target.className === "answer"){
	          correctAnswers++;
	          answersCorrect.textContent = "Correct answers: " + correctAnswers;
	          event.target.style.color = "#2ecc71";
	        } else if(event.target.className === "wrong"){
	          event.target.style.color = "#e74c3c";
	          var itemChildren = event.target.parentNode.children;
	          for(i = 0; i < itemChildren.length; i++){
	            if(itemChildren[i].classList.contains("answer")){
	              itemChildren[i].style.color = "#2ecc71";
	            }
	          }
	        }
	        //Remove correct and wrong classes so the same question the score cant go up and colors cant chaneg
	        var itemChildren = event.target.parentNode.children;
	        for(i = 0; i < itemChildren.length; i++){
	          itemChildren[i].classList.remove("answer");
	          itemChildren[i].classList.remove("wrong");
	        }
	      }
	    }

  }
};