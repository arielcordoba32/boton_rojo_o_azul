document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnRed = document.getElementById('btn-red');
    const btnBlue = document.getElementById('btn-blue');
    const btnRestart = document.getElementById('btn-restart');
    
    const screenChoices = document.getElementById('screen-choices');
    const screenResult = document.getElementById('screen-result');
    const appCard = document.getElementById('app-card');
    const bgGlow = document.getElementById('bg-glow');
    
    const resultMessage = document.getElementById('result-message');
    const resultDesc = document.getElementById('result-desc');

    // Pools of rich win/lose messages
    const winPool = [
        { title: "¡Has ganado!", desc: "El destino ha sonreído a tu elección y has salido victorioso de esta gran prueba." },
        { title: "¡Has ganado!", desc: "Las estrellas se han alineado a tu favor. Has tomado el camino correcto hacia el triunfo." },
        { title: "¡Has ganado!", desc: "¡Increíble intuición! Has logrado abrir el portal que conduce a la gloria eterna." },
        { title: "¡Has ganado!", desc: "La fortuna premia tu valentía. Tu decisión te ha llevado al éxito absoluto." }
    ];

    const losePool = [
        { title: "¡Has perdido!", desc: "El portal se ha cerrado tras de ti. El destino ha decidido que este no es tu momento." },
        { title: "¡Has perdido!", desc: "Has caído ante la incertidumbre del abismo. Una lección más en tu camino." },
        { title: "¡Has perdido!", desc: "El portal equivocado te ha devuelto al punto de partida. Inténtalo una vez más." },
        { title: "¡Has perdido!", desc: "La suerte ha sido esquiva esta vez. El camino elegido te ha llevado a la derrota." }
    ];

    // Event Listeners
    btnRed.addEventListener('click', () => handleChoice('red'));
    btnBlue.addEventListener('click', () => handleChoice('blue'));
    btnRestart.addEventListener('click', handleRestart);

    /**
     * Handles the user selecting a portal.
     * @param {string} color - The color of the portal selected ('red' or 'blue').
     */
    function handleChoice(color) {
        // Disable buttons to prevent multiple clicks during animations
        setButtonsDisabled(true);

        // Change background ambient glow to selected color temporarily
        if (color === 'red') {
            bgGlow.style.background = 'radial-gradient(circle, rgba(239, 35, 60, 0.25) 0%, rgba(0,0,0,0) 70%)';
        } else {
            bgGlow.style.background = 'radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, rgba(0,0,0,0) 70%)';
        }

        // Fade out choice screen
        screenChoices.classList.add('fade-out');

        setTimeout(() => {
            // Determine result (50% Win / 50% Lose)
            const roll = Math.random();
            const isWin = roll >= 0.5;
            console.log(`[Juego] Portal seleccionado: ${color}. Valor aleatorio: ${roll.toFixed(4)} (Umbral: >= 0.5). ¿Victoria?: ${isWin ? 'SÍ' : 'NO'}`);
            
            // Setup Result Screen
            screenChoices.classList.add('hidden');
            screenChoices.classList.remove('fade-out');
            
            if (isWin) {
                // Show Win screen
                screenResult.className = 'screen-section result-win';
                
                // Select random win message
                const randomWin = getRandomItem(winPool);
                resultMessage.textContent = randomWin.title;
                resultDesc.textContent = randomWin.desc;
                
                // Set Success Glow
                bgGlow.style.background = 'radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(0,0,0,0) 70%)';
            } else {
                // Show Lose screen
                screenResult.className = 'screen-section result-lose';
                
                // Select random lose message
                const randomLose = getRandomItem(losePool);
                resultMessage.textContent = randomLose.title;
                resultDesc.textContent = randomLose.desc;
                
                // Set Failure Glow
                bgGlow.style.background = 'radial-gradient(circle, rgba(239, 35, 60, 0.25) 0%, rgba(0,0,0,0) 70%)';
                
                // Add a tactile shake to the entire card
                appCard.classList.add('shake');
                setTimeout(() => {
                    appCard.classList.remove('shake');
                }, 500);
            }
            
            // Show result screen with entry animations
            screenResult.classList.remove('hidden');
            screenResult.classList.add('fade-in');
            
            // Clean up class
            setTimeout(() => {
                screenResult.classList.remove('fade-in');
            }, 500);

        }, 300); // Matches fade-out CSS transition
    }

    /**
     * Handles the restart/play again flow.
     */
    function handleRestart() {
        // Fade out result screen
        screenResult.classList.add('fade-out');

        setTimeout(() => {
            // Reset background glow
            bgGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)';
            
            // Toggle screens
            screenResult.classList.add('hidden');
            screenResult.classList.remove('fade-out');
            screenResult.className = 'screen-section hidden'; // Clear win/lose classes
            
            // Re-enable choice buttons and show them
            setButtonsDisabled(false);
            screenChoices.classList.remove('hidden');
            screenChoices.classList.add('fade-in');
            
            // Clean up class
            setTimeout(() => {
                screenChoices.classList.remove('fade-in');
            }, 500);

        }, 300); // Matches fade-out CSS transition
    }

    /**
     * Helper to enable/disable all interactive destiny buttons.
     * @param {boolean} disabled 
     */
    function setButtonsDisabled(disabled) {
        btnRed.disabled = disabled;
        btnBlue.disabled = disabled;
    }

    /**
     * Helper to pick a random item from an array.
     * @param {Array} arr 
     * @returns {*}
     */
    function getRandomItem(arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
});
