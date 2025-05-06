document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[id^="tab-"]');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedTab = tab.getAttribute('data-tab');
  
        tabContents.forEach(content => {
          content.classList.add('hidden');
        });
  
        document.getElementById(`tab-${selectedTab}`).classList.remove('hidden');
  
        tabs.forEach(t => t.classList.remove('border-purple-500', 'text-white'));
        tab.classList.add('border-purple-500', 'text-white');
      });
    });
  
    // Edit Profile Functionality
    const editProfileBtn = document.querySelector(".edit-profile");
    const profileNameElement = document.getElementById("username");
    const profileLocationElement = document.getElementById("userLocation");
  
    if (!editProfileBtn || !profileNameElement || !profileLocationElement) return;
  
    const savedName = localStorage.getItem("profileName");
    const savedLocation = localStorage.getItem("profileLocation");
  
    if (savedName) profileNameElement.textContent = savedName;
    if (savedLocation) profileLocationElement.textContent = savedLocation;
  
    // Create Modal
    const modal = document.createElement("div");
    modal.classList.add("modal", "fixed", "inset-0", "bg-black", "bg-opacity-70", "flex", "items-center", "justify-center", "z-50");
    modal.innerHTML = `
      <div class="modal-content bg-white text-black p-6 rounded-lg w-1/2 relative">
        <span class="close-btn absolute top-2 right-4 text-xl cursor-pointer">&times;</span>
        <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
        <input type="text" id="profileName" placeholder="Enter new name" class="block w-full p-2 mb-3 border border-gray-300 rounded">
        <input type="text" id="profileLocation" placeholder="Enter location" class="block w-full p-2 mb-3 border border-gray-300 rounded">
        <button id="saveProfile" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Save Changes</button>
      </div>
    `;
    modal.style.display = "none";
    document.body.appendChild(modal);
  
    const profileNameInput = modal.querySelector("#profileName");
    const profileLocationInput = modal.querySelector("#profileLocation");
    const saveProfileBtn = modal.querySelector("#saveProfile");
  
    editProfileBtn.addEventListener("click", () => {
      profileNameInput.value = profileNameElement.textContent;
      profileLocationInput.value = profileLocationElement.textContent;
      modal.style.display = "flex";
    });
  
    modal.querySelector(".close-btn").addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    saveProfileBtn.addEventListener("click", () => {
      const newName = profileNameInput.value.trim();
      const newLocation = profileLocationInput.value.trim();
  
      if (newName) {
        profileNameElement.textContent = newName;
        localStorage.setItem("profileName", newName);
      }
      if (newLocation) {
        profileLocationElement.textContent = newLocation;
        localStorage.setItem("profileLocation", newLocation);
      }
  
      modal.style.display = "none";
    });
  
    // Watch History Feature
    const watchHistoryEl = document.getElementById("watchHistory");
    const newMovieInput = document.getElementById("newMovieInput");
    const addMovieBtn = document.getElementById("addMovieBtn");
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
    if (watchHistoryEl && newMovieInput && addMovieBtn) {
      addMovieBtn.addEventListener("click", () => {
        const movie = newMovieInput.value.trim();
        if (movie !== "") {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = movie;
          watchHistoryEl.appendChild(li);
          newMovieInput.value = "";
  
          // Save watchlist to localStorage
          watchlist.push(movie);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }
      });
    }
  
    // Recommended Movies Feature
    const recommendedMoviesContainer = document.getElementById("recommendedMovies");
  
    if (recommendedMoviesContainer) {
      const movies = [
        { title: "Avatar", image: "movie11.jpg" },
        { title: "Titanic", image: "movie10.jpg" },
        { title: "Shutter Island", image: "movie9.jpg" }
      ];
  
      movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
  
        movieCard.innerHTML = `
          <img src="${movie.image}" alt="${movie.title}" class="movie-pic">
          <p>${movie.title}</p>
        `;
  
        recommendedMoviesContainer.appendChild(movieCard);
      });
    }
  
    // Mood Tracker
    const moodSelector = document.getElementById("moodSelector");
    const saveMoodBtn = document.getElementById("saveMoodBtn");
    const moodHistory = document.getElementById("moodHistory");
    const moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  
    saveMoodBtn.addEventListener("click", () => {
      const mood = moodSelector.value;
      if (mood) {
        const now = new Date().toLocaleString();
        moodLog.push({ mood, time: now });
        localStorage.setItem("moodLog", JSON.stringify(moodLog));
        updateMoodHistory();
        moodSelector.value = "";
      }
    });
  
    // Update Mood History
    function updateMoodHistory() {
      moodHistory.innerHTML = "<h4 class='mb-1 text-white font-semibold'>Mood History:</h4>";
      moodLog.slice().reverse().forEach(entry => {
        const div = document.createElement("div");
        div.textContent = `${entry.mood} - ${entry.time}`;
        moodHistory.appendChild(div);
      });
    }
  
    // Update Watchlist UI
    function updateWatchlist() {
      const list = document.getElementById("watchlist");
      list.innerHTML = "";
      watchlist.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = movie;
        list.appendChild(li);
      });
    }
  
    // Display stored data
    updateWatchlist();
    updateMoodHistory();
  });
  