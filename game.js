document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const player = document.getElementById('player');
  const powerDisplay = document.getElementById('power');

  let gridSize = 5; // Define gridSize here
  const rooms = [];
  const animatronics = [];
  const doors = Array(gridSize * gridSize).fill(false);
  const lights = Array(gridSize * gridSize).fill(false);

  let playerPosition = { x: 0, y: 0 };
  let power = 100;
  let gameLoop;

  function createRooms() {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const room = document.createElement('div');
        room.classList.add('room');
        rooms.push({ x, y, element: room });
        grid.appendChild(room);
      }
    }
  }

  function getRandomPosition() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
  }

  function moveAnimatronics() {
    animatronics.forEach((animatronic) => {
      if (isDoorOpen(animatronic.x, animatronic.y)) {
        // If the door is open, animatronic cannot move
        return;
      }

      if (!isLightOn(animatronic.x, animatronic.y)) {
        // If the light is off, animatronic is hidden
        return;
      }

      // Otherwise, move the animatronic
      const position = getRandomPosition();
      animatronic.x = position.x;
      animatronic.y = position.y;
    });
  }

  function updateGame() {
    // ... (Add game logic, collisions, etc. as needed)
  }

  function render() {
    // ... (Update the visual representation of the game state)
  }

  function toggleDoor(x, y) {
    const index = y * gridSize + x;
    doors[index] = !doors[index];
  }

  function toggleLight(x, y) {
    const index = y * gridSize + x;
    lights[index] = !lights[index];
  }

  function isDoorOpen(x, y) {
    const index = y * gridSize + x;
    return doors[index];
  }

  function isLightOn(x, y) {
    const index = y * gridSize + x;
    return lights[index];
  }

  function updatePowerDisplay() {
    powerDisplay.textContent = power;
  }

  function drainPower() {
    power -= 1;
    updatePowerDisplay();
    if (power <= 0) {
      endGame();
    }
  }

  function startGame() {
    createRooms();

    // Add animatronics to the game (you can have more than one)
    animatronics.push({ x: 1, y: 1 }); // Add more as needed

    gameLoop = setInterval(() => {
      moveAnimatronics();
      updateGame();
      render();
      drainPower(); // Power drains every game loop iteration
    }, 1000); // Run the game loop every second
  }

  function endGame() {
    clearInterval(gameLoop);
    alert("Game Over!");
  }

  function handleKeyPress(event) {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'o': // Open/close door (press 'o' key)
        toggleDoor(playerPosition.x, playerPosition.y);
        drainPower(); // Door operation consumes power
        break;
      case 'l': // Toggle light (press 'l' key)
        toggleLight(playerPosition.x, playerPosition.y);
        drainPower(); // Light operation consumes power
        break;
      default:
        break;
    }
  }

  document.addEventListener('keydown', handleKeyPress);

  startGame();
});
