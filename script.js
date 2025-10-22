const timeElement = document.querySelector('[data-testid="test-user-time"]');

if (timeElement) {
  function updateTime() {
    timeElement.textContent = `Current time: ${Date.now()} ms`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const successMessage = document.querySelector('[data-testid="test-contact-success"]');

  const validateEmail = (email) => {
    // Validates format: name@example.com
    return /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateForm = () => {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    // Validate full name - REQUIRED
    if (!fullName.value.trim()) {
      setError('nameError', 'Full name is required');
      fullName.classList.add('error');
      isValid = false;
    } else {
      clearError('nameError');
      fullName.classList.remove('error');
    }

    // Validate email - REQUIRED and must be valid format
    if (!email.value.trim()) {
      setError('emailError', 'Email is required');
      email.classList.add('error');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      setError('emailError', 'Please enter a valid email (e.g., name@example.com)');
      email.classList.add('error');
      isValid = false;
    } else {
      clearError('emailError');
      email.classList.remove('error');
    }

    // Validate subject - REQUIRED
    if (!subject.value.trim()) {
      setError('subjectError', 'Subject is required');
      subject.classList.add('error');
      isValid = false;
    } else {
      clearError('subjectError');
      subject.classList.remove('error');
    }

    // Validate message - REQUIRED and at least 10 characters
    if (!message.value.trim()) {
      setError('messageError', 'Message is required');
      message.classList.add('error');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      setError('messageError', 'Message must be at least 10 characters long');
      message.classList.add('error');
      isValid = false;
    } else {
      clearError('messageError');
      message.classList.remove('error');
    }

    return isValid;
  };

  const setError = (elementId, message) => {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = message;
    errorEl.classList.add('show');
  };

  const clearError = (elementId) => {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = '';
    errorEl.classList.remove('show');
  };

  const resetForm = () => {
    contactForm.reset();
    successMessage.classList.remove('show');
    document.querySelectorAll('.error-message').forEach(el => {
      el.classList.remove('show');
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      el.classList.remove('error');
    });
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    if (validateForm()) {
      // Show success message only after valid submission
      successMessage.classList.add('show');
      
      // Reset form after showing success message
      setTimeout(() => {
        contactForm.reset();
        // Keep success message visible for 3 seconds, then hide
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 2000);
      }, 500);
    }
  });

  // Clear error on input - real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    });
  });
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});