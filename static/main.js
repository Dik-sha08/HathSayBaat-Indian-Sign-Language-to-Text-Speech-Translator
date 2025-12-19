document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. SCROLL TO TOP LOGIC
    // ==========================================
    const toTop = document.querySelector("#go-to-top");
    if (toTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 720) {
                toTop.classList.add("active");
            } else {
                toTop.classList.remove("active");
            }
        });
    }

    // ==========================================
    // 2. DARK THEME LOGIC (ROBUST)
    // ==========================================
    const themeBtn = document.getElementById("dark-theme");
    const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;
    const logoImage = document.querySelector(".logo-image");

    // Check Local Storage
    const currentTheme = localStorage.getItem("theme") || "light";

    // Apply Initial Theme
    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        if (themeIcon) {
            themeIcon.classList.remove("ri-sun-line");
            themeIcon.classList.add("ri-moon-line");
        }
        if (logoImage) logoImage.src = "/static/assets/images/icons/icon-white.svg";
    }

    // Toggle Listener
    if (themeBtn && themeIcon) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                // Switch to Dark
                themeIcon.classList.remove("ri-sun-line");
                themeIcon.classList.add("ri-moon-line");
                if (logoImage) logoImage.src = "/static/assets/images/icons/icon-white.svg";
                localStorage.setItem("theme", "dark");
            } else {
                // Switch to Light
                themeIcon.classList.remove("ri-moon-line");
                themeIcon.classList.add("ri-sun-line");
                if (logoImage) logoImage.src = "/static/assets/images/icons/icon-black.svg";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ==========================================
    // 3. UNIQUE FEATURE: 3D CARD TILT EFFECT
    // ==========================================
    const cards = document.querySelectorAll('.features .card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse x pos within the element
            const y = e.clientY - rect.top;  // Mouse y pos within the element

            // Calculate rotation (max 10 degrees)
            const xRotation = -((y - rect.height / 2) / rect.height * 10);
            const yRotation = (x - rect.width / 2) / rect.width * 10;

            // Apply the transform
            card.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            card.style.zIndex = "10"; // Bring to front
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform on mouse leave
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
            card.style.zIndex = "1";
        });
    });

    // Small Cards Hover Effect
    const smallCards = document.querySelectorAll('.small-card');
    smallCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});