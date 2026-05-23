/* ============================================================
   THREE.JS  —  IMMERSIVE 3D BACKGROUND
   ============================================================ */
(function () {
  const canvas = document.getElementById('bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
  cam.position.z = 28;

  /* ── Stars ── */
  const starGeo = new THREE.BufferGeometry();
  const N = 3000;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const palettes = [[0.3, 0.56, 1], [0.6, 0.42, 1], [0.0, 0.93, 1], [0.06, 0.85, 0.56]];
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random()-0.5)*220;
    pos[i*3+1] = (Math.random()-0.5)*220;
    pos[i*3+2] = (Math.random()-0.5)*220;
    const p = palettes[Math.floor(Math.random()*palettes.length)];
    col[i*3]=p[0]; col[i*3+1]=p[1]; col[i*3+2]=p[2];
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.14, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true
  })));

  /* ── Floating wireframe shapes ── */
  const shapes = [];
  const geos = [
    new THREE.IcosahedronGeometry(1.6, 0),
    new THREE.OctahedronGeometry(1.4, 0),
    new THREE.TorusGeometry(1.1, 0.35, 8, 18),
    new THREE.TetrahedronGeometry(1.5),
    new THREE.TorusKnotGeometry(0.9, 0.25, 60, 8),
    new THREE.DodecahedronGeometry(1.2, 0),
  ];
  const clrs = [0x4f8fff, 0x9b6bff, 0x00eeff, 0x10d98e, 0xa78bfa, 0x60a5fa];
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(
      geos[i % geos.length],
      new THREE.MeshBasicMaterial({ color: clrs[i%clrs.length], wireframe: true, transparent: true, opacity: 0.10 + Math.random()*0.08 })
    );
    m.position.set((Math.random()-0.5)*70, (Math.random()-0.5)*45, (Math.random()-0.5)*20 - 5);
    const s = 0.6 + Math.random()*2;
    m.scale.setScalar(s);
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    m.userData = {
      rx: (Math.random()-0.5)*0.008,
      ry: (Math.random()-0.5)*0.010,
      fy: Math.random()*Math.PI*2,
      fs: 0.006 + Math.random()*0.004,
      oy: m.position.y
    };
    scene.add(m);
    shapes.push(m);
  }

  /* ── Particle grid plane ── */
  const gW = 90, gH = 60;
  const gridGeo = new THREE.BufferGeometry();
  const gpos = new Float32Array(gW * gH * 3);
  let k = 0;
  for (let x = 0; x < gW; x++)
    for (let y = 0; y < gH; y++) {
      gpos[k++] = (x/gW - 0.5) * 130;
      gpos[k++] = (y/gH - 0.5) * 90;
      gpos[k++] = -25;
    }
  gridGeo.setAttribute('position', new THREE.BufferAttribute(gpos,3));
  scene.add(new THREE.Points(gridGeo, new THREE.PointsMaterial({ size:0.05, color:0x4f8fff, transparent:true, opacity:0.10 })));

  /* ── Mouse & scroll ── */
  let mx = 0, my = 0, sy = 0;
  addEventListener('mousemove', e => { mx=(e.clientX/innerWidth-0.5)*2; my=-(e.clientY/innerHeight-0.5)*2; });
  addEventListener('scroll',    () => { sy = scrollY; });
  addEventListener('resize',    () => { cam.aspect=innerWidth/innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });

  /* ── Animate ── */
  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Stars drift
    scene.children[0].rotation.y = t * 0.018;
    scene.children[0].rotation.x = t * 0.006;

    // Camera parallax
    cam.position.x += (mx * 2.5 - cam.position.x) * 0.025;
    cam.position.y += (my * 1.8 - cam.position.y) * 0.025;
    cam.position.z  = 28 + sy * 0.015;
    cam.lookAt(scene.position);

    // Shapes float & spin
    shapes.forEach(s => {
      s.rotation.x += s.userData.rx;
      s.rotation.y += s.userData.ry;
      s.userData.fy += s.userData.fs;
      s.position.y   = s.userData.oy + Math.sin(s.userData.fy) * 1.8;
    });

    renderer.render(scene, cam);
  })();
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function () {
  const c = document.getElementById('cursor');
  const g = document.getElementById('cursor-glow');
  let gx = 0, gy = 0;

  addEventListener('mousemove', e => {
    c.style.left = e.clientX + 'px';
    c.style.top  = e.clientY + 'px';
    gx += (e.clientX - gx) * 0.14;
    gy += (e.clientY - gy) * 0.14;
    g.style.left = e.clientX + 'px';
    g.style.top  = e.clientY + 'px';
  });
})();

/* ============================================================
   NAVBAR SCROLL + ACTIVE LINK
   ============================================================ */
(function () {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('#nav ul a');

  addEventListener('scroll', () => {
    nav.classList.toggle('stuck', scrollY > 60);
    let cur = '';
    document.querySelectorAll('.section, #hero').forEach(s => {
      if (scrollY >= s.offsetTop - 140) cur = s.id;
    });
    links.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === '#' + cur));
  });
})();

/* ============================================================
   REVEAL ON SCROLL  (IntersectionObserver)
   ============================================================ */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ============================================================
   PHOTO — 3D TILT ON MOUSE MOVE
   ============================================================ */
(function () {
  const scene = document.querySelector('.photo-scene');
  const right  = document.getElementById('heroRight');
  if (!right) return;

  right.addEventListener('mousemove', e => {
    const r  = right.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - 0.5) * -18;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  18;
    scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    scene.style.transition = 'transform 0.05s ease';
  });
  right.addEventListener('mouseleave', () => {
    scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    scene.style.transition = 'transform 0.6s ease';
  });
})();

/* ============================================================
   HERO MOUSE GLOW
   ============================================================ */
(function () {
  const hero = document.getElementById('hero');
  const glow = document.createElement('div');
  glow.style.cssText = 'position:absolute;width:600px;height:600px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(79,143,255,0.07) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left .4s ease,top .4s ease;z-index:0';
  hero.style.position = 'relative';
  hero.appendChild(glow);
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + 'px';
    glow.style.top  = (e.clientY - r.top)  + 'px';
  });
})();

/* ============================================================
   TYPEWRITER  — Hero name
   ============================================================ */
(function () {
  const el = document.getElementById('typed-name');
  if (!el) return;
  const txt = el.textContent;
  el.textContent = '';
  let i = 0;
  setTimeout(() => {
    const t = setInterval(() => {
      el.textContent += txt[i++];
      if (i >= txt.length) clearInterval(t);
    }, 65);
  }, 700);
})();

/* ============================================================
   COUNTER ANIMATION  — Stats
   ============================================================ */
(function () {
  const nums = document.querySelectorAll('.snum[data-target]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.target);
      let cur = 0;
      const step = Math.ceil(end / 30);
      const t = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur;
        if (cur >= end) clearInterval(t);
      }, 40);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
})();

/* ============================================================
   3D TILT — Project cards
   ============================================================ */
(function () {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
      card.style.transform  = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      card.style.transition = 'transform 0.08s ease';
      card.style.boxShadow  = `${-ry/2}px ${rx/2}px 40px rgba(79,143,255,0.18)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1)';
      card.style.boxShadow  = '';
    });
  });
})();

/* ============================================================
   PARALLAX — Hero photo on scroll
   ============================================================ */
(function () {
  const right = document.getElementById('heroRight');
  const badges = document.querySelectorAll('.tech-badge');
  addEventListener('scroll', () => {
    const s = scrollY;
    if (right) right.style.transform = `translateY(${s * 0.18}px)`;
    badges.forEach((b, i) => {
      b.style.transform = `translateY(${s * (0.08 + i * 0.03)}px)`;
    });
  });
})();

/* ============================================================
   PILL hover ripple
   ============================================================ */
(function () {
  document.querySelectorAll('.pill').forEach((pill, i) => {
    pill.style.transitionDelay = `${i * 0.03}s`;
    pill.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `position:absolute;width:8px;height:8px;background:rgba(79,143,255,.5);border-radius:50%;left:${e.offsetX-4}px;top:${e.offsetY-4}px;transform:scale(0);animation:ripple .4s ease forwards;pointer-events:none`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
  const s = document.createElement('style');
  s.textContent = '@keyframes ripple{to{transform:scale(20);opacity:0}}';
  document.head.appendChild(s);
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function () {
  const form = document.getElementById('cform');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '✅ Sent!';
    btn.style.background = 'linear-gradient(135deg,#10d98e,#059669)';
    setTimeout(() => { btn.textContent = 'Send Message ✉️'; btn.style.background = ''; form.reset(); }, 3000);
  });
})();

/* ============================================================
   SMOOTH  active nav link style
   ============================================================ */
const activeStyle = document.createElement('style');
activeStyle.textContent = '#nav ul a.active-link{color:#e8edf5}#nav ul a.active-link::after{width:100%}';
document.head.appendChild(activeStyle);

console.log('%c⚡ Tharun Velamakuru', 'color:#4f8fff;font-size:22px;font-weight:900');
console.log('%cBuilding real apps that ship to production 🚀', 'color:#9b6bff;font-size:13px');
console.log('%cGitHub → github.com/Tharunk043', 'color:#00eeff;font-size:12px');
