document.addEventListener("DOMContentLoaded", function () {
  const clientToken = "5566eb86a7a59ccf4afb33564a1d3e57";

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

  const sliderContainer = document.querySelector(".glide");

  function getVimeoData(videoId) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.vimeo.com/videos/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  // Function to create Vimeo video slidesvideo-slide
  async function createVideoSlides() {
    for (const videoId of videoIds) {
      const videoData = await getVimeoData(videoId);
      const videoThumbnailUrl = videoData.pictures.sizes[2].link;
      const videoEmbedUrl = `https://player.vimeo.com/video/${videoId}`;
      const slide = `
        <li class="glide__slide">
          <a class="fancybox" data-src="${videoEmbedUrl}" data-options='{"speed": 700, "showCloseButton": true}'>
            <img src="${videoThumbnailUrl}" alt="Video Thumbnail">
          </a>
        </li>
      `;

      sliderContainer.insertAdjacentHTML("beforeend", slide);
    }

    //   Initialize Fancybox for opening videos in pop-up

    // $(".fancybox").fancybox({
    //   type: "iframe",
    //   iframe: {
    //     preload: false,
    //   },
    //   afterShow: function (instance, current) {
    //     // Autoplay the video after the pop-up is shown
    //     const iframe = current.$content.find("iframe");
    //     const player = new Vimeo.Player(iframe[0]);
    //     player.play();
    //   },
    // });
  }

  // Call the function to create video slides
  createVideoSlides();

  document.addEventListener("DOMContentLoaded", function () {
    const glide = new Glide(sliderContainer, {
      type: "slider",
      startAt: 0,
      perView: 4,
      focusAt: "center",
      breakpoints: {
        768: {
          perView: 2,
        },
      },
      pagination: {
        el: ".glide__pagination",
        clickable: true,
      },
    });

    glide.mount();
  });
});
