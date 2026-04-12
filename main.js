// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 75);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(r => revealObserver.observe(r));

// Project filter
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(card => {
    const cardCat = card.getAttribute('data-cat') || '';
    card.style.display = (cat === 'all' || cardCat.includes(cat)) ? '' : 'none';
  });
}

// Gallery data — projects with real images use `images` array, others use placeholder config
const galleryData = {
  planet: {
    label: 'PLANET SODA',
    images: [
      'images/planet/1.webp',
      'images/planet/2.webp',
      'images/planet/3.webp',
      'images/planet/4.webp',
      'images/planet/5.webp',
      'images/planet/6.webp',
      'images/planet/7.webp',
      'images/planet/8.webp',
      'images/planet/10.webp',
       'images/planet/9.webp',
      'images/planet/11.webp',
      'images/planet/12.webp',
      'images/planet/13.webp',
      'images/planet/14.webp',
      'images/planet/15.webp',
    ]
  },
  lana:     {
     label: 'LANAS SCOOPS',
     images: [
      'images/lanas/1.webp',
      'images/lanas/2.webp',
      'images/lanas/3.webp',
      'images/lanas/4.webp',
      'images/lanas/5.webp',
      'images/lanas/6.webp',
      'images/lanas/7.webp',
      'images/lanas/8.webp',
      'images/lanas/9.webp',
      'images/lanas/10.webp',
    ]
      },
  jojo:     { 
    label: 'JOJOS BURGER',
    images: [
      'images/jojos/j1.webp',
      'images/jojos/j2.webp',
      'images/jojos/j3.webp',
      'images/jojos/j4.webp',
      'images/jojos/j5.webp',
      'images/jojos/j6.webp',
    ]
 },
  norese: {
    label: 'NORESÈ',
    images: [
      'images/norese/n1.webp',
      'images/norese/n2.webp',
      'images/norese/n3.webp',
      'images/norese/n4.webp',
      'images/norese/n5.webp',
      'images/norese/n6.webp',
      'images/norese/n7.webp',
      'images/norese/n8.webp',
    ]
  },
  grandeur: {
    label: 'GRANDEUR',
    images: [
      'images/grandeur/g1.webp',
      'images/grandeur/g2.webp',
      'images/grandeur/g3.webp',
      'images/grandeur/g4.webp',
      'images/grandeur/g5.webp',
    ]
  },
  chrime: {
    label: 'CHRIME',
    images: [
      'images/chrime/c2.webp',
      'images/chrime/c3.webp',
      'images/chrime/c4.webp',
      'images/chrime/c6.webp',
      'images/chrime/c7.webp',
      'images/chrime/c8.webp',
      'images/chrime/c9.webp',
      'images/chrime/c10.webp',
      'images/chrime/c11.webp',
      'images/chrime/c1.webp',
    ]
  },
  ace: {
    label: 'ACE APPAREL',
    images: [
      'images/ace/ace2.webp',
      'images/ace/ace3.webp',
      'images/ace/ace6.webp',
      'images/ace/ace7.webp',
      'images/ace/ace8.webp',
      'images/ace/ace9.webp',
      'images/ace/ace10.webp',
      'images/ace/ace11.webp',
      'images/ace/ace15.png',
      'images/ace/ace16.png',
      'images/ace/ace17.png',
      'images/ace/ace1.webp',
      'images/ace/ace12.png',
      'images/ace/ace13.png',
      
      
      
    ]
  },
  etw: {
    label: 'ETW ORIGINALS',
    images: [
      'images/etw/et4.png',
      'images/etw/et2.png',
      'images/etw/et5.png',
      'images/etw/et6.webp',
      'images/etw/et7.webp',
      'images/etw/et8.webp',
      'images/etw/et9.webp',
      'images/etw/et10.webp',
    ]
  },
};

// Lightbox
let lightboxOpen = false;
function openLightbox(src) {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.96);display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn .2s ease';
    lb.innerHTML = '<img id="lightbox-img" style="max-width:92vw;max-height:92vh;object-fit:contain;box-shadow:0 0 80px rgba(0,0,0,.8)">';
    lb.addEventListener('click', closeLightbox);
    document.body.appendChild(lb);
  } else {
    lb.style.display = 'flex';
  }
  document.getElementById('lightbox-img').src = src;
  lightboxOpen = true;
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.style.display = 'none';
  lightboxOpen = false;
}

function openGallery(project, title) {
  const overlay = document.getElementById('galleryOverlay');
  const grid = document.getElementById('galleryGrid');
  const titleEl = document.getElementById('galleryTitle');
  titleEl.textContent = title;
  grid.innerHTML = '';

  const data = galleryData[project] || { count: 4, color: '#1a1510', accent: '#c1440e', label: project.toUpperCase() };

  if (data.images) {
    // Real images
    data.images.forEach((src, idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.cursor = 'zoom-in';
      item.style.background = '#0a0a0a';
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.label + ' — Image ' + (idx + 1);
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease';
      img.addEventListener('mouseover', () => img.style.transform = 'scale(1.04)');
      img.addEventListener('mouseout',  () => img.style.transform = 'scale(1)');
      img.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(src); });
      item.appendChild(img);
      grid.appendChild(item);
    });
  } else {
    // Placeholder SVGs for projects without real images yet
    for (let i = 1; i <= data.count; i++) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
          <rect width="400" height="300" fill="${data.color}"/>
          <rect x="30" y="30" width="340" height="240" fill="none" stroke="${data.accent}" stroke-width=".8" opacity=".2"/>
          <text x="200" y="145" font-family="'Bebas Neue',sans-serif" font-size="42" fill="${data.accent}" opacity=".1" text-anchor="middle" letter-spacing="6">${data.label}</text>
          <text x="200" y="170" font-family="'Space Mono',monospace" font-size="9" fill="#7a7065" opacity=".4" text-anchor="middle" letter-spacing="3">0${i} — PLACEHOLDER</text>
          <rect x="180" y="185" width="40" height="1" fill="${data.accent}" opacity=".25"/>
        </svg>
        <div class="gallery-placeholder-text">Image ${i}</div>
      `;
      grid.appendChild(item);
    }
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Ensure gallery starts at the first image and focus it for keyboard users
  setTimeout(() => {
    grid.scrollLeft = 0;
    const first = grid.querySelector('.gallery-item');
    if (first) {
      const img = first.querySelector('img') || first.querySelector('svg');
      if (img) img.tabIndex = -1;
      first.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
      first.focus && first.focus();
    }
  }, 20);
}

function closeGallery() {
  document.getElementById('galleryOverlay').classList.remove('open');
  closeLightbox();
  document.body.style.overflow = '';
}

// Keyboard: Escape closes lightbox first, then gallery
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (lightboxOpen) closeLightbox();
    else closeGallery();
  }
});

// Close gallery on backdrop click
document.getElementById('galleryOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeGallery();
});

// Ensure thumb images fill their box on large screens but avoid excessive upscaling
function adjustThumbImages() {
  document.querySelectorAll('.proj-thumb .proj-dummy img').forEach(img => {
    const container = img.closest('.proj-thumb');
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (img.naturalWidth && img.naturalHeight) {
      // if image is noticeably smaller than container, avoid upscaling -> use 'contain'
      const willUpscale = (img.naturalWidth < cw * 0.95) || (img.naturalHeight < ch * 0.95);
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectPosition = 'center';
      img.style.objectFit = willUpscale ? 'contain' : 'cover';
    } else {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
    }
  });
}

window.addEventListener('load', adjustThumbImages);
window.addEventListener('resize', () => { setTimeout(adjustThumbImages, 80); });
document.querySelectorAll('.proj-thumb .proj-dummy img').forEach(img => img.addEventListener('load', adjustThumbImages));