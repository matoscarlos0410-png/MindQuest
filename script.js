```javascript
/* =========================================
   MINDQUEST V1
   SISTEMA PRINCIPAL
========================================= */

let score = 0;
let streak = 0;
let solved = 0;
let level = 1;
let xp = 0;

let currentQuestion = 0;
let selectedCategory = "logica";

let timer;
let timeLeft = 30;

let answered = false;


/* =========================================
   PREGUNTAS
========================================= */

const questions = {

    logica: [

        {
            question:
                "¿Qué número continúa la secuencia: 2, 4, 8, 16, ...?",

            answers: [
                "18",
                "24",
                "32",
                "36"
            ],

            correct: 2
        },

        {
            question:
                "Si todos los gatos son animales y Luna es un gato, ¿qué podemos afirmar?",

            answers: [
                "Luna es un animal",
                "Todos los animales son gatos",
                "Luna no es un animal",
                "No se puede saber"
            ],

            correct: 0
        },

        {
            question:
                "¿Qué número falta? 5, 10, 20, 40, __",

            answers: [
                "45",
                "60",
                "80",
                "100"
            ],

            correct: 2
        },

        {
            question:
                "Un reloj marca las 3:00. ¿Qué ángulo forman sus agujas?",

            answers: [
                "45°",
                "90°",
                "120°",
                "180°"
            ],

            correct: 1
        }

    ],


    cultura: [

        {
            question:
                "¿Cuál es el planeta más grande del sistema solar?",

            answers: [
                "Marte",
                "Saturno",
                "Júpiter",
                "Venus"
            ],

            correct: 2
        },

        {
            question:
                "¿Cuál es la capital del Perú?",

            answers: [
                "Cusco",
                "Lima",
                "Arequipa",
                "Trujillo"
            ],

            correct: 1
        },

        {
            question:
                "¿Cuántos continentes se suelen reconocer en el modelo de siete continentes?",

            answers: [
                "5",
                "6",
                "7",
                "8"
            ],

            correct: 2
        },

        {
            question:
                "¿Qué océano es el más grande del planeta?",

            answers: [
                "Atlántico",
                "Índico",
                "Ártico",
                "Pacífico"
            ],

            correct: 3
        }

    ],


    rapidez: [

        {
            question:
                "¿Cuánto es 15 + 17?",

            answers: [
                "30",
                "31",
                "32",
                "33"
            ],

            correct: 2
        },

        {
            question:
                "¿Cuánto es 9 × 7?",

            answers: [
                "56",
                "63",
                "72",
                "81"
            ],

            correct: 1
        },

        {
            question:
                "¿Cuánto es 100 - 37?",

            answers: [
                "53",
                "63",
                "67",
                "73"
            ],

            correct: 1
        },

        {
            question:
                "¿Cuánto es 12 × 5?",

            answers: [
                "50",
                "55",
                "60",
                "65"
            ],

            correct: 2
        }

    ],


    memoria: [

        {
            question:
                "¿Cuál de estas palabras apareció primero en la lista: SOL, LUNA, MAR, ÁRBOL?",

            answers: [
                "SOL",
                "LUNA",
                "MAR",
                "ÁRBOL"
            ],

            correct: 0
        },

        {
            question:
                "Recuerda: ROJO, AZUL, VERDE, AMARILLO. ¿Cuál era el tercer color?",

            answers: [
                "Rojo",
                "Azul",
                "Verde",
                "Amarillo"
            ],

            correct: 2
        },

        {
            question:
                "Recuerda: 7, 3, 9, 2. ¿Cuál era el segundo número?",

            answers: [
                "2",
                "3",
                "7",
                "9"
            ],

            correct: 1
        },

        {
            question:
                "Recuerda: LAGO, CASA, ÁRBOL, SOL. ¿Cuál estaba en tercer lugar?",

            answers: [
                "Lago",
                "Casa",
                "Árbol",
                "Sol"
            ],

            correct: 2
        }

    ]

};


/* =========================================
   SELECCIONAR CATEGORÍA
========================================= */

function selectCategory(category, element) {

    selectedCategory = category;

    currentQuestion = 0;

    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.remove("active");

        });

    element.classList.add("active");

    loadQuestion();

    document
        .getElementById("juego")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   CARGAR PREGUNTA
========================================= */

function loadQuestion() {

    clearInterval(timer);

    answered = false;

    timeLeft = 30;

    const list =
        questions[selectedCategory];

    const q =
        list[currentQuestion];

    document
        .getElementById("questionNumber")
        .textContent =
        `Desafío ${currentQuestion + 1}`;

    document
        .getElementById("question")
        .textContent =
        q.question;

    document
        .getElementById("gameCategory")
        .textContent =
        getCategoryName(selectedCategory);

    document
        .getElementById("timer")
        .textContent =
        timeLeft;

    document
        .getElementById("feedback")
        .textContent =
        "";

    document
        .getElementById("nextBtn")
        .disabled =
        true;


    const progress =
        (currentQuestion / list.length) * 100;

    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.onclick =
            () => checkAnswer(index, button);

        answersContainer.appendChild(button);

    });


    startTimer();
}


/* =========================================
   TEMPORIZADOR
========================================= */

function startTimer() {

    timer =
        setInterval(() => {

            timeLeft--;

            document
                .getElementById("timer")
                .textContent =
                timeLeft;


            if (timeLeft <= 0) {

                clearInterval(timer);

                if (!answered) {

                    answered = true;

                    streak = 0;

                    document
                        .getElementById("feedback")
                        .textContent =
                        "⏰ Tiempo terminado.";

                    updateStats();

                    document
                        .getElementById("nextBtn")
                        .disabled =
                        false;

                }

            }

        }, 1000);
}


/* =========================================
   COMPROBAR RESPUESTA
========================================= */

function checkAnswer(index, button) {

    if (answered) return;

    answered = true;

    clearInterval(timer);

    const q =
        questions[selectedCategory][currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (index === q.correct) {

        button.classList.add("correct");

        score += 100;

        streak++;

        solved++;

        addXP(25);

        document
            .getElementById("feedback")
            .textContent =
            "✅ ¡Respuesta correcta! +100 puntos";

    } else {

        button.classList.add("wrong");

        buttons[q.correct]
            .classList.add("correct");

        streak = 0;

        document
            .getElementById("feedback")
            .textContent =
            "❌ Respuesta incorrecta.";

    }


    updateStats();

    document
        .getElementById("nextBtn")
        .disabled =
        false;
}


/* =========================================
   SIGUIENTE PREGUNTA
========================================= */

function nextQuestion() {

    currentQuestion++;

    const list =
        questions[selectedCategory];


    if (currentQuestion >= list.length) {

        currentQuestion = 0;

        document
            .getElementById("feedback")
            .textContent =
            "🏆 ¡Completaste este desafío!";

    }


    loadQuestion();
}


/* =========================================
   XP
========================================= */

function addXP(amount) {

    xp += amount;


    while (xp >= 100) {

        xp -= 100;

        level++;

    }


    updateProgress();
}


/* =========================================
   ACTUALIZAR PROGRESO
========================================= */

function updateProgress() {

    document
        .getElementById("xpBar")
        .style.width =
        xp + "%";


    document
        .getElementById("xpText")
        .textContent =
        `${xp} / 100 XP`;


    document
        .getElementById("level")
        .textContent =
        level;


    document
        .getElementById("progressLevel")
        .textContent =
        level;
}


/* =========================================
   ESTADÍSTICAS
========================================= */

function updateStats() {

    document
        .getElementById("score")
        .textContent =
        score;


    document
        .getElementById("streak")
        .textContent =
        streak;


    document
        .getElementById("solved")
        .textContent =
        solved;


    document
        .getElementById("level")
        .textContent =
        level;
}


/* =========================================
   NOMBRES DE CATEGORÍAS
========================================= */

function getCategoryName(category) {

    const names = {

        logica: "🧩 LÓGICA",

        cultura: "🌎 CULTURA GENERAL",

        rapidez: "⚡ RAPIDEZ",

        memoria: "🧠 MEMORIA"

    };

    return names[category];
}


/* =========================================
   SCROLL
========================================= */

function scrollToRetos() {

    document
        .getElementById("retos")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================
   MODAL
========================================= */

function showHowToPlay() {

    document
        .getElementById("modal")
        .classList.add("show");
}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");
}


/* =========================================
   CERRAR MODAL AL HACER CLICK AFUERA
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("modal");

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* =========================================
   MENÚ MÓVIL
========================================= */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");
}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");
}


/* =========================================
   INICIO
========================================= */

loadQuestion();

updateStats();

updateProgress();
```
