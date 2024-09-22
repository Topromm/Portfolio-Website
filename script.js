const isDarkMode = localStorage.getItem('darkMode') === 'true';
const lightModeBackground = "./images/backgroundLightMode.png";
const darkModeBackground = "./images/backgroundDarkMode.png";
const lightModeEdgeBlur = "./images/edgeBlurLightMode.png";
const darkModeEdgeBlur = "./images/edgeBlurDarkMode.png";
const modeButton = document.getElementById("mode-button");
const contactButton = document.querySelector(".cta-button");
const navbar = document.querySelector(".navbar");
const body = document.body;

function updateButton(isDarkMode) {
    if (isDarkMode) {
        contactButton.classList.remove("light-mode-button");
        contactButton.classList.add("dark-mode-button");
    } else {
        contactButton.classList.remove("dark-mode-button");
        contactButton.classList.add("light-mode-button");
    }
}

function updateNavbarBackground(isDarkMode) {
    if (isDarkMode) {
        navbar.style.background = "linear-gradient(to right, #436674, #000000, #000000, #000000)";
        document.querySelector(".hero-container").style.backgroundImage = "url(${darkModeBackground})";
        document.getElementById("edge-blur").src = darkModeEdgeBlur;
        body.style.backgroundColor = "#929493";
    } else {
        navbar.style.background = "linear-gradient(to right, #ebb390, #677788, #677788, #677788)";
        document.querySelector(".hero-container").style.backgroundImage = "url(${lightModeBackground})";
        document.getElementById("edge-blur").src = lightModeEdgeBlur;
        body.style.backgroundColor = "#b7b9b8";
    }
}

function redirectToContactPage() {
    window.location.href = "contact.html";
}

updateButton(isDarkMode);

if (isDarkMode) {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    modeButton.innerHTML = '<img src="./images/moon.png" alt="Moon" class="icon" id="moon-icon">';
    updateNavbarBackground(true);
} else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    modeButton.innerHTML = '<img src="./images/sun.png" alt="Sun" class="icon" id="sun-icon">';
    updateNavbarBackground(false);
}

modeButton.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        modeButton.innerHTML = '<img src="./images/sun.png" alt="Sun" class="icon" id="sun-icon">';
        localStorage.setItem("darkMode", "false");
        updateButton(false);
        updateNavbarBackground(false); // Change background image for light mode
    } else {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        modeButton.innerHTML = '<img src="./images/moon.png" alt="Moon" class="icon" id="moon-icon">';
        localStorage.setItem("darkMode", "true");
        updateButton(true);
        updateNavbarBackground(true); // Change background image for dark mode
    }
});

// This just retrieves the current year for the footer
document.getElementById("year").textContent = new Date().getFullYear();
