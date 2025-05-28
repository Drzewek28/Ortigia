document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ingredients-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.makarony-card, .pizza-card');
      if (!card) return;
      card.classList.toggle('active');
      button.classList.toggle('active');
    });
  });
});
