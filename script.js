var biggestIndex = 100;

function openWindowById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  el.style.left = '50%';
  el.style.top = '20vh';
  el.style.transform = 'translateX(-50%)';
}

function closeWindowById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
}

const welcomeOpenBtn = document.getElementById('welcomeopen');
const welcomeCloseBtn = document.getElementById('welcomeclose');
if (welcomeOpenBtn) welcomeOpenBtn.addEventListener('click', () => openWindowById('welcome'));
if (welcomeCloseBtn) welcomeCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('welcome'); });

// Prevent clicks on the close button from starting window drag
if (welcomeCloseBtn) {
  welcomeCloseBtn.addEventListener('mousedown', (e) => e.stopPropagation());
  welcomeCloseBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
}

const vaianaIcon = document.getElementById('vaianaAppIcon');
const vaianaWindowClose = document.getElementById('Vaianaapp-windowclose');
if (vaianaIcon) {
  vaianaIcon.addEventListener('click', () => {
    
    vaianaIcon.classList.toggle('selected');
    
    openWindowById('Vaianaapp-window');
  });
}
// Prevent the close button from triggering the window drag handler,
// and wire the click to actually close the window.
if (vaianaWindowClose) {
  vaianaWindowClose.addEventListener('mousedown', (e) => e.stopPropagation());
  vaianaWindowClose.addEventListener('pointerdown', (e) => e.stopPropagation());
  vaianaWindowClose.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('Vaianaapp-window'); });
}

document.addEventListener('DOMContentLoaded', () => {
  
  const appWin = document.getElementById('Vaianaapp-window');
  if (appWin) appWin.style.display = 'none';
});

function dragElement(el, handleSelector) {
  if (!el) return;
  const handle = handleSelector ? el.querySelector(handleSelector) : el;
  if (!handle) return;

  let dragState = null;

  handle.addEventListener('mousedown', startDrag);

  function startDrag(e) {
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    // if element is hidden, skip
    if (rect.width === 0 && rect.height === 0) return;
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      left: rect.left,
      top: rect.top
    };
    el.style.transform = 'none';
    el.style.left = `${rect.left}px`;
    el.style.top = `${rect.top}px`;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  function onDrag(e) {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    el.style.left = `${dragState.left + dx}px`;
    el.style.top = `${dragState.top + dy}px`;
  }

  function stopDrag() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    dragState = null;
  }
}

dragElement(document.getElementById('welcome'), '#welcomeheader');
dragElement(document.getElementById('Vaianaapp-window'));

function addWindowTapHandling(element) {
  if (!element) return;
  element.addEventListener('mousedown', () => handleWindowTap(element));
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  const topBar = document.querySelector('#top');
  if (topBar) topBar.style.zIndex = biggestIndex + 1;
  if (typeof deselectIcon === 'function' && window.selectedIcon) deselectIcon(window.selectedIcon);
}

var topBar = document.querySelector("#top")

