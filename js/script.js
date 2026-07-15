/**
 * Clarim Perfumes - Global Scripts
 * Contains: Mobile Menu, Header Scroll Effects, Back to Top,
 * Scroll animations, Auto Year and Contact Form Validation.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. HEADER DYNAMICS (SCROLL EFFECT)
    const header = document.querySelector(".header");
    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", checkHeaderScroll);
    checkHeaderScroll(); // Check on init

    // 2. MOBILE NAVIGATION MENU
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
            document.body.classList.toggle("no-scroll"); // Prevent scrolling when menu is open
        });

        // Close menu when link is clicked
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("open");
                navMenu.classList.remove("open");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    // 3. BACK TO TOP BUTTON
    const backToTopBtn = document.querySelector(".back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. ANIMATE ON SCROLL (INTERSECTION OBSERVER)
    const animElements = document.querySelectorAll(".animate-on-scroll, .timeline-item");
    if (animElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    // Unobserve after animating once to maintain clean performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach(el => observer.observe(el));
    }

    // 5. AUTOMATIC COPYRIGHT YEAR
    const copyrightYearSpan = document.getElementById("copyright-year");
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // 6. CONTACT FORM VALIDATION & SUCCESS FEEDBACK (TOAST)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("nome");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("telefone");
            const messageInput = document.getElementById("mensagem");

            let isValid = true;

            // Simple validations
            if (nameInput.value.trim().length < 3) {
                showInputError(nameInput, "Nome deve conter pelo menos 3 caracteres.");
                isValid = false;
            } else {
                clearInputError(nameInput);
            }

            if (!validateEmail(emailInput.value)) {
                showInputError(emailInput, "Por favor, insira um e-mail válido.");
                isValid = false;
            } else {
                clearInputError(emailInput);
            }

            if (phoneInput.value.trim().length < 8) {
                showInputError(phoneInput, "Por favor, insira um telefone válido.");
                isValid = false;
            } else {
                clearInputError(phoneInput);
            }

            if (messageInput.value.trim().length < 10) {
                showInputError(messageInput, "Mensagem deve conter pelo menos 10 caracteres.");
                isValid = false;
            } else {
                clearInputError(messageInput);
            }

            if (isValid) {
                // Mock form submission
                showToast("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
                contactForm.reset();
            }
        });
    }

    // Input validation helpers
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function showInputError(input, message) {
        input.style.borderColor = "#ff4d4d";
        
        let errorEl = input.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains("error-message")) {
            errorEl = document.createElement("span");
            errorEl.className = "error-message";
            errorEl.style.color = "#ff4d4d";
            errorEl.style.fontSize = "0.75rem";
            errorEl.style.marginTop = "0.25rem";
            errorEl.style.display = "block";
            input.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearInputError(input) {
        input.style.borderColor = "";
        const errorEl = input.parentNode.querySelector(".error-message");
        if (errorEl) {
            errorEl.remove();
        }
    }

    // 7. TOAST NOTIFICATION CREATION
    function showToast(message, type = "info") {
        let toast = document.querySelector(".toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);
        }

        // Apply theme type class
        toast.className = "toast"; // Reset
        toast.classList.add("toast", "glass");
        if (type === "success") {
            toast.classList.add("toast-success");
        }
        
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>${message}</span>
        `;

        // Trigger transition
        setTimeout(() => {
            toast.classList.add("show");
        }, 50);

        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }
});
