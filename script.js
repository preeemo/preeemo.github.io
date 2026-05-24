window.addEventListener('load', () => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateBackground(); 
    }

    const scale = 4; 

    const randomSeedX = Math.floor(Math.random() * 1000);
    const randomSeedY = Math.floor(Math.random() * 1000);
    
    // Generiamo l'indice dell'equazione UNA SOLA VOLTA al caricamento della pagina
    const randomEquationSelector = Math.floor(Math.random() * 5);

    function generateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x += scale) {
            for (let y = 0; y < canvas.height; y += scale) {

                const seededX = x + randomSeedX;
                const seededY = y + randomSeedY;

                // 1. DICHIARIAMO LA VARIABILE QUI FUORI (usiamo let perché il valore cambierà)
                let value = 0;

                // 2. MODIFICHIAMO IL VALORE IN BASE ALL'EQUAZIONE SELEZIONATA
                if (randomEquationSelector === 0) {
                    value = (seededX ^ seededY) % 9;
                } 
                else if (randomEquationSelector === 1) {
                    // Evitiamo divisioni per zero o valori strani se seededY - 128 è zero
                    const denominator = (seededY - 128) === 0 ? 1 : (seededY - 128);
                    value = ((seededX - 128) * 64) % denominator;
                }
                else if (randomEquationSelector === 2) {
                    value = (seededX | seededY) % 17;
                }
                else if (randomEquationSelector === 3) {
                    // Evitiamo divisioni per zero se seededY è zero
                    const denominator = seededY === 0 ? 1 : seededY;
                    value = (seededX * 64) % denominator;
                }
                else {
                    value = (seededX * seededY) & 24;
                }

                // --- Interpretazione Binaria ---
                // Ora 'value' è visibile qui sotto!
                if (value > 4) {
                    ctx.fillStyle = 'rgba(100, 100, 100, 0.15)'; // Alzato un filo l'opacità per vederlo meglio
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; 
                }

                ctx.fillRect(x, y, scale, scale);
            }
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});