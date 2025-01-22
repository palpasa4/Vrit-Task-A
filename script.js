const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0; 

function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.remove('prev', 'current', 'next');

    if (index === currentIndex) {
      item.classList.add('current');
    } else if (index === (currentIndex - 1 + items.length) % items.length) {
      item.classList.add('prev');
    } else if (index === (currentIndex + 1) % items.length) {
      item.classList.add('next');
    }
  });
}

currentIndex = 0;
updateCarousel();

let isDragging = false;
let startY = 0; 
let selectedItem = null;
//mousedown event: mouse is pressed down
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    if (!item.classList.contains('current')) return; 
    isDragging = true;
    selectedItem = item; 
    startY = e.clientY;
  });
});
//tracking the mouse drag 
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !selectedItem) return;
  const moveY = e.clientY - startY;

  if (moveY < -50) { 
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
    isDragging = false; 
  }
});
//mouseup event stop dragging
document.addEventListener('mouseup', () => {
  isDragging = false;
  selectedItem = null; 
});
