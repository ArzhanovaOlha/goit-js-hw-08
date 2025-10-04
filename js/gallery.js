const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.gallery');

const galleryMarkup = images
  .map(
    ({ preview, original, description }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
  )
  .join('');
gallery.innerHTML = galleryMarkup;

let currentIndex = 0;
let instance = null;

function openModal(index) {
  currentIndex = index;

  instance = basicLightbox.create(
    `
    <div class="lightbox">
      <button class="close-btn">×</button>
      <div class="pagination">${currentIndex + 1}/${images.length}</div>
      <button class="prev-btn">❮</button>
      <img class="lightbox-image" src="${images[currentIndex].original}" alt="${images[currentIndex].description}">
      <button class="next-btn">❯</button>
      <div class="caption"><h4 class="caption-text">${images[currentIndex].description}</h4></div>
    </div>
  `,
    {
      onShow: (instance) => {
        const modalEl = instance.element();
        modalEl.querySelector('.close-btn').onclick = () => instance.close();
        modalEl.querySelector('.prev-btn').onclick = showPrev;
        modalEl.querySelector('.next-btn').onclick = showNext;
        document.addEventListener('keydown', handleKey);
      },
      onClose: () => {
        document.removeEventListener('keydown', handleKey);
      },
    }
  );

  instance.show();
}

function updateImage() {
  const modalEl = instance.element();
  const img = modalEl.querySelector('.lightbox-image');
  const pagination = modalEl.querySelector('.pagination');
  const caption = modalEl.querySelector('.caption-text');

  img.src = images[currentIndex].original;
  img.alt = images[currentIndex].description;
  pagination.textContent = `${currentIndex + 1}/${images.length}`;
  caption.textContent = images[currentIndex].description;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

function handleKey(e) {
  if (e.key === 'Escape') instance.close();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
}

gallery.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const clickedSrc = e.target.dataset.source;
  const index = images.findIndex((img) => img.original === clickedSrc);
  openModal(index);
});
