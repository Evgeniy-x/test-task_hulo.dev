// script.js

// Replace 'YOUR_VIMEO_ACCESS_TOKEN' with your actual Vimeo access token
const accessToken = "YOUR_VIMEO_ACCESS_TOKEN";
const apiUrl = "https://api.vimeo.com/videos/";

// Array of Vimeo video IDs
const videoIds = ["824804225" /* Add other video IDs here */];

const slider = document.querySelector(".slider");
const popupContainer = document.querySelector(".popup-container");
const paginationContainer = document.querySelector(".pagination");

// Function to load Vimeo video player
function loadVideo(videoId) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://player.vimeo.com/video/${videoId}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.allowFullscreen = true;
  return iframe;
}

// Function to open the popup with video
function openPopup(videoId) {
  const videoPlayer = loadVideo(videoId);
  popupContainer.querySelector(".video-container").innerHTML = "";
  popupContainer.querySelector(".video-container").appendChild(videoPlayer);
  popupContainer.style.display = "block";
}

// Function to close the popup
function closePopup() {
  popupContainer.style.display = "none";
}

// Function to create pagination buttons
function createPaginationButtons() {
  videoIds.forEach((videoId, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.addEventListener("click", () => openPopup(videoId));
    paginationContainer.appendChild(button);
  });
}

// Function to initialize the slider
function initSlider() {
  videoIds.forEach((videoId) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.innerHTML = `<img src="${apiUrl}${videoId}/pictures/1280x720" alt="Video Thumbnail">`;
    slide.addEventListener("click", () => openPopup(videoId));
    slider.appendChild(slide);
  });
}

// Event listener to close the popup when clicked outside the video
popupContainer.addEventListener("click", (event) => {
  if (event.target === popupContainer) {
    closePopup();
  }
});

// Initialize the slider and pagination
initSlider();
createPaginationButtons();
