document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Canvas-Größe einstellen
  canvas.width = 800;
  canvas.height = 600;

  // TrafficLight-Klasse definieren
  class TrafficLight {
    constructor(x, y, timer = 30) {
      this.x = x;
      this.y = y;
      this.timer = timer;
      this.state = 'rot';
      this.elapsed = 0;
      this.stateDurations = {
        rot: this.timer,
        gelb: 2,
        grün: this.timer
      };
    }

    update(deltaTime) {
      this.elapsed += deltaTime;
      if (this.elapsed >= this.stateDurations[this.state]) {
        this.changeState();
        this.elapsed = 0;
      }
    }

    changeState() {
      this.state = this.state === 'rot' ? 'grün' : this.state === 'grün' ? 'gelb' : 'rot';
      console.log(`Ampel wechselt zu: ${this.state}`);
    }

    updateTimer(newTimer) {
      this.timer = newTimer;
      this.stateDurations.rot = this.timer;
      this.stateDurations.grün = this.timer;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = this.state === 'rot' ? 'red' : this.state === 'gelb' ? 'yellow' : 'green';
      ctx.fill();
      ctx.stroke();
    }
  }

  // Eine Ampel mittig auf dem Canvas platzieren
  const trafficLight = new TrafficLight(canvas.width / 2, canvas.height / 2, 5);

  let lastTime = performance.now();

  function gameLoop(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCityGrid();

    trafficLight.update(deltaTime);
    trafficLight.draw(ctx);

    requestAnimationFrame(gameLoop);
  }

  function drawCityGrid() {
    const gridSize = 50;
    ctx.strokeStyle = '#ddd';
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

  requestAnimationFrame(gameLoop);

  // Konfigurationsmenü
  const applySettingsBtn = document.getElementById('applySettings');
  applySettingsBtn.addEventListener('click', () => {
    const timerValue = parseInt(document.getElementById('ampelTimer').value, 10);
    trafficLight.updateTimer(timerValue);
    console.log('Ampel-Timer aktualisiert auf:', timerValue);
    alert('Einstellungen wurden übernommen.');
  });
});
