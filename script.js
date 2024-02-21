document.addEventListener("DOMContentLoaded", function () {
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

  function getVimeoData(videoId) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.vimeo.com/videos/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${"5566eb86a7a59ccf4afb33564a1d3e57"}`,
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // Function to create Vimeo video slides
  async function createVideoSlides() {
    for (const videoId of videoIds) {
      const videoData = await getVimeoData(videoId);
      const videoThumbnailUrl = videoData.pictures.sizes[2].link;
      const videoEmbedUrl = `https://player.vimeo.com/video/${videoId}`;
      const slide = `
        <div class="video-slide">
          <a class="fancybox" data-src="${videoEmbedUrl}" data-options='{"speed": 700, "showCloseButton": true}'>
            <img src="${videoThumbnailUrl}" alt="Video Thumbnail">
          </a>
        </div>
      `;

      sliderContainer.insertAdjacentHTML("beforeend", slide);
      // sliderContainer.append(slide);
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

    //   Initialize Fancybox for opening videos in pop-up
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

  // Отримати всі елементи з класом "fancybox"
  const fancyboxElements = document.querySelectorAll(".fancybox");

  // Пройтися по кожному елементу та додати обробник події для відкриття поп-апу
  fancyboxElements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault(); // Заборонити стандартну поведінку посилання

      // Отримати посилання на відео
      const videoUrl = this.getAttribute("data-src");

      // Створити поп-ап та додати його в DOM
      const popup = document.createElement("div");
      popup.classList.add("popup");

      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", videoUrl);
      iframe.setAttribute("allowfullscreen", "");
      popup.appendChild(iframe);

      document.body.appendChild(popup);

      // Автовідтворення відео
      const player = new Vimeo.Player(iframe);
      player.play();
    });
  });

  // Call the function to create video slides
  createVideoSlides();
});
