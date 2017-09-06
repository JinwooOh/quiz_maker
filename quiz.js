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
		var hideAdd = document.querySelector(".addQuestion");
    	var hideInfo = document.querySelector(".info");
    	hideAdd.style.display = "none";
    	hideInfo.style.display = "none";

    	var questionsWrapper = document.querySelector(".questionsWrapper");
    	questionsWrapper.innerHTML = "";
    	
    	quiz.questions.forEach(function(question, index){

    	    var questionDiv = document.createElement("div");
    	    questionDiv.setAttribute("class", "questionDiv");	     
	    	var questionLi = document.createElement("li");
	    	var answerLi = document.createElement("li");
	    	var wrong1Li = document.createElement("li");
	    	var wrong2Li = document.createElement("li");
	    	var wrong3Li = document.createElement("li");

	    	var nextButton = document.createElement("button");
	        nextButton.setAttribute("class", "nextButton");

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
	    	
    	});

	},

	displayNumQuestions: function(){
		if(quiz.questions.length == 1){
			document.getElementById("numOfQuestions").textContent = "1 question added";
		}else{
			document.getElementById("numOfQuestions").textContent = quiz.questions.length+" questions added";
		}
	}
};