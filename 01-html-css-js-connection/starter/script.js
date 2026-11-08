const cards = document.querySelectorAll(".card");
const buttons = document.querySelectorAll(".card-button");

let completedCards = 0;

buttons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        const card = cards[index];

        card.classList.toggle("completed");

        if (card.classList.contains("completed")) {
            completedCards++;
        } else {
            completedCards--;
        }

        console.log("Зрозуміло:", completedCards);
    });

});












