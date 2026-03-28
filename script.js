// ================================================================
//  script.js — Abdeljalil Medjadi Portfolio
// ================================================================

// ── 1. Page Router ───────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));

  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('page-enter');
    setTimeout(() => target.classList.remove('page-enter'), 400);
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 2. Mobile Menu ───────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ── 3. Project Filter ────────────────────────────────────────────
function filterCards(category) {
  // Update active chip
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === category);
  });

  // Show / hide cards
  document.querySelectorAll('.card').forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });
}

// ── 4. Footer year ───────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── 5. Feather Icons ─────────────────────────────────────────────
feather.replace();

// ── 6. Default page ──────────────────────────────────────────────
showPage('home');

// ── 7. Terminal animation (runs ONCE on load) ────────────────────
// Edit the lines array to change what the terminal types.
const TERMINAL_LINES = [
  { text: 'abdeljalil@portfolio:~$ whoami',                         cls: 't-prompt',  pause: 500 },
  { text: 'abdeljalil_medjadi',                                     cls: 't-out',     pause: 150 },
  { text: '',                                                        cls: 'blank',     pause: 80  },
  { text: 'abdeljalil@portfolio:~$ skills_scan',                    cls: 't-prompt',  pause: 500 },
  { text: '# Scanning core competencies...',                        cls: 't-comment', pause: 100 },
  { text: '> [Computer Architecture]  ->  MIPS, ALU, LogicSim',     cls: 't-key',     pause: 60  },
  { text: '> [Cybersecurity]          ->  Fundamentals, Network Defense', cls: 't-key', pause: 60 },
  { text: '> [Systems]                ->  C, Python, C++, Bash',    cls: 't-key',     pause: 60  },
  { text: '',                                                        cls: 'blank',     pause: 80  },
];

const termEl   = document.getElementById('terminal-output');
let lineIdx    = 0;
let charIdx    = 0;
let currentEl  = null;

function typeNext() {
  // All lines done — show idle cursor
  if (lineIdx >= TERMINAL_LINES.length) {
    const idle = document.createElement('div');
    idle.id  = 'term-cursor';
    idle.className = 't-idle';
    idle.textContent = 'abdeljalil@portfolio:~$ ';
    termEl.appendChild(idle);
    return; // stop — no loop
  }

  const { text, cls, pause } = TERMINAL_LINES[lineIdx];

  // Blank line
  if (cls === 'blank') {
    const br = document.createElement('div');
    br.style.height = '4px';
    termEl.appendChild(br);
    lineIdx++;
    setTimeout(typeNext, 60);
    return;
  }

  // First character of a new line — create the element
  if (charIdx === 0) {
    currentEl = document.createElement('div');
    currentEl.className = cls;
    termEl.appendChild(currentEl);
  }

  // Type one character
  currentEl.textContent = text.slice(0, charIdx + 1);
  charIdx++;

  if (charIdx < text.length) {
    // Still typing this line
    const speed = cls === 't-prompt' ? 45 : cls === 't-comment' ? 25 : 20;
    setTimeout(typeNext, speed);
  } else {
    // Line finished
    charIdx = 0;
    lineIdx++;
    setTimeout(typeNext, pause);
  }
}

// Start after short delay
setTimeout(typeNext, 900);
