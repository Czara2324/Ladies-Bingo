const phrases = [
    "Knows how to cook", "Bilingual", "Has a degree", "Wears pink often", "Wears makeup daily",
    "Can dance", "Has traveled abroad", "Gets a mani/pedi regularly", "Enjoys baking", "Can Sing",
    "Loves rom-coms", "Has a career", "A mom", "Married", "Single",
    "Owns a home", "Eats a healthy diet", "Knows how to bake", "Knows how to drive", "Earns more than $60k",
    "Goes to hair salon regularly", "Has a healthy weight", "Loves to dress up", "Works Out regularly", "Loves to socialize","Doesn't use dishwasher", "Has a pet","Has a hobby","Goes to the gym","Has long hair",
];

let selectedColor = document.getElementById('color-picker').value;
let clickCount= 0;
const maxClicks = 10;
document.getElementById('color-picker').addEventListener('input', function() {
    selectedColor = this.value;
});

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4; 

document.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(e => {
        console.log("Autoplay blocked:", e);
      });
    }
  }, { once: true });
function createBingoBoard() {
    const board = document.getElementById("bingo-board");
    board.innerHTML = ""; // Clear previous board   
    clickCount = 0; // Reset click count for new game

    let shuffledPhrases = phrases.sort(() => 0.5 - Math.random()).slice(0, 25);

    shuffledPhrases.forEach((phrase) => {
        const cell = document.createElement("div");
        cell.classList.add("bingo-cell");
        cell.textContent = phrase;

        cell.addEventListener("click", function() {
            if (!cell.classList.contains("clicked") && clickCount < maxClicks) {
                clickSound.play();
                cell.classList.add('clicked');
                cell.style.backgroundColor = selectedColor;
                clickCount++;
                checkWin();
                if (checkWin()) {
                    showModal("🎉 Bingo! You Win! 🎉");
                    winSound.play();
                  } else if (clickCount >= maxClicks) {
                    showModal("😢 Out of clicks! Try again!");
                    loseSound.play();
                  }
                }
              });
        board.appendChild(cell);
    });
}

function checkWin() {
    const cells = document.querySelectorAll(".bingo-cell");
    let grid = [...cells].map(cell => cell.classList.contains("clicked"));

    const winPatterns = [
        [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], // Rows
        [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], // Columns
        [0, 6, 12, 18, 24], [4, 8, 12, 16, 20] // Diagonals
    ];

    return winPatterns.some(pattern => pattern.every(index => grid[index]));
}

    function showModal(message) {
        document.getElementById("modal-message").textContent = message;
        document.getElementById("result-modal").style.display = "flex";
      }
  
      function restartGame() {
        document.getElementById("result-modal").style.display = "none";
        createBingoBoard();
      }

window.onload = createBingoBoard;

