// ------ HOME PAGE -------
// ================== HEADER & NAVBAR ==================

document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');

  menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('mobile-active');
    menuIcon.innerHTML = navbar.classList.contains('mobile-active') ? '✕' : '&#9776;'; 
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navbar.classList.remove('mobile-active');
        menuIcon.innerHTML = '&#9776;';
      }

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navbar.classList.remove('mobile-active');
      menuIcon.innerHTML = '&#9776;';
    }
  });
});




//  ================== HERO SECTION ==================  

//  ================== MANUFACTURING CAPABILITIES SECTION ================== 

document.addEventListener('DOMContentLoaded', function() {

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.cap-card');
  cards.forEach(card => {
    observer.observe(card);
  });

  observer.observe(document.querySelector('.cap-title'));
  observer.observe(document.querySelector('.cap-subtitle'));

  cards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
      e.preventDefault();

      this.classList.toggle('expanded');

      setTimeout(() => {
        const btn = document.querySelector('.cap-btn');
        if (btn) {
          btn.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });

    card.addEventListener('mouseenter', function() {
      if ('vibrate' in navigator) {
        navigator.vibrate(50); 
      }
    });
  });

  const btn = document.querySelector('.cap-btn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }
});

const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  .cap-card.expanded {
    max-height: none;
    overflow: visible;
  }
`;
document.head.appendChild(style);

//  ============== QUALITY ASSURANCE SECTION ================ 

//   ============ INDUSTRIES WE SERVE SECTION ===============  

const marquee = document.getElementById('ncsMarquee');
let animationSpeed = 40; 

function adjustSpeed() {
    const width = window.innerWidth;
    if (width < 480) {
        animationSpeed = 30;
    } else if (width < 768) {
        animationSpeed = 35;
    } else {
        animationSpeed = 40;
    }
    marquee.style.animationDuration = animationSpeed + 's';
}
adjustSpeed();
window.addEventListener('resize', adjustSpeed);

marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
});
marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
});

//  ================= FOOTER ================= 

document.getElementById('currentYear').textContent = new Date().getFullYear();


// ------ BLOG PAGE ------

// ------ CONTACT PAGE ------

// <!--  ================== CONTACT FORM SECTION ================== -->

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validate required fields
      if (!fullName || !email || !message) {
        alert('Please fill in all required fields (marked with *)');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Create form data object
      const formData = {
        fullName: fullName,
        email: email,
        company: company,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
      };

      // Log form data (In production, send this to your backend)
      console.log('Form submitted:', formData);

      // Show success message
      successMessage.classList.add('show');

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(function() {
        successMessage.classList.remove('show');
      }, 5000);

      // OPTIONAL: Send to backend
      // Uncomment and modify this section to send data to your server
      /*
      fetch('your-backend-endpoint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        successMessage.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
      */
    });

    // Add input validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#ff4444';
        } else {
          input.style.borderColor = '#e0e0e0';
        }
      });

      input.addEventListener('focus', function() {
        input.style.borderColor = '#667eea';
      });
    });

    // Email validation on blur
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          emailInput.style.borderColor = '#ff4444';
        }
      });
    }

    // Phone number formatting (optional)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        e.target.value = value;
      });
    }
  }
});

document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(function(element) {
  element.addEventListener('focus', function() {
    this.style.transform = 'scale(1.01)';
  });
  
  element.addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
  });
});


// contact

        const form = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };

        const errors = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };

        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const submissionsList = document.getElementById('submissionsList');
        const submissionsContainer = document.getElementById('submissionsContainer');
        const submissionCount = document.getElementById('submissionCount');

        let submissions = [];

        function validateForm() {
            let isValid = true;
            clearErrors();

            // Validate Name
            if (form.name.value.trim() === '') {
                errors.name.textContent = 'Name is required';
                errors.name.classList.add('show');
                form.name.classList.add('error');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (form.email.value.trim() === '') {
                errors.email.textContent = 'Email is required';
                errors.email.classList.add('show');
                form.email.classList.add('error');
                isValid = false;
            } else if (!emailRegex.test(form.email.value)) {
                errors.email.textContent = 'Please enter a valid email';
                errors.email.classList.add('show');
                form.email.classList.add('error');
                isValid = false;
            }

            // Validate Subject
            if (form.subject.value.trim() === '') {
                errors.subject.textContent = 'Subject is required';
                errors.subject.classList.add('show');
                form.subject.classList.add('error');
                isValid = false;
            }

            // Validate Message
            if (form.message.value.trim() === '') {
                errors.message.textContent = 'Message is required';
                errors.message.classList.add('show');
                form.message.classList.add('error');
                isValid = false;
            }

            // Validate Phone (optional but if provided must be valid)
            if (form.phone.value.trim() !== '') {
                const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
                if (!phoneRegex.test(form.phone.value.replace(/\s/g, ''))) {
                    errors.phone.textContent = 'Please enter a valid phone number';
                    errors.phone.classList.add('show');
                    form.phone.classList.add('error');
                    isValid = false;
                }
            }

            return isValid;
        }

        function clearErrors() {
            Object.keys(errors).forEach(key => {
                errors[key].classList.remove('show');
                form[key].classList.remove('error');
            });
        }

        function resetForm() {
            form.name.value = '';
            form.email.value = '';
            form.phone.value = '';
            form.subject.value = '';
            form.message.value = '';
        }

        function addSubmission() {
            const timestamp = new Date().toLocaleString();
            const submission = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                subject: form.subject.value.trim(),
                message: form.message.value.trim(),
                submittedAt: timestamp,
                id: Date.now()
            };

            submissions.unshift(submission);
            displaySubmissions();
        }

        function displaySubmissions() {
            submissionsContainer.innerHTML = '';
            submissions.forEach(sub => {
                const subHTML = `
                    <div class="submission-item">
                        <div class="submission-date">📅 ${sub.submittedAt}</div>
                        <div class="submission-info"><strong>From:</strong> ${sub.name} (${sub.email})</div>
                        ${sub.phone ? `<div class="submission-info"><strong>Phone:</strong> ${sub.phone}</div>` : ''}
                        <div class="submission-info"><strong>Subject:</strong> ${sub.subject}</div>
                        <div class="submission-message"><strong>Message:</strong> ${sub.message}</div>
                    </div>
                `;
                submissionsContainer.innerHTML += subHTML;
            });

            submissionCount.textContent = submissions.length;
            submissionsList.classList.add('show');
        }

        submitBtn.addEventListener('click', function() {
            if (validateForm()) {
                addSubmission();
                resetForm();
                successMessage.classList.add('show');

                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 4000);
            }
        });

        // Clear error on input
        Object.keys(form).forEach(key => {
            form[key].addEventListener('input', function() {
                if (errors[key].classList.contains('show')) {
                    errors[key].classList.remove('show');
                    form[key].classList.remove('error');
                }
            });
        });

