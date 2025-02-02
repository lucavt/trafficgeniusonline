const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Phaser.Scale.FIT, // Skaliert das Spiel für alle Bildschirme
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Spiel-Instanz erstellen
const game = new Phaser.Game(config);

function preload() {
    // Später: Assets laden (z. B. Auto-Sprites, Ampeln)
}

function create() {
    // Platzhalter-Text für den ersten Test
    this.add.text(100, 100, 'Hello Traffic World!', { 
        font: '24px Arial', 
        fill: '#ffffff' 
    });
}

function update() {
    // Später: Spiel-Logik
}
