document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 600;

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
    }

    updateTimer(newTimer) {
      this.timer = newTimer;
      this.stateDurations.rot = this.timer;
      this.stateDurations.grün = this.timer;
    }

    draw(ctx) {
      // Ampelgehäuse
      ctx.fillStyle = '#404040';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 3;
      
      // Hauptkörper
      ctx.fillRect(this.x - 25, this.y - 100, 50, 200);
      
      // Seitliche Verstrebungen
      ctx.fillRect(this.x - 35, this.y - 90, 70, 20);
      ctx.fillRect(this.x - 35, this.y + 70, 70, 20);
      
      // Lampen
      const drawLight = (yOffset, activeColor, inactiveColor) => {
        ctx.beginPath();
        ctx.arc(this.x, this.y + yOffset, 15, 0, Math.PI * 2);
        ctx.fillStyle = this.state === activeColor ? activeColor : inactiveColor;
        
        if (this.state === activeColor) {
          ctx.shadowColor = activeColor;
          ctx.shadowBlur = 20;
        }
        
        ctx.fill();
        
        // Reset shadow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 5;
      };

      // Rote Lampe
      drawLight(-60, 'rot', '#330000');
      // Gelbe Lampe
      drawLight(0, 'gelb', '#333300');
      // Grüne Lampe
      drawLight(60, 'grün', '#003300');

      // Gehäusedetails
      ctx.strokeStyle = '#202020';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x - 25, this.y - 100, 50, 200);
    }
  }

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
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
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

  // Event Listener
  document.getElementById('applySettings').addEventListener('click', () => {
    const timerValue = parseInt(document.getElementById('ampelTimer').value, 10);
    trafficLight.updateTimer(timerValue);
  });
});
