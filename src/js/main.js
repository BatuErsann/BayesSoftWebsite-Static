/**
 * Bayes Soft - Main JavaScript
 * Handles mobile menu, accordion, smooth scroll, and other UI interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initMobileMenu();
  initAccordions();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', function () {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

    // Toggle menu visibility
    mobileMenu.classList.toggle('hidden');

    // Update ARIA state
    menuButton.setAttribute('aria-expanded', !isExpanded);

    // Animate hamburger icon
    const spans = menuButton.querySelectorAll('span');
    if (spans.length >= 3) {
      if (!isExpanded) {
        // Transform to X
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        // Transform back to hamburger
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!mobileMenu.classList.contains('hidden') &&
      !mobileMenu.contains(event.target) &&
      !menuButton.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');

      const spans = menuButton.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();

      const spans = menuButton.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }
  });
}

/**
 * Accordion Toggle
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(function (accordion) {
    const header = accordion.querySelector('.accordion-header');
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.accordion-icon');

    if (!header || !content) return;

    header.addEventListener('click', function () {
      const isOpen = !content.classList.contains('hidden');

      // Close all other accordions in the same container
      const container = accordion.parentElement;
      const siblings = container.querySelectorAll('.accordion');

      siblings.forEach(function (sibling) {
        if (sibling !== accordion) {
          const siblingContent = sibling.querySelector('.accordion-content');
          const siblingIcon = sibling.querySelector('.accordion-icon');
          if (siblingContent) siblingContent.classList.add('hidden');
          if (siblingIcon) siblingIcon.classList.remove('rotate-180');
        }
      });

      // Toggle current accordion
      content.classList.toggle('hidden');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = link.getAttribute('href');

      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        // Calculate offset for fixed header
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, null, href);

        // Focus the target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    let isValid = true;

    requiredFields.forEach(function (field) {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input || !input.value.trim()) {
        isValid = false;
        if (input) {
          input.classList.add('border-red-500');
          input.classList.remove('border-secondary-300');
        }
      } else {
        if (input) {
          input.classList.remove('border-red-500');
          input.classList.add('border-secondary-300');
        }
      }
    });

    // Email validation
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && emailInput.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('border-red-500');
        emailInput.classList.remove('border-secondary-300');
      }
    }

    if (!isValid) {
      // Show error message
      showFormMessage('Lütfen tüm gerekli alanları doğru şekilde doldurun.', 'error');
      return;
    }

    // Simulate form submission (replace with actual API call)
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Gönderiliyor...
    `;

    // Simulate API delay
    setTimeout(function () {
      // Show success message
      showFormMessage('Mesajınız için teşekkür ederiz! 24 saat içinde sizinle iletişime geçeceğiz.', 'success');

      // Reset form
      form.reset();

      // Restore button
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;

      // Log form data (in production, this would be sent to a server)
      console.log('Form submitted:', data);
    }, 1500);
  });
}

/**
 * Show Form Message
 */
function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message p-4 rounded-lg mb-6 ${type === 'success'
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-red-100 text-red-800 border border-red-200'
    }`;
  messageEl.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${type === 'success'
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    }
      </svg>
      <span>${message}</span>
    </div>
  `;

  // Insert message before form
  const form = document.getElementById('contact-form');
  if (form) {
    form.parentElement.insertBefore(messageEl, form);

    // Auto-remove after 5 seconds
    setTimeout(function () {
      messageEl.remove();
    }, 5000);
  }
}

/**
 * Scroll-based Animations
 */
function initScrollAnimations() {
  // Simple fade-in animation for elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Header Scroll Effect
 */
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScrollY = window.scrollY;

        // Add shadow on scroll
        if (currentScrollY > 10) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
