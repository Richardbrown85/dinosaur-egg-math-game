/* Game states variables */

// Score tracking
let correctScore = 0;          // Number of correct answers
let wrongScore = 0;            // Number of wrong answers
let currentNum1 = 0;           // First number in the addition problem
let currentNum2 = 0;           // Second number in the additon problem
let currentAnswer = 0;         // The correct answer to the current question
let difficultylevel = 1;       // Current difficulty level (1, 2, or 3)

// EASY TO CHANGE: Level up thresholds
// Change these numbers to adjust when players level up
const LEVEL_UP_THRESHOLDS = {
    level2: 10,   // Player reaches level 2 after 10 correct answers
    level3: 20    // Player reaches level 3 after 20 corret answers
};

/* DOM Element references */

// Get references to HTML elements so we can update them
const num1Display = document.getElementById('num1');                              // First number display area
const num2Display = document.getElementById('num2');                              // Second number display area
const multiChoiceContainer = document.getElementById('multipleChoiceContainer');  // Answer buttons container
const feedbackModal = document.getElementById('feedbackModal');                   // Correct/wrong popup
const feedbackIcon = document.getElementById('feedbackIcon');                     // Emoji icon in feedback
const feedbackMessage = document.getElementById('feedbackMessage');               // Feedback text message
const nextBtn = document.getElementById('nextBtn');                               // Next Question button
const levelUpModal = document.getElementById('levelUpModal');                     // Level up celebration popup
const levelUpMessage = document.getElementById('levelUpMessage');                 // Level up message text
const continueBtn = document.getElementById('continueBtn');                       // Continue button in level up modal
const correctScoreEl = document.getElementById('correctScore');                   // Correct score display
const wrongScoreEl = document.getElementById('wrongScore');                       // Wrong score display
const difficultyLevelEl = document.getElementById('difficultyLevel');             // Level display

/* Card Image Configuration */

// Array of cards images - each card shows a specific number of eggs
// card1.webp = 1 egg, card2.webp = 2 eggs, etc.
const cardImages = [
    'images/card1.webp',  // Index 0: 1 egg
    'images/card2.webp',  // Index 1: 2 eggs
    'images/card3.webp',  // Index 2: 3 eggs
    'images/card4.webp',  // Index 3: 4 eggs
    'images/card5.webp',  // Index 4: 5 eggs
];

/* Card display functions */

/**
 * Creates and returns a card display element showing the specified number
 * @param {number} num - The number to display (1-5)
 * @returns {html} - Container with the card image
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

/* Difficulty system */

/**
 * Returns the settings for current difficulty level
 * Level 1: Easy (sums up to 5)
 * Level 2: Medium (sums up to 10)
 * Levels 3: Hard (sums up to 15)
 * @returns {object} - Settings object with max values for numbers
 */
function getDifficultySettings() {
    switch(difficultylevel) {
        case 1:
            // Level 1: Numbers 1-4, sums up to 5
            return { max1: 4, max2: 4, maxSum: 5};
        case 2:
            // Level 2: Numbers 1-5, sums up to 10
            return { max1: 5, max2: 5, maxsum: 10};
        case 3:
        default:
            // Level 3: Numbers 1-9, sums up to 15
            return { max1: 9, max2: 9, maxSum: 15};            
    }
}

/**
 * Checks if the player has reached a level-up threshold
 * Updates the difficulty level and shows celebration if needed
 * @returns {boolean} - True if player leveled up, false otherwise
 */
function checkLevelUp() {
    // TODO: implement this function
}

/**
 * Shows the level-up celebration modal
 */
function showLevelUpModal() {
    // TODO: implement this function
}

/**
 * Hides the level-up modal and generates a new question
 */
function hideLevelUpModal() {
    // TODo: implement this function
}

/**
 * Updates the difficulty level display on the score board
 */
function updateDifficultyDisplay() {
    // TODO: implement this function
}

/* Multiple choice system */

/**
 * Generates 2 answer options: 1 correct and 1 wrong
 * The wrong answer is close to the correct answer for realistic choices
 * @param {number} correctAnswer - The correct answer
 * @returns {Array} - Array of 2 numbers (shuffled)
 */
function generateMultipleChoiceOptions(correctAnswer) {
    // TODO: implement this function
}

/**
 * Creates clickable buttons for the multiple choice answers
 * @param {Array} options - Array of answer options
 */
function createMultipleChoiceButtons(options) {
    // TODO: implement this function
}

/* Answer Checking */

/**
 * Checks if the selected answer is correct
 * Updates scores and shows appropiate feedback
 * @param {number} selectedAnswer - The answer the player chose
 */
function checkMultipleChoiceAnswer(selectedAnswer) {
    // TODO: implement this function
}

/* Question Generation */

/**
 * Generates a new addition question based on current difficulty
 * Displays the cards and answer choices
 */
function generateQuestion() {
    // TODO: implement this function
}

/* Feedback System */

/**
 * Shows feedback modal with appropiate message and icon
 * @param {boolean} isCorrect - True if answer was correct, false if wrong
 */
function showFeedback(isCorrect) {
    // TODO: implement this function
}

/**
 * Hides the feedback modal and generates next question
 */
function hideFeedback() {
    // TODO: implement this function
}