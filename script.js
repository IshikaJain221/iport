document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const fullImages = document.querySelectorAll('.full-image');
  const overlays = document.querySelectorAll('.overlay');
  const closeButtons = document.querySelectorAll('.close-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photos = document.querySelectorAll(".photo");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");
  const heading = document.getElementById("bouncy-heading");

  // Image popup logic
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      if(fullImages[i] && overlays[i]){
        fullImages[i].classList.add('active');
        overlays[i].classList.add('active');
      }
    });
  });

  closeButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if(fullImages[i] && overlays[i]){
        fullImages[i].classList.remove('active');
        overlays[i].classList.remove('active');
      }
    });
  });

  overlays.forEach((overlay, i) => {
    overlay.addEventListener('click', () => {
      if(fullImages[i] && overlays[i]){
        fullImages[i].classList.remove('active');
        overlays[i].classList.remove('active');
      }
    });
  });

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      button.classList.add("active");

      const category = button.dataset.category;

      photos.forEach(photo => {
        if (category === "all" || photo.classList.contains(category)) {
          photo.style.display = "inline-block";
        } else {
          photo.style.display = "none";
        }
      });
    });
  });

  // Lightbox viewer
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
      lightboxImg.src = "";
    });

    // Also close lightbox if clicked outside image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
      }
    });
  }

  // Navigation fade animation
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      const targetPage = category === 'all' ? 'index.html' : `${category}.html`;

      document.body.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => {
        window.location.href = targetPage;
      }, 500);
    });
  });

  // Bouncy heading animation
  if (heading) {
    const letters = heading.textContent.split("");
    heading.innerHTML = letters
      .map(
        (letter, index) =>
          `<span style="display:inline-block; animation:bounce 2s infinite ${index * 0.1}s;">${letter}</span>`
      )
      .join("");
  }
});
// Zoom in/out functionality for each photo
document.querySelectorAll('.photo').forEach(photo => {
  const img = photo.querySelector('img');
  const zoomInBtn = photo.querySelector('.zoom-in');
  const zoomOutBtn = photo.querySelector('.zoom-out');
  
  let scale = 1;  // default scale

  zoomInBtn.addEventListener('click', (e) => {
    e.stopPropagation();  // prevent triggering other click events (like lightbox)
    if (scale < 3) {      // max zoom limit
      scale += 0.1;
      img.style.transform = `scale(${scale})`;
    }
  });

  zoomOutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (scale > 1) {      // min zoom limit is original size
      scale -= 0.1;
      img.style.transform = `scale(${scale})`;
    }
  });

  // Optional: reset zoom on image click or on mouse leave
  img.addEventListener('dblclick', () => {
    scale = 1;
    img.style.transform = 'scale(1)';
  });
  // Hide all photos initially
document.querySelectorAll('.photo').forEach(photo => {
  photo.style.display = 'none';
});

// Initially hide all photos
document.querySelectorAll('.photo').forEach(photo => {
  photo.style.display = 'none';
});

// Only apply filtering if clicked card is "ALL"
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    if (!category || category !== 'all') return;

    document.querySelectorAll('.photo').forEach(photo => {
      photo.style.display = 'block';
    });
  });
});


});
