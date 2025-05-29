document.addEventListener('DOMContentLoaded', function () {
  // Image popup logic (team.html etc.)
  const fullImages = document.querySelectorAll('.full-image');
  const overlays = document.querySelectorAll('.overlay');
  const closeButtons = document.querySelectorAll('.close-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      fullImages[i].classList.add('active');
      overlays[i].classList.add('active');
    });
  });

  closeButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      fullImages[i].classList.remove('active');
      overlays[i].classList.remove('active');
    });
  });

  overlays.forEach((overlay, i) => {
    overlay.addEventListener('click', () => {
      fullImages[i].classList.remove('active');
      overlays[i].classList.remove('active');
    });
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photos = document.querySelectorAll(".photo");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      button.classList.add("active");

      const category = button.dataset.category;

      photos.forEach(photo => {
        if (category === "all" || photo.classList.contains(category)) {
          photo.style.display = "block";
        } else {
          photo.style.display = "none";
        }
      });
    });
  });

  // Lightbox viewer for full image (gallery style)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");

  if (lightbox && lightboxImg && closeBtn) {
    photos.forEach(photo => {
      photo.addEventListener("click", () => {
        const imgSrc = photo.querySelector("img").src;
        lightboxImg.src = imgSrc;
        lightbox.classList.remove("hidden");
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });
  }

  // Navigation with fade animation
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const category = button.dataset.category;
    const targetPage = category === 'all' ? 'index.html' : `${category}.html`;

    const loader = document.getElementById('pageLoader');

    // Show the loader overlay with wave animation
    loader.classList.add('active');

    // Wait 3.5 seconds then navigate
    setTimeout(() => {
      window.location.href = targetPage;
    }, 3500);
  });
});


});
