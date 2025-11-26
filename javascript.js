// ===============================
// 🕒 Auto-update footer year
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// 🌊 Smooth Scrolling for Anchors
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===============================
// 📸 Image Modal / Lightbox (Shared for Home + Education)
// ===============================
const photo = document.getElementById("photo");
const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

if (modal && modalImg && closeBtn) {
  // Reusable open/close functions
  const openModal = (src) => {
    if (!src) return;
    modalImg.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Home photo trigger
  if (photo) {
    const img = photo.querySelector("img");
    if (img) {
      photo.setAttribute('tabindex', '0');
      photo.setAttribute('role', 'button');
      photo.setAttribute('aria-label', 'Enlarge profile photo');

      photo.addEventListener("click", () => openModal(img.src));
      photo.addEventListener("keydown", e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(img.src);
        }
      });
    }
  }

  // Education certificate triggers (thumbnails)
  document.querySelectorAll(".cert").forEach(cert => {
    cert.addEventListener("click", () => {
      const fullSrc = cert.dataset.full;
      openModal(fullSrc);
    });
  });

  // Close modal interactions
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains('open')) closeModal();
  });
}

// ===============================
// 👀 Scroll Reveal Animation
// ===============================
(function() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { items.forEach(el => el.classList.add('visible')); return; }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => observer.observe(el));
})();

// ===============================
// 🌅 Entrance Animation
// ===============================
(function () {
  const onReady = () => {
    // Small delay ensures initial paint happens before transitions
    setTimeout(() => document.body.classList.add('is-loaded'), 30);
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  }
})();

// ===============================
// 💨 Clean up fade-in classes after animation
// ===============================
document.querySelectorAll('.fade-in').forEach((el) => {
  el.addEventListener('animationend', () => {
    el.classList.remove('fade-in');
  }, { once: true });
});

