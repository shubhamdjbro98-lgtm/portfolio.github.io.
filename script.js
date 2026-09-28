const hero = document.querySelector('.interactive-hero');
const zones = document.querySelectorAll('.zone');
const character = document.querySelector('#characterFrame');
const bubble = document.querySelector('#bubble');
const sideMessage = document.querySelector('#sideMessage');
const hint = document.querySelector('#hintText');

const states = {
  left: {
    transform: 'translateX(-24px) rotate(-2deg)',
    bubble: 'Anyone here on the left?',
    side: 'Looking left…',
    hint: 'Left side detected'
  },
  right: {
    transform: 'translateX(24px) rotate(2deg)',
    bubble: 'Anyone here on the right?',
    side: 'Looking right…',
    hint: 'Right side detected'
  },
  center: {
    transform: 'translateY(-8px) scale(1.02)',
    bubble: 'Hey, it’s you!',
    side: 'Check out the portfolio ↓',
    hint: 'You found me'
  }
};

let resetTimer;

function activate(zoneName) {
  clearTimeout(resetTimer);
  const s = states[zoneName];
  character.style.transform = s.transform;
  bubble.textContent = s.bubble;
  bubble.classList.add('show');
  sideMessage.textContent = s.side;
  hint.textContent = s.hint;

  if (zoneName !== 'center') {
    resetTimer = setTimeout(resetHero, 2400);
  }
}

function resetHero() {
  character.style.transform = '';
  bubble.classList.remove('show');
  sideMessage.textContent = 'Move your cursor to explore.';
  hint.textContent = 'Move your cursor around';
}

zones.forEach(zone => {
  zone.addEventListener('mouseenter', () => activate(zone.dataset.zone));
});

window.addEventListener('mousemove', (event) => {
  if (window.innerWidth < 901) return;
  const x = event.clientX / window.innerWidth;
  if (x < 0.33) activate('left');
  else if (x > 0.67) activate('right');
  else activate('center');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
