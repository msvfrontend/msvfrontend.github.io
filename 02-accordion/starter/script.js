const headers = document.querySelectorAll(".js-accordion .accordion-header");

headers.forEach(function (header) {
    header.addEventListener("click", function () {
        header.parentElement.classList.toggle("active");
    });
});














