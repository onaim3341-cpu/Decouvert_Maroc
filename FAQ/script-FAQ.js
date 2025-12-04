const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
    const question = faq.querySelector(".question");

    question.addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});

