const isDarkMode = localStorage.getItem("darkMode") === "true";

// Define images for each page
const images = {
    index: {
        light: "./images/bgLM_Index.png",
        dark: "./images/bgDM_Index.png"
    },
    music: {
        light: "./images/bgLM_Music.png",
        dark: "./images/bgDM_Music.png"
    },
    photography: {
        light: "./images/bgLM_Photography.png",
        dark: "./images/bgDM_Photography.png"
    },
    "3d-art-printing": {
        light: "./images/bgLM_3d-art-printing.png",
        dark: "./images/bgDM_3d-art-printing.png"
    },
    "software-development": {
        light: "./images/bgLM_software-development.png",
        dark: "./images/bgDM_software-development.png"
    }
};

// Determine the current page based on the URL
const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Gets the page name (e.g. index)
const currentImages = images[currentPage] || images.index; // Default to index if page not found

const edgeBlur_LightMode = "./images/edgeBlur_LM.png";
const edgeBlur_DarkMode = "./images/edgeBlur_DM.png";
const modeButton = document.getElementById("mode-button");
const contactButton = document.querySelector(".cta-button");
const navbar = document.querySelector(".navbar");
const body = document.body;

// Function to update the button styling based on the current mode
function updateButton(isDarkMode) {
    if (isDarkMode) {
        contactButton.classList.remove("light-mode-button");
        contactButton.classList.add("dark-mode-button");
    } else {
        contactButton.classList.remove("dark-mode-button");
        contactButton.classList.add("light-mode-button");
    }
}

// Function to update the navbar background and hero background based on mode
function updateNavbarBackground(isDarkMode) {
    const backgroundImage = isDarkMode ? currentImages.dark : currentImages.light; // Select the appropriate image
    navbar.style.background = isDarkMode ? "linear-gradient(to right, #436674, #000000, #000000, #000000)" : "linear-gradient(to right, #ebb390, #677788, #677788, #677788)";
    document.querySelector(".hero-container").style.backgroundImage = `url(${backgroundImage})`; // Update the hero background
    document.getElementById("edge-blur").src = isDarkMode ? edgeBlur_DarkMode : edgeBlur_LightMode;
    body.style.backgroundColor = isDarkMode ? "#929493" : "#b7b9b8";
}

// Function to update the Font Awesome icon for light/dark mode toggle
function updateIcon(isDarkMode) {
    const modeIcon = document.getElementById("mode-icon");

    if (isDarkMode) {
        modeIcon.classList.remove("fa-sun");
        modeIcon.classList.add("fa-moon");
    } else {
        modeIcon.classList.remove("fa-moon");
        modeIcon.classList.add("fa-sun");
    }
}

// Call the functions to set the initial state when the page loads
updateButton(isDarkMode);
if (isDarkMode) {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    updateNavbarBackground(true);
    updateIcon(true);  // Show moon icon in dark mode
} else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    updateNavbarBackground(false);
    updateIcon(false); // Show sun icon in light mode
}

// Event listener for mode button
modeButton.addEventListener("click", () => {
    const isDarkMode = body.classList.contains("dark-mode");

    if (isDarkMode) {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
        updateButton(false);
        updateNavbarBackground(false);
        updateIcon(false); // Change to sun icon
    } else {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        localStorage.setItem("darkMode", "true");
        updateButton(true);
        updateNavbarBackground(true);
        updateIcon(true); // Change to moon icon
    }
});

// This just retrieves the current year for the footer
document.getElementById("year").textContent = new Date().getFullYear();
