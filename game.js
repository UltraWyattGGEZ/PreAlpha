document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const player = document.getElementById('player');

  const rooms = [];
  const animatronics = [];
  const gridSize = 5;
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
      const position = getRandomPosition();
      animatronic.x = position.x;
      animatronic.y = position.y;
    });
  }

  function updateGame() {
    // Update game state, check for collisions, etc.
    // This part of the code will be more complex depending on the game logic.
    // For simplicity, I'm leaving it blank in this example.
    power -= 1; // Decrease power over time as an example.
    // You should implement logic to check for animatronic-player collisions and other interactions.
    if (power <= 0) {
      endGame();
    }
  }

  function render() {
    // Update the game's visual representation based on the game state.
    // This will include updating the positions of animatronics, doors, lights, and the player.
    // For simplicity, I'm leaving it blank in this example.
  }

  function startGame() {
    createRooms();

    // Add animatronics to the game (you can have more than one)
    animatronics.push({ x: 1, y: 1 }); // Add more as needed

    gameLoop = setInterval(() => {
      moveAnimatronics();
      updateGame();
      render();
    }, 1000); // Run the game loop every second
  }

  function endGame() {
    clearInterval(gameLoop);
    alert("Game Over!");
  }

  // Game controls, you can use keyboard events or buttons to trigger these actions
  // Door and light control functions go here

  startGame();
});
