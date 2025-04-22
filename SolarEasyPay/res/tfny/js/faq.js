document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.icon');

    // Add markdown content to the answer when the question is clicked
    question.addEventListener('click', () => {

      // Toggle the visibility of the answer
      answer.classList.toggle('open');
      icon.textContent = answer.classList.contains('open') ? '−' : '+';

    });
  });

});

