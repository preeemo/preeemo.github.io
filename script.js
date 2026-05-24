// Aspettiamo che la pagina sia caricata
window.addEventListener('load', () => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    // Funzione per ridimensionare il canvas alla grandezza della finestra
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateBackground(); // Rigenera quando ridimensioni
    }

    // --- Configurazione dell'Algoritmo ---
    const scale = 4; // Dimensione del "super-pixel" (più alto = pixel più grossi/veloce)

    // Generiamo un "Seed" casuale a ogni caricamento per variare il pattern
    const randomSeedX = Math.floor(Math.random() * 1000);
    const randomSeedY = Math.floor(Math.random() * 1000);

    function generateBackground() {
        // Puliamo il canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cicliamo attraverso i pixel, saltando in base alla 'scale'
        for (let x = 0; x < canvas.width; x += scale) {
            for (let y = 0; y < canvas.height; y += scale) {

                // Applichiamo i seed casuali alle coordinate
                const seededX = x + randomSeedX;
                const seededY = y + randomSeedY;

                // --- LA TUA EQUAZIONE ---
                // Applichiamo (x ^ y) % 9
                const value = (seededX ^ seededY) % 9;

                // --- Interpretazione Binaria ---
                // Decidiamo un "soglia" (es. se > 4) per definire acceso/spento.
                // Questo rende l'output binario/netto.
                if (value > 4) {
                    // Pixel ACCESO
                    ctx.fillStyle = 'rgba(100, 100, 100, 0.1)'; // Grigio molto tenue
                } else {
                    // Pixel SPENTO
                    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Trasparente
                }

                // Disegniamo il "super-pixel"
                ctx.fillRect(x, y, scale, scale);
            }
        }
    }

    // Gestione del ridimensionamento finestra
    window.addEventListener('resize', resizeCanvas);

    // Inizializzazione
    resizeCanvas();
});
