document.addEventListener('DOMContentLoaded', () => {
  const titleScreen = document.querySelector('.title-screen');
  const playBtn = document.getElementById('play-btn');
  const gameContainer = document.querySelector('.game-container');
  const grid = document.querySelector('.grid');
  const player = document.getElementById('player');
  const powerDisplay = document.getElementById('power');
  const clockDisplay = document.getElementById('time');

  let gridSize = 5; // Define gridSize here
  const rooms = [];
  const animatronics = [];
  const doors = Array(gridSize * gridSize).fill(false);
  const lights = Array(gridSize * gridSize).fill(false);

  let playerPosition = { x: 0, y: 0 };
  let power = 100;
  let gameLoop;
  let clockTime = 0; // Clock in seconds, starts at 12 AM
  let isGameOver = false;

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
    // Check collision with animatronics
    animatronics.forEach((animatronic) => {
      if (playerPosition.x === animatronic.x && playerPosition.y === animatronic.y) {
        endGame(false); // Game over, the animatronic reached the player
      }
    });

    // ... (Add other game logic, collisions, etc. as needed)
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
      endGame(false); // Game over, power ran out
    }
  }

  function startGame() {
    // Hide the title screen and show the game container
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    createRooms();

    // Add animatronics to the game
    animatronics.push({ x: 1, y: 1 });
    animatronics.push({ x: 3, y: 2 });

    gameLoop = setInterval(() => {
      moveAnimatronics();
      updateGame();
      render();
      updateClock(); // Update the clock
      drainPower(); // Power drains every game loop iteration
    }, 1000); // Run the game loop every second
  }

  // Function to update the clock display
  function updateClock() {
    const hour = Math.floor(clockTime / 30) % 12;
    const minute = clockTime % 30 === 0 ? '00' : '30';
    const ampm = Math.floor(clockTime / 360) % 2 === 0 ? 'AM' : 'PM';
    clockDisplay.textContent = `${hour}:${minute} ${ampm}`;
    clockTime++;
    if (clockTime >= 12 * 30) {
      // End the game at 6 AM
      endGame(true); // You survived
    }
  }

  function endGame(survived) {
    clearInterval(gameLoop);
    isGameOver = true;
    if (survived) {
      alert("You Survived!");
    } else {
      alert("Game Over!");
    }
  }

  playBtn.addEventListener('click', startGame);
});
