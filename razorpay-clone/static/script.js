// ===============================
// MOBILE MENU TOGGLE
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// ===============================
// CLOSE MENU ON LINK CLICK
// ===============================

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});


// ===============================
// FAQ ACCORDION
// ===============================

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {

    accordion.addEventListener("click", function () {

        this.classList.toggle("open");

        const panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }

    });

});


// ===============================
// TESTIMONIAL SLIDER
// ===============================

const testimonials = [

    "Excellent payment platform with amazing support and reliability.",

    "PayFlow helped our business process payments faster and more securely.",

    "The dashboard is clean, simple, and very easy to use.",

    "Outstanding customer support and quick settlements.",

    "Perfect solution for startups and growing businesses."

];

let currentTestimonial = 0;

const testimonialText =
    document.getElementById("testimonialText");

function updateTestimonial() {

    if (!testimonialText) return;

    testimonialText.style.opacity = "0";

    setTimeout(() => {

        testimonialText.textContent =
            testimonials[currentTestimonial];

        testimonialText.style.opacity = "1";

        currentTestimonial++;

        if (
            currentTestimonial >= testimonials.length
        ) {
            currentTestimonial = 0;
        }

    }, 300);
}

if (testimonialText) {
    setInterval(updateTestimonial, 4000);
}


// ===============================
// COUNTER ANIMATION
// ===============================

const counters =
    document.querySelectorAll(".counter");

function startCounters() {

    counters.forEach(counter => {

        const target =
            +counter.getAttribute("data-target");

        let count = 0;

        const increment =
            target / 100;

        const updateCounter = () => {

            count += increment;

            if (count < target) {

                counter.innerText =
                    Math.floor(count);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.innerText =
                    target;

            }

        };

        updateCounter();

    });

}

window.addEventListener(
    "load",
    startCounters
);


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
    document.querySelectorAll(
        ".card, .price-card, .stat-box, .testimonial-box, .stat-card"
    );

revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(40px)";
    element.style.transition =
        "all 0.8s ease";

});

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (
            elementTop <
            windowHeight - revealPoint
        ) {

            element.style.opacity = "1";
            element.style.transform =
                "translateY(0)";
        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


// ===============================
// NAVBAR SHADOW EFFECT
// ===============================

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.15)";

    } else {

        navbar.style.boxShadow =
            "0 2px 10px rgba(0,0,0,0.08)";

    }

});


// ===============================
// SMOOTH SCROLL
// ===============================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });