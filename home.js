// Go to chatbot
function goToChatbot() {
  window.location.href = "index.html";
}

// Open modal with full movie info
document.addEventListener("DOMContentLoaded", () => {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.dataset.title;
      const genre = card.dataset.genre;
      const rating = card.dataset.rating;
      const actors = card.dataset.actors;
      const description = card.dataset.description;
      const trailer = card.dataset.trailer;
      const imageSrc = card.querySelector("img").src;

      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDescription").textContent = description;
      document.getElementById("modalActors").textContent = `🎭 Cast: ${actors}`;
      document.getElementById("modalRating").textContent = `⭐ Rating: ${rating}`;
      document.getElementById("modalImage").src = imageSrc;
      document.getElementById("modalImage").alt = title;
      document.getElementById("modalTrailer").href = trailer;

      document.getElementById("movieModal").classList.remove("hidden");
    });
  });
});

// Close modal
function closeModal() {
  document.getElementById("movieModal").classList.add("hidden");
}

// Add comment
function addComment() {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value.trim();

  if (commentText !== "") {
    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;
    document.getElementById("commentsList").appendChild(commentItem);
    commentInput.value = "";
  }
}

// Filter movies
function filterMovies() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const genre = document.getElementById("genreFilter").value;
  const cards = document.querySelectorAll(".movie-card");

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const movieGenre = card.dataset.genre;

    const matchesTitle = title.includes(input);
    const matchesGenre = genre === "" || movieGenre === genre;

    if (matchesTitle && matchesGenre) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Auto-scroll slider (optional if needed)
let slider = document.getElementById("slider");
let scrollAmount = 0;

document.getElementById("nextBtn").onclick = () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
};

document.getElementById("prevBtn").onclick = () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
};
