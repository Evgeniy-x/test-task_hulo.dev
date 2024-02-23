document.addEventListener("DOMContentLoaded", function () {
  const clientToken = "5566eb86a7a59ccf4afb33564a1d3e57";
  // const clientSecret = "YOUR_CLIENT_SECRET";

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

  const sliderContainer = document.querySelector(".glide");

  // Function to create Vimeo video slides
  async function createVideoSlides() {
    for (const videoId of videoIds) {
      const videoData = await getVimeoData(videoId);
      const videoThumbnailUrl = videoData.pictures.sizes[2].link;
      const videoEmbedUrl = `https://player.vimeo.com/video/${videoId}`;
      const slide = `
        <li class="glide__slide">
          <a href="${videoEmbedUrl}" class="video-popup" data-vimeo-id="${videoId}">
            <img src="${videoThumbnailUrl}" alt="Video thumbnail">
          </a>
        </li>
      `;

      sliderContainer.insertAdjacentHTML("beforeend", slide);
    }
  }
  createVideoSlides();

  // Чекаєм рендер сторінки, потім виконуєм:
  new Glide(".glide", {
    type: "slider",
    startAt: 0,
    perView: 4,
    focusAt: "center",
    breakpoints: {
      768: {
        perView: 2,
      },
    },
  }).mount();

  const lightbox = new SimpleLightbox(".video-popup", {
    nav: true,
    navText: ["&larr;", "&rarr;"],
    docClose: false, // Запобігає закриттю попапу при кліку поза ним
    captionsData: "alt",
    autoplay: true, // Автоматичне відтворення відео
    autoplaySpeed: 500, // Швидкість автоматичного відтворення відео (в мілісекундах)
    dots: true, // Пагінація з точок
    slideEnd: function () {
      // Викликається після переходу до нового слайду
      // Тут ви можете вставити код для автоматичного відтворення відео, якщо це потрібно
    },
  });

  // Зупинка автоматичного відтворення при відкритті попапу
  lightbox.on("show.simplelightbox", function () {
    lightbox.autoplayStop();
  });

  // Відновлення автоматичного відтворення при закритті попапу
  lightbox.on("close.simplelightbox", function () {
    lightbox.autoplayStart();
  });
  // Call the function to create video slides
});
