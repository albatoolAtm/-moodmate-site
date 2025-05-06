// script.js

const chatBox = document.getElementById('chat-box');
const sendButton = document.getElementById('sendMessage');
const userInput = document.getElementById('user-input');

// Pre-defined movie suggestions based on mood
const moodToMovies = {
  happy: [
    "La La Land 🎶",
    "Paddington 🐻",
    "The Secret Life of Walter Mitty 🌍",
    "Mamma Mia! 🎤",
    "Sing 🎵",
    "The Intouchables 🤝",
    "The Grand Budapest Hotel 🏨",
    "Chef 👨‍🍳",
    "Amélie 💌",
    "Finding Nemo 🐠"
  ],
  sad: [
    "The Pursuit of Happyness 😢",
    "Inside Out 🧠",
    "Bridge to Terabithia 🌉",
    "A Silent Voice 🎥",
    "Up 🎈",
    "My Girl 💔",
    "The Fault in Our Stars 🌟",
    "Grave of the Fireflies 🔥",
    "Hachi: A Dog's Tale 🐶",
    "Lion 🌍"
  ],
  angry: [
    "John Wick 🔫",
    "Mad Max: Fury Road 🚗🔥",
    "The Dark Knight 🦇",
    "Whiplash 🥁",
    "Gladiator 🗡️",
    "Kill Bill 🔪",
    "300 🛡️",
    "Django Unchained 🔥",
    "V for Vendetta 🎭",
    "The Revenant 🐻"
  ],
  excited: [
    "Spider-Man: Into the Spider-Verse 🕸️",
    "Guardians of the Galaxy 🚀",
    "Scott Pilgrim vs. The World 🎸",
    "Ready Player One 🎮",
    "Inception 🌀",
    "The Avengers 🛡️",
    "Baby Driver 🚗🎵",
    "Edge of Tomorrow ⏳",
    "The Maze Runner 🧩",
    "Free Guy 🎮"
  ],
  bored: [
    "Inception 🌀",
    "Interstellar 🚀",
    "The Matrix 🕶️",
    "Knives Out 🔪",
    "Everything Everywhere All At Once ✨",
    "Tenet 🔄",
    "The Prestige 🎩",
    "Shutter Island 🧠",
    "Fight Club 👊",
    "The Truman Show 📺"
  ]
};


sendButton.addEventListener('click', sendMessage);

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Limit chat history to 30 messages
  if (chatBox.children.length > 30) {
    chatBox.removeChild(chatBox.children[0]);
  }
}

async function sendMessage() {
  const message = userInput.value.trim().toLowerCase();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';

  // Show typing animation
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('bot-message');
  typingDiv.innerHTML = `<p class="typing">Typing<span>.</span><span>.</span><span>.</span></p>`;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();

    // Check if the mood matches one we know
    const mood = detectMood(message);
    if (mood) {
      const movies = moodToMovies[mood];
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      appendMessage('bot', `Based on your mood (${mood}), I recommend watching: <strong>${randomMovie}</strong> 🎬`);
    } else {
      appendMessage('bot', "🤔 I'm not sure about that mood... Try typing 'happy', 'sad', 'excited', 'angry', or 'bored'!");
    }
  }, 1500); // Typing delay

}

// Simple mood detector
function detectMood(text) {
  if (text.includes('happy') || text.includes('enjoyable') || text.includes('joyful') || text.includes('excited')) return 'happy';
  if (text.includes('sad') || text.includes('depressed') || text.includes('unhappy')) return 'sad';
  if (text.includes('angry') || text.includes('mad') || text.includes('furious')) return 'angry';
  if (text.includes('excited') || text.includes('thrilled') || text.includes('pumped')) return 'excited';
  if (text.includes('bored') || text.includes('confused') || text.includes('lost')) return 'bored';
  return null;
}


// Handle suggested moods
const moodButtons = document.querySelectorAll('#suggested-moods button');
moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.innerText.toLowerCase();
    userInput.value = mood.replace(/[^a-z]/gi, ''); // Remove emoji
    sendMessage();
  });
});
