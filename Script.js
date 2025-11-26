/* =========================
   Basic UI & Utilities
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  // show date
  document.getElementById("currentDate").textContent = new Date().toDateString();

  // hide loader
  window.setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 900);

  // typing effect start
  startTyping("Ahmad Najmi", document.getElementById("typedName"), 80);

  // attach scroll observers for fade-in & back-top
  setupScrollObservers();


  // prepare audio (muted by default)
  const audio = document.getElementById("bgAudio");
  if (audio) {
    audio.volume = 0.08; // low volume
    // don't autoplay audible audio — user will toggle to enable sound
  }
});

/* -------------------------
   Sidebar
   ------------------------- */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.left = (sidebar.style.left === "0px") ? "-260px" : "0px";
}
function closeSidebar(){ document.getElementById("sidebar").style.left = "-260px"; }

/* -------------------------
   Theme toggle
   ------------------------- */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* -------------------------
   Audio toggle (background)
   ------------------------- */
function toggleAudio() {
  const audio = document.getElementById("bgAudio");
  const btn = document.getElementById("audioToggle");
  if (!audio) {
    alert("No audio file found. Please add 'music.mp3' in the site folder.");
    return;
  }
  if (audio.paused) {
    audio.play().catch(()=>{}); // may be blocked until user interacts
    btn.classList.add("playing");
  } else {
    audio.pause();
    btn.classList.remove("playing");
  }
}

/* -------------------------
   Show/hide info grid
   ------------------------- */
function toggleInfo() {
  const info = document.getElementById("infoGrid");
  if (!info) return;
  info.style.display = (getComputedStyle(info).display === "none") ? "flex" : "none";
}

/* -------------------------
   Form validation
   ------------------------- */
function validateForm(){
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("message").value.trim();
  if (!name || !msg) { alert("Please fill in all fields."); return false; }
  alert("Message received — thanks!");
  return false; // prevent actual submit for demo
}

/* -------------------------
   Typing effect for name
   ------------------------- */
function startTyping(text, targetEl, speed = 80) {
  if (!targetEl) return;
  targetEl.textContent = "";
  let i = 0;
  const cursor = document.createElement("span");
  cursor.textContent = "|";
  cursor.style.opacity = "0.9";
  cursor.style.marginLeft = "6px";
  targetEl.parentNode.appendChild(cursor);

  const t = setInterval(() => {
    targetEl.textContent = text.slice(0, i+1);
    i++;
    if (i >= text.length) {
      clearInterval(t);
      // blink cursor
      let on = true;
      setInterval(()=> { cursor.style.opacity = (on? "0": "0.9"); on = !on; }, 450);
    }
  }, speed);
}

/* -------------------------
   Fade-in on scroll & Back-top button
   ------------------------- */
function setupScrollObservers() {
  // Elements to reveal
  const revealEls = document.querySelectorAll(".section, .glass-card, .portfolio-item");
  revealEls.forEach(el => el.classList.add("fade-in"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // back to top show/hide
  const back = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) back.style.display = "block"; else back.style.display = "none";
  });
}
function scrollToTop(){ window.scrollTo({top:0, behavior:"smooth"}); }

