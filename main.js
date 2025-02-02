// Warten bis das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Anpassung der Canvas-Größe an das Element
  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Beispielhafte Spiellogik: Zeichne einen einfachen Stadtplan (als Platzhalter)
  function drawCity() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Zeichne ein einfaches Raster als Platzhalter für Straßen
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
    
    // Hier können später Ampeln und Fahrzeuge eingefügt werden
  }
  
  drawCity();
  
  // Beispiel: Verarbeitung der Einstellungen im Konfigurationsmenü
  const applySettingsBtn = document.getElementById('applySettings');
  applySettingsBtn.addEventListener('click', () => {
    const timerValue = document.getElementById('ampelTimer').value;
    // Hier wird später die Logik zur Anpassung der Ampelschaltung integriert
    console.log('Neue Ampel-Timer-Einstellung:', timerValue);
    // Feedback an den Benutzer (z. B. einfache Rückmeldung)
    alert('Einstellungen wurden übernommen.');
  });
  
  // Initialisierung dynamischer Ereignisse (Platzhalter)
  function initDynamicEvents() {
    // Beispiel: Nach zufälligen Intervallen ein Ereignis (z.B. Baustelle) auslösen
    setInterval(() => {
      // Logik zur zufälligen Auswahl eines Ereignisses
      console.log('Dynamisches Ereignis wurde ausgelöst.');
      // Hier können Nachrichten oder grafische Hinweise eingeblendet werden
    }, 10000); // Alle 10 Sekunden (zum Testen)
  }
  
  initDynamicEvents();
});
