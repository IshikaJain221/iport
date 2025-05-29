
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    const targetPage = category === 'all' ? 'index.html' : `${category}.html`;

    document.body.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => {
      window.location.href = targetPage;
    }, 500);
  });
});
