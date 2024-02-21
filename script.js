// script.js

const clientToken = "5566eb86a7a59ccf4afb33564a1d3e57";
const clientSecret = "YOUR_CLIENT_SECRET";

const videoIds = [
  "824804225",
  "824804225",
  "824804225",
  "824804225",
  "824804225",
  "824804225",
  "824804225",
  "824804225",
];

const sliderContainer = document.querySelector(".slider");

// Function to get Vimeo video data
async function getVimeoData(videoId) {
  return await fetch(`https://api.vimeo.com/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${clientToken}`,
    },
  });
}

// Function to create Vimeo video slides
async function createVideoSlides() {
  for (const videoId of videoIds) {
    const videoData = await getVimeoData(videoId);
    console.log(videoData);
    const videoThumbnailUrl = videoData.pictures.sizes[2].link;
    const videoEmbedUrl = `https://player.vimeo.com/video/${videoId}`;

    const slide = `
        <div class="video-slide">
          <a class="fancybox" data-src="${videoEmbedUrl}" data-options='{"speed": 700, "showCloseButton": true}'>
            <img src="${videoThumbnailUrl}" alt="Video Thumbnail">
          </a>
        </div>
      `;

    sliderContainer.append(slide);
  }

  // Initialize the Slick Slider after all slides are created
  sliderContainer.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  // Initialize Fancybox for opening videos in pop-up
  //   $(".fancybox").fancybox({
  //     type: "iframe",
  //     iframe: {
  //       preload: false,
  //     },
  //     afterShow: function (instance, current) {
  //       // Autoplay the video after the pop-up is shown
  //       const iframe = current.$content.find("iframe");
  //       const player = new Vimeo.Player(iframe[0]);
  //       player.play();
  //     },
  //   });
}

// Call the function to create video slides

// galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
createVideoSlides();
