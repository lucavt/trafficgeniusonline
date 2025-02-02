document.addEventListener('DOMContentLoaded', () => {
  // Canvas und Kontext initialisieren
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Canvas-Größe anpassen
  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // TrafficLight-Klasse definieren
  class TrafficLight {
    constructor(x, y, timer = 30) {
      this.x = x;         // X-Position im Canvas
      this.y = y;         // Y-Position im Canvas
      this.timer = timer; // Timer in Sekunden
      this.state = 'rot'; // Startzustand
      this.elapsed = 0;   // Zeit, die im aktuellen Zustand vergangen ist
      // Dauer der einzelnen Phasen (Rot und Grün basierend auf dem Timer, Gelb fix 2 Sekunden)
      this.stateDurations = {
        rot: this.timer,
        gelb: 2,
        grün: this.timer
      };
    }

    // Aktualisiert die Ampel basierend auf der vergangenen Zeit
    update(deltaTime) {
      this.elapsed += deltaTime;
      if (this.elapsed >= this.stateDurations[this.state]) {
        this.changeState();
        this.elapsed = 0;
      }
    }

    // Wechselt den Zustand der Ampel (rot -> grün -> gelb -> rot)
    changeState() {
      if (this.state === 'rot') {
        this.state = 'grün';
      } else if (this.state === 'grün') {
        this.state = 'gelb';
      } else if (this.state === 'gelb') {
        this.state = 'rot';
      }
      console.log(`Ampel wechselt zu ${this.state}`);
    }

    // Aktualisiert den Timer, z. B. aus dem Konfigurationsmenü
    updateTimer(newTimer) {
      this.timer = newTimer;
      this.stateDurations.rot = newTimer;
      this.stateDurations.grün = newTimer;
    }

    // Zeichnet die Ampel als Kreis auf dem Canvas, farblich abhängig vom Zustand
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
      if (this.state === 'rot') {
        ctx.fillStyle = 'red';
      } else if (this.state === 'gelb') {
        ctx.fillStyle = 'yellow';
      } else if (this.state === 'grün') {
        ctx.fillStyle = 'green';
      }
      ctx.fill();
      ctx.stroke();
    }
  }

  // Erstelle eine Instanz der Ampel (z. B. mittig im Canvas)
  const trafficLight = new TrafficLight(canvas.width / 2, canvas.height / 2, 30);

  // Variable für die Zeiterfassung in der Animationsschleife
  let lastTime = performance.now();

  // Animations-/Game-Loop
  function gameLoop(time) {
    const deltaTime = (time - lastTime) / 1000; // Zeitdifferenz in Sekunden
    lastTime = time;

    // Canvas leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Raster (Stadtplan) zeichnen
    drawCityGrid();

    // Ampel aktualisieren und zeichnen
    trafficLight.update(deltaTime);
    trafficLight.draw(ctx);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);

  // Zeichnet ein einfaches Raster als Platzhalter für den Stadtplan
  function drawCityGrid() {
    const gridSize = 50;
    ctx.strokeStyle = '#888';
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Verknüpfung des Konfigurationsmenüs: Bei Klick auf "Einstellungen anwenden" wird der Timer aktualisiert
  const applySettingsBtn = document.getElementById('applySettings');
  applySettingsBtn.addEventListener('click', () => {
    const timerValue = parseInt(document.getElementById('ampelTimer').value, 10);
    trafficLight.updateTimer(timerValue);
    console.log('Ampel-Timer aktualisiert auf:', timerValue);
    alert('Einstellungen wurden übernommen.');
  });
});
