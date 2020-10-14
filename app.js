var questionHeading = document.getElementById('questionHeading');
var quizHeading = document.getElementById('quiz_heading');
var options = document.querySelectorAll('.quiz_options');
var nextBtnElement = document.getElementById('nextBtnElement');
var userForm = document.getElementById('userForm');
var userName = document.getElementById('userName');
var userNameSubmitBtn = document.getElementById('userName_submit_button');
var resultImg = document.getElementById('resultImg');


var questionsArray = [
    {
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "none of the above",
        ]
    },
    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "none of the above",
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answer: "alert('Hello World');",
        options: [
            "alert('Hello World');",
            "msg('Hello World');",
            "alertBox('Hello World');",
            "none of the above",
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answer: "function myFunction()",
        options: [
            "function myFunction()",
            "function = myFunction()",
            "function:myFunction()",
            "none of the above",
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answer: "myFunction()",
        options: [
            "call myFunction()",
            "myFunction()",
            "call function myFunction()",
            "none of the above",
        ]
    },
];

function questionElement(e){
    questionHeading.innerText = questionsArray[e].question;
    
    for(var i = 0; i < options.length; i++){
        options[i].innerText = questionsArray[e].options[i];
    }
    
    var userSessionName = sessionStorage.getItem('userName');
    quizHeading.innerHTML = `Hello ${userSessionName}`;
}


var questionCount = 0;
var scores = 0;

function nextBtn(){
    comparison(questionCount);
    questionCount++;
    if(questionCount == questionsArray.length){
        showResult();
    }
    questionElement(questionCount);
    removeActiveClass();
}


function activeOption(e){
    removeActiveClass();
    e.classList.add('active');
}

function removeActiveClass(){
    var active = document.getElementsByClassName('active');
    for(var i = 0; i < active.length; i++){
        active[i].classList.remove('active');
    }
}

function comparison(x){
    var active = document.getElementsByClassName('active');
    if(active[0].innerText == questionsArray[x].answer){
        scores += 10;
    }
}

function showResult(){
    if(questionCount == questionsArray.length){
        window.location.href = 'result.html'
    }
    var result = document.getElementById('result');
    sessionStorage.setItem('userScore', scores);
}
function takingElementsFromResultPage(){
    var cs = sessionStorage.getItem('userScore');
    var result = document.getElementById('result');
    result.innerHTML = 'your score is ' + cs + ' out of 50';
    if(sessionStorage.getItem('userScore') > 20){
        resultImg.src = 'images/congratulation-image.png';
    }
    else{
        resultImg.src = 'images/lost-image.png';
    }
}

function quizAgain(){
    window.location.href = 'index.html';
    sessionStorage.clear();
    sessionStorage.removeItem('userName');
}

userForm.addEventListener('submit', e => {
    e.preventDefault();
    sessionStorage.setItem('userName', userName.value);
    if(!userName.value){
        alert('please Enter Your Name');
    }
    else{
        window.location.href = 'quiz.html'
        userName.value = '';
    }
})
