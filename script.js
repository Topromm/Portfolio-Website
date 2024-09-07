const isDarkMode = localStorage.getItem('darkMode') === 'true';
const lightModeBackground = 'BACKGROUNDIMAGEHERE';
const darkModeBackground = 'BACKGROUNDIMAGEHERE';
const lightModeEdgeBlur = 'https://i.imgur.com/OrYyhd6.png';
const darkModeEdgeBlur = 'https://i.imgur.com/tiqcfXU.png';
const menuContent = document.querySelector('.menu-content');
const menuOverlay = document.getElementById('menu-overlay');
const modeButton = document.getElementById('mode-button');
const contactButton = document.querySelector('.cta-button');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const body = document.body;

function updateButtonColor(isDarkMode) {
    if (isDarkMode) {
        contactButton.classList.remove('light-mode-button');
        contactButton.classList.add('dark-mode-button');
    } else {
        contactButton.classList.remove('dark-mode-button');
        contactButton.classList.add('light-mode-button');
    }
}

function updateNavbarBackground(isDarkMode) {
    if (isDarkMode) {
        navbar.style.background = 'linear-gradient(to right, #436674, #000000, #000000, #000000)';
        document.querySelector('.hero-container').style.backgroundImage = `url(${darkModeBackground})`;
        document.getElementById('edge-blur').src = darkModeEdgeBlur;
        body.style.backgroundColor = '#929493';
    } else {
        navbar.style.background = 'linear-gradient(to right, #ebb390, #677788, #677788, #677788)';
        document.querySelector('.hero-container').style.backgroundImage = `url(${lightModeBackground})`;
        document.getElementById('edge-blur').src = lightModeEdgeBlur;
        body.style.backgroundColor = '#b7b9b8';
    }
}

function redirectToContactPage() {
    window.location.href = 'Contact.html';
}

updateButtonColor(isDarkMode);

if (isDarkMode) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    modeButton.innerHTML = '<img src="https://i.imgur.com/C0R5Nns.png" alt="Sun" class="icon" id="sun-icon">';
    updateNavbarBackground(true);
} else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    modeButton.innerHTML = '<img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" class="icon" id="moon-icon">';
    updateNavbarBackground(false);
}

modeButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        modeButton.innerHTML = '<img src="https://i.imgur.com/Li8FKFW.png" alt="Moon" class="icon" id="moon-icon">';
        localStorage.setItem('darkMode', 'false');
        updateButtonColor(false);
        updateNavbarBackground(false); // Change background image for light mode
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        modeButton.innerHTML = '<img src="https://i.imgur.com/C0R5Nns.png" alt="Sun" class="icon" id="sun-icon">';
        localStorage.setItem('darkMode', 'true');
        updateButtonColor(true);
        updateNavbarBackground(true); // Change background image for dark mode
    }
});
