// ===== THREE.JS 3D BACKGROUND =====
(function () {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Star field
  const starCount = 2000;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      starColors[i * 3] = 0.23; starColors[i * 3 + 1] = 0.51; starColors[i * 3 + 2] = 1.0;
    } else if (colorChoice < 0.66) {
      starColors[i * 3] = 0.55; starColors[i * 3 + 1] = 0.36; starColors[i * 3 + 2] = 1.0;
    } else {
      starColors[i * 3] = 0.5; starColors[i * 3 + 1] = 0.9; starColors[i * 3 + 2] = 1.0;
    }
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Floating geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.OctahedronGeometry(1.5),
    new THREE.TetrahedronGeometry(1.2),
    new THREE.IcosahedronGeometry(1.0),
    new THREE.TorusGeometry(1, 0.3, 8, 20),
    new THREE.TorusKnotGeometry(0.8, 0.2, 60, 8),
  ];

  const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xa78bfa];

  for (let i = 0; i < 12; i++) {
    const geo = geometries[i % geometries.length];
    const mat = new THREE.MeshBasicMaterial({
      color: colors[i % colors.length],
      wireframe: true,
      transparent: true,
      opacity: 0.15 + Math.random() * 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20 - 5
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const scale = 0.5 + Math.random() * 1.5;
    mesh.scale.setScalar(scale);
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.01,
      rotY: (Math.random() - 0.5) * 0.01,
      floatY: Math.random() * Math.PI * 2,
      floatSpeed: 0.008 + Math.random() * 0.005,
      originalY: mesh.position.y
    };
    scene.add(mesh);
    shapes.push(mesh);
  }

  // Particle grid
  const gridCount = 80;
  const gridGeo = new THREE.BufferGeometry();
  const gridPositions = new Float32Array(gridCount * gridCount * 3);
  let idx = 0;
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      gridPositions[idx++] = (x / gridCount - 0.5) * 120;
      gridPositions[idx++] = (y / gridCount - 0.5) * 80;
      gridPositions[idx++] = -20;
    }
  }
  gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
  const gridMat = new THREE.PointsMaterial({
    size: 0.06,
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.12
  });
  scene.add(new THREE.Points(gridGeo, gridMat));

  // Mouse tracking
  let mouseX = 0, mouseY = 0;
  let scrollY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Slowly rotate star field
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.00005;

    // Camera follows mouse subtly
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
    camera.position.z = 30 + scrollY * 0.02;
    camera.lookAt(scene.position);

    // Animate shapes
    shapes.forEach(shape => {
      shape.rotation.x += shape.userData.rotX;
      shape.rotation.y += shape.userData.rotY;
      shape.userData.floatY += shape.userData.floatSpeed;
      shape.position.y = shape.userData.originalY + Math.sin(shape.userData.floatY) * 1.5;
    });

    renderer.render(scene, camera);
  }
  animate();
})();

// ===== CUSTOM CURSOR =====
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let fx = 0, fy = 0;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    fx += (e.clientX - fx) * 0.12;
    fy += (e.clientY - fy) * 0.12;
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-card, .skill-pill, .info-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
})();

// ===== NAVBAR SCROLL =====
(function () {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active nav link
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });
})();

// ===== REVEAL ON SCROLL =====
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ===== ROLE CAROUSEL =====
(function () {
  const roles = document.querySelectorAll('.role');
  let current = 0;

  setInterval(() => {
    roles[current].classList.remove('active');
    current = (current + 1) % roles.length;
    roles[current].classList.add('active');
  }, 2500);
})();

// ===== 3D TILT EFFECT ON PROJECT CARDS =====
(function () {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
})();

// ===== SCROLL PARALLAX FOR HERO ORB =====
(function () {
  const orb = document.querySelector('.hero-orb');
  const floatingCards = document.querySelectorAll('.floating-card');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (orb) {
      orb.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    floatingCards.forEach((card, i) => {
      card.style.transform = `translateY(${scrolled * (0.1 + i * 0.05)}px)`;
    });
  });
})();

// ===== GLOWING MOUSE TRAIL ON HERO =====
(function () {
  const hero = document.getElementById('hero');
  let glowEl = null;

  if (hero) {
    glowEl = document.createElement('div');
    glowEl.style.cssText = `
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.3s ease, top 0.3s ease;
      z-index: 1;
    `;
    hero.appendChild(glowEl);

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glowEl.style.left = (e.clientX - rect.left) + 'px';
      glowEl.style.top = (e.clientY - rect.top) + 'px';
    });
  }
})();

// ===== CONTACT FORM =====
(function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        btn.textContent = 'Send Message ✉️';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
})();

// ===== SKILL PILL STAGGER ANIMATION =====
(function () {
  const pills = document.querySelectorAll('.skill-pill');
  pills.forEach((pill, i) => {
    pill.style.animationDelay = `${i * 0.05}s`;
  });
})();

// ===== SMOOTH SECTION TRANSITIONS (Perspective Scroll) =====
(function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.filter = 'blur(0px)';
      } else {
        const boundingRect = entry.boundingClientRect;
        if (boundingRect.top > 0) {
          entry.target.style.opacity = '0.3';
          entry.target.style.filter = 'blur(2px)';
        }
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
    observer.observe(section);
  });
})();

// ===== TYPEWRITER EFFECT FOR HERO NAME =====
(function () {
  const name = document.querySelector('.name-line.gradient-text');
  if (!name) return;
  const text = name.textContent;
  name.textContent = '';
  let i = 0;

  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        name.textContent += text[i];
        i++;
        setTimeout(type, 60);
      }
    };
    type();
  }, 600);
})();

console.log('%c⚡ Tharun Velamakuru | Portfolio', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cBuilding real apps that ship to production 🚀', 'color: #8b5cf6; font-size: 14px;');
console.log('%cGitHub: https://github.com/Tharunk043', 'color: #06b6d4; font-size: 12px;');
