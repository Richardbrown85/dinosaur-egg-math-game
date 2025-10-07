/* ============================================
   GAME STATE VARIABLES
   ============================================ */

// Score tracking
let correctScore = 0;        // Number of correct answers
let wrongScore = 0;          // Number of wrong answers
let currentNum1 = 0;         // First number in the addition problem
let currentNum2 = 0;         // Second number in the addition problem
let currentAnswer = 0;       // The correct answer to the current question
let difficultyLevel = 1;     // Current difficulty level (1, 2, or 3)

// ⭐ EASY TO CHANGE: Level up thresholds
// Change these numbers to adjust when players level up
const LEVEL_UP_THRESHOLDS = {
    level2: 10,  // Player reaches level 2 after 10 correct answers
    level3: 20   // Player reaches level 3 after 20 correct answers
};


/* ============================================
   DOM ELEMENT REFERENCES
   ============================================ */

// Get references to HTML elements so we can update them
const num1Display = document.getElementById('num1');                    // First number display area
const num2Display = document.getElementById('num2');                    // Second number display area
const multipleChoiceContainer = document.getElementById('multipleChoiceContainer'); // Answer buttons container
const feedbackModal = document.getElementById('feedbackModal');         // Correct/Wrong popup
const feedbackIcon = document.getElementById('feedbackIcon');           // Emoji icon in feedback
const feedbackMessage = document.getElementById('feedbackMessage');     // Feedback text message
const nextBtn = document.getElementById('nextBtn');                     // Next Question button
const levelUpModal = document.getElementById('levelUpModal');           // Level up celebration popup
const levelUpMessage = document.getElementById('levelUpMessage');       // Level up message text
const continueBtn = document.getElementById('continueBtn');             // Continue button in level up modal
const correctScoreEl = document.getElementById('correctScore');         // Correct score display
const wrongScoreEl = document.getElementById('wrongScore');             // Wrong score display
const difficultyLevelEl = document.getElementById('difficultyLevel');   // Level display


/* ============================================
   CARD IMAGE CONFIGURATION
   ============================================ */

// Array of card images - each card shows a specific number of eggs
// card1.webp = 1 egg, card2.webp = 2 eggs, etc.
const cardImages = [
    'assets/images/card1.webp',  // Index 0: 1 egg
    'assets/images/card2.webp',  // Index 1: 2 eggs
    'assets/images/card3.webp',  // Index 2: 3 eggs
    'assets/images/card4.webp',  // Index 3: 4 eggs
    'assets/images/card5.webp'   // Index 4: 5 eggs
];


/* ============================================
   CARD DISPLAY FUNCTIONS
   ============================================ */

/**
 * Creates and returns a card display element showing the specified number
 * @param {number} num - The number to display (1-5)
 * @returns {HTMLElement} - Container with the card image
 */
function createCardDisplay(num) {
    // Create a container div for the card
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    
    // Create an image element for the card
    const card = document.createElement('img');
    card.src = cardImages[num - 1];  // Get correct image (subtract 1 because arrays start at 0)
    card.alt = `card with ${num} eggs`;
    card.className = 'card-image';
    card.style.width = '120px';
    card.style.height = '150px';
    card.style.objectFit = 'contain';  // Keep image proportions
    
    // Add the card to the container
    container.appendChild(card);
    
    return container;
}


/* ============================================
   DIFFICULTY SYSTEM
   ============================================ */

/**
 * Returns the settings for the current difficulty level
 * Level 1: Easy (sums up to 5)
 * Level 2: Medium (sums up to 10)
 * Level 3: Hard (sums up to 15)
 * @returns {object} - Settings object with max values for numbers
 */
function getDifficultySettings() {
    switch(difficultyLevel) {
        case 1:
            // Level 1: Numbers 1-4, sums up to 5
            return { max1: 4, max2: 4, maxSum: 5 };
        case 2:
            // Level 2: Numbers 1-5, sums up to 10
            return { max1: 5, max2: 5, maxSum: 10 };
        case 3:
        default:
            // Level 3: Numbers 1-9, sums up to 15
            return { max1: 9, max2: 9, maxSum: 15 };
    }
}

/**
 * Checks if the player has reached a level-up threshold
 * Updates the difficulty level and shows celebration if needed
 * @returns {boolean} - True if player leveled up, false otherwise
 */
function checkLevelUp() {
    // Check if player has reached level 2 threshold
    if (correctScore === LEVEL_UP_THRESHOLDS.level2 && difficultyLevel === 1) {
        difficultyLevel = 2;
        showLevelUpModal();
        return true;
    } 
    // Check if player has reached level 3 threshold
    else if (correctScore === LEVEL_UP_THRESHOLDS.level3 && difficultyLevel === 2) {
        difficultyLevel = 3;
        showLevelUpModal();
        return true;
    }
    
    // Update the level display
    updateDifficultyDisplay();
    return false;
}

/**
 * Shows the level-up celebration modal
 */
function showLevelUpModal() {
    updateDifficultyDisplay();
    levelUpMessage.textContent = `🎊 Congratulations! 🎊\nYou've reached Level ${difficultyLevel}!`;
    levelUpModal.classList.add('show');  // Make modal visible
}

/**
 * Hides the level-up modal and generates a new question
 */
function hideLevelUpModal() {
    levelUpModal.classList.remove('show');  // Hide modal
    generateQuestion();  // Start next question
}

/**
 * Updates the difficulty level display on the score board
 */
function updateDifficultyDisplay() {
    if (difficultyLevelEl) {
        difficultyLevelEl.textContent = difficultyLevel;
    }
}


/* ============================================
   MULTIPLE CHOICE SYSTEM
   ============================================ */

/**
 * Generates 2 answer options: 1 correct and 1 wrong
 * The wrong answer is close to the correct answer for realistic choices
 * @param {number} correctAnswer - The correct answer
 * @returns {Array} - Array of 2 numbers (shuffled)
 */
function generateMultipleChoiceOptions(correctAnswer) {
    const options = new Set();  // Use Set to avoid duplicates
    options.add(correctAnswer);  // Add the correct answer
    
    const settings = getDifficultySettings();
    
    // Generate 1 wrong answer (for 2 total options)
    while (options.size < 2) {
        let wrongAnswer;
        
        // Generate a wrong answer that's close to the correct answer
        const offset = Math.random() < 0.5 ? -1 : 1;  // Randomly go higher or lower
        const offsetAmount = Math.floor(Math.random() * 2) + 1;  // Offset by 1 or 2
        wrongAnswer = correctAnswer + (offset * offsetAmount);
        
        // Make sure it's within valid range and different from correct answer
        if (wrongAnswer >= 2 && wrongAnswer <= settings.maxSum && wrongAnswer !== correctAnswer) {
            options.add(wrongAnswer);
        }
    }
    
    // Convert Set to Array and shuffle
    const optionsArray = Array.from(options);
    for (let i = optionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];  // Swap elements
    }
    
    return optionsArray;
}

/**
 * Creates clickable buttons for the multiple choice answers
 * @param {Array} options - Array of answer options
 */
function createMultipleChoiceButtons(options) {
    multipleChoiceContainer.innerHTML = '';  // Clear any existing buttons
    
    // Create a button for each option
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = option;
        // When clicked, check if this answer is correct
        button.addEventListener('click', () => checkMultipleChoiceAnswer(option));
        multipleChoiceContainer.appendChild(button);
    });
}


/* ============================================
   ANSWER CHECKING
   ============================================ */

/**
 * Checks if the selected answer is correct
 * Updates scores and shows appropriate feedback
 * @param {number} selectedAnswer - The answer the player chose
 */
function checkMultipleChoiceAnswer(selectedAnswer) {
    if (selectedAnswer === currentAnswer) {
        // ✅ CORRECT ANSWER
        correctScore++;  // Increase correct score
        correctScoreEl.textContent = correctScore;  // Update display
        
        // Check if player leveled up
        const leveledUp = checkLevelUp();
        
        // Only show normal feedback if not leveling up
        if (!leveledUp) {
            showFeedback(true);
        }
    } else {
        // ❌ WRONG ANSWER
        wrongScore++;  // Increase wrong score
        wrongScoreEl.textContent = wrongScore;  // Update display
        showFeedback(false);
    }
}


/* ============================================
   QUESTION GENERATION
   ============================================ */

/**
 * Generates a new addition question based on current difficulty
 * Displays the cards and answer choices
 */
function generateQuestion() {
    const settings = getDifficultySettings();
    
    // Generate first number (1 to max1)
    currentNum1 = Math.floor(Math.random() * settings.max1) + 1;
    
    // Generate second number (1 to max2, ensuring sum doesn't exceed maxSum)
    const maxNum2 = Math.min(settings.max2, settings.maxSum - currentNum1);
    currentNum2 = Math.floor(Math.random() * maxNum2) + 1;
    
    // Calculate the correct answer
    currentAnswer = currentNum1 + currentNum2;

    // Clear previous question
    num1Display.innerHTML = '';
    num2Display.innerHTML = '';
    
    // Display the cards for both numbers
    num1Display.appendChild(createCardDisplay(currentNum1));
    num2Display.appendChild(createCardDisplay(currentNum2));
    
    // Generate and display answer choices (2 buttons)
    const options = generateMultipleChoiceOptions(currentAnswer);
    createMultipleChoiceButtons(options);
}


/* ============================================
   FEEDBACK SYSTEM
   ============================================ */

/**
 * Shows feedback modal with appropriate message and icon
 * @param {boolean} isCorrect - True if answer was correct, false if wrong
 */
function showFeedback(isCorrect) {
    if (isCorrect) {
        // Show success message
        feedbackIcon.textContent = '🎉';
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.style.color = '#28a745';  // Green
    } else {
        // Show error message with correct answer
        feedbackIcon.textContent = '❌';
        feedbackMessage.textContent = `Wrong! The answer was ${currentAnswer}`;
        feedbackMessage.style.color = '#dc3545';  // Red
    }
    
    feedbackModal.classList.add('show');  // Make modal visible
}

/**
 * Hides the feedback modal and generates next question
 */
function hideFeedback() {
    feedbackModal.classList.remove('show');  // Hide modal
    generateQuestion();  // Generate new question
}


/* ============================================
   EVENT LISTENERS
   ============================================ */

// When "Next Question" button is clicked, hide feedback and show new question
nextBtn.addEventListener('click', hideFeedback);

// When "Continue Playing" button is clicked (in level up modal)
continueBtn.addEventListener('click', hideLevelUpModal);

// Allow clicking outside feedback modal to close it
feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {  // Only if clicked on the overlay, not the box
        hideFeedback();
    }
});

// Allow clicking outside level up modal to close it
levelUpModal.addEventListener('click', (e) => {
    if (e.target === levelUpModal) {  // Only if clicked on the overlay, not the box
        hideLevelUpModal();
    }
});


/* ============================================
   GAME INITIALIZATION
   ============================================ */

// Initialize the game when the page loads
updateDifficultyDisplay();  // Show initial level (1)
generateQuestion();         // Generate first question