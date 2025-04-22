toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "500",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "iconClass": ""
};

// Declare counterDisplay early
const counterDisplay = document.querySelector('.counter-signup');

// Show toastr-style notifications
const showCustomAlert = (message, isError = false) => {
  if (isError) {
    toastr.error(message);
  } else {
    toastr.success(message);
  }
};

// Fetch initial waitlist count
let waitlistCount = 0;
fetch('http://localhost:5000/api/signup-count')
  .then(res => res.json())
  .then(data => {
    waitlistCount = data.count;
    if (counterDisplay) counterDisplay.textContent = waitlistCount;
  })
  .catch(err => console.error('Failed to fetch count:', err));

// Function to send email and handle waitlist increment
const sendEmail = (formData, contactForm) => {
  emailjs.init("diZbGiKNzdpYL--3S");

  emailjs
    .send('service_ebz7ja8', 'template_g32hnlt', formData)
    .then(
      function (response) {
        // Show toastr success immediately after sending email
        showCustomAlert('Sent successfully! We will get back to you soon.');

        setTimeout(() => {
          contactForm.reset();

          // Update and persist waitlist counter
          fetch('http://localhost:5000/api/increment-signup', {
            method: 'POST',
          })
            .then(res => res.json())
            .then(data => {
              waitlistCount = data.count;
              if (counterDisplay) counterDisplay.textContent = waitlistCount;
            })
            .catch(err => {
              console.error('Failed to update count:', err);
              showCustomAlert('Error updating signup count.', true);
            });
        }, 5000); // Allow toastr to be seen before reset
      },
      function (error) {
        console.error('Error sending email:', error);
        showCustomAlert('Oops! Something went wrong. Please try again later.', true);
      }
    );
};



// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  contactForm?.setAttribute('novalidate', true);

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const formData = {
        name: contactForm.querySelector('[name="form[name]"]').value,
        phone: contactForm.querySelector('[name="form[phone]"]').value,
        email: contactForm.querySelector('[name="form[email]"]').value,
        message: contactForm.querySelector('[name="form[content]"]').value,
      };

      sendEmail(formData, contactForm);
    });
  } else {
    console.error('contactForm element not found.');
  }

//   // Show test toastr to confirm working
//   if (typeof toastr !== 'undefined') {
//     toastr.success("Toastr is working!");
//   } else {
//     console.warn("Toastr not loaded.");
//   }
});
