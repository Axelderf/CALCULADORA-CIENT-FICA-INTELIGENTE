// DOM Elements
const display = document.getElementById('pantalla');
const historyList = document.getElementById('lista-historial');
const themeToggle = document.getElementById('toggle-theme');
const musicToggle = document.getElementById('toggle-music');
const volumeSlider = document.getElementById('volume-slider');

// Audio elements
const clickSound = document.getElementById('audio-click');
const backgroundMusic = document.getElementById('audio-musica');

// State variables
let currentInput = '';
let history = [];
let isDarkMode = false;

// Initialize the calculator
function init() {
    loadHistory();
    loadTheme();
    setupAudio();
    setupEventListeners();
    updateMusicIcon(false);
}

// Event Listeners
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    musicToggle.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', handleVolumeChange);
    
    // Keyboard support
    document.addEventListener('keydown', handleKeyboardInput);
}

// Theme Management
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('calculatorTheme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();
    playClickSound();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('calculatorTheme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon();
    }
}

function updateThemeIcon() {
    const themeButton = document.getElementById('toggle-theme');
    if (isDarkMode) {
        themeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';
    } else {
        themeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';
    }
}

// Configurar el audio
function setupAudio() {
    console.log('Configurando audio...');
    
    // Configurar el volumen inicial
    const savedVolume = localStorage.getItem('musicVolume');
    const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.2;
    backgroundMusic.volume = initialVolume;
    volumeSlider.value = initialVolume * 100;
    
    // Configurar el volumen del click
    clickSound.volume = 0.3;

    // Manejar errores de audio
    clickSound.onerror = (e) => {
        console.error('Error al cargar el sonido de click:', e);
    };
    
    backgroundMusic.onerror = (e) => {
        console.error('Error al cargar la música de fondo:', e);
    };

    // Verificar si el audio está listo
    backgroundMusic.oncanplaythrough = () => {
        console.log('Música cargada y lista para reproducir');
    };

    // Manejar la reproducción automática
    document.addEventListener('click', () => {
        console.log('Intento de reproducción automática...');
        if (backgroundMusic.paused) {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Música reproducida exitosamente');
                        updateMusicIcon(true);
                    })
                    .catch(error => {
                        console.error('Error al reproducir música:', error);
                        // Mostrar mensaje al usuario
                        alert('No se pudo reproducir la música. Asegúrate de que tu navegador permita la reproducción automática.');
                    });
            }
        }
    }, { once: true });
}

// Sound Management
function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Error al reproducir sonido de click:', e));
    }
}

function toggleMusic() {
    if (!backgroundMusic) {
        console.error('Elemento de audio no encontrado');
        return;
    }

    try {
        if (backgroundMusic.paused) {
            console.log('Iniciando reproducción...');
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Música reproducida exitosamente');
                        updateMusicIcon(true);
                        playClickSound();
                    })
                    .catch(error => {
                        console.error('Error al reproducir música:', error);
                        updateMusicIcon(false);
                        alert('No se pudo reproducir la música. Asegúrate de que tu navegador permita la reproducción de audio.');
                    });
            }
        } else {
            console.log('Pausando música...');
            backgroundMusic.pause();
            updateMusicIcon(false);
            playClickSound();
        }
    } catch (e) {
        console.error('Error al manejar la música:', e);
        updateMusicIcon(false);
    }
}

function updateMusicIcon(isPlaying) {
    const musicButton = document.getElementById('toggle-music');
    if (isPlaying) {
        musicButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>';
    } else {
        musicButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T480-280v-400h120v-80H480v-120h-80v600q0 33 23.5 56.5T400-200Zm0-240Z"/></svg>';
    }
}

// Calculator Operations
function agregar(value) {
    playClickSound();
    currentInput += value;
    updateDisplay();
}

function calcular() {
    playClickSound();
    try {
        // Replace scientific functions with Math equivalents
        let expression = currentInput
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**');

        const result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Operación inválida');
        }

        // Save to history
        saveToHistory(currentInput, result);
        
        // Update display
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '';
            updateDisplay();
        }, 1000);
    }
}

function borrar() {
    playClickSound();
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function borrarTodo() {
    playClickSound();
    currentInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// History Management
function saveToHistory(expression, result) {
    const operation = {
        expression,
        result,
        timestamp: new Date().toISOString()
    };
    
    history.unshift(operation);
    if (history.length > 10) {
        history.pop();
    }
    
    saveHistory();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    history.forEach(op => {
        const li = document.createElement('li');
        li.textContent = `${op.expression} = ${op.result}`;
        historyList.appendChild(li);
    });
}

function borrarHistorial() {
    playClickSound();
    history = [];
    saveHistory();
    updateHistoryDisplay();
}

function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

// Keyboard Support
function handleKeyboardInput(e) {
    const key = e.key;
    
    if (/[0-9]/.test(key)) {
        agregar(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        agregar(key);
    } else if (key === 'Enter') {
        calcular();
    } else if (key === 'Backspace') {
        borrar();
    } else if (key === 'Escape') {
        borrarTodo();
    }
}

// Volume Control
function handleVolumeChange(e) {
    const volume = e.target.value / 100;
    backgroundMusic.volume = volume;
    localStorage.setItem('musicVolume', volume.toString());
}

// Initialize the calculator
init();
