var biggestIndex = 100;

function openWindowById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = id === 'Vaianaapp-window' ? 'flex' : 'block';
  el.style.left = '50%';
  el.style.top = '20vh';
  el.style.transform = 'translateX(-50%)';
}

function closeWindowById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';

  if (id === 'Vaianaapp-window' && vaianaApp) {
    vaianaApp.classList.remove('selected');
  }
}

function dragElement(el, handleSelector) {
  if (!el) return;
  const handle = handleSelector ? el.querySelector(handleSelector) : el;
  if (!handle) return;

  let dragState = null;

  handle.addEventListener('mousedown', startDrag);
  }

const welcomeOpenBtn = document.getElementById('welcomeopen');
const welcomeCloseBtn = document.getElementById('welcomeclose');
if (welcomeOpenBtn) welcomeOpenBtn.addEventListener('click', () => openWindowById('welcome'));
if (welcomeCloseBtn) welcomeCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('welcome'); });

if (welcomeCloseBtn) {
  welcomeCloseBtn.addEventListener('mousedown', (e) => e.stopPropagation());
  welcomeCloseBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
}

const vaianaApp = document.getElementById('vaianaAppIcon');
const vaianaWindowClose = document.getElementById('Vaianaapp-windowclose');

if (vaianaApp) {
  vaianaApp.addEventListener('click', () => {
    vaianaApp.classList.add('selected');
    openWindowById('Vaianaapp-window');
  });
}

if (vaianaWindowClose) {
  vaianaWindowClose.addEventListener('mousedown', (e) => e.stopPropagation());
  vaianaWindowClose.addEventListener('pointerdown', (e) => e.stopPropagation());
  vaianaWindowClose.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('Vaianaapp-window'); });
}

document.addEventListener('DOMContentLoaded', () => {
  
  const appWin = document.getElementById('SettingsAppicon');
  if (appWin) appWin.style.display = 'none';
});

const SettingsApp = document.getElementById('SettingsApp');
const SettingsAppwindowClose = document.getElementById('SettingsAppwindowclose');

if (SettingsApp) {
  SettingsApp.addEventListener('click', () => {
    SettingsApp.classList.add('selected');
    openWindowById('SettingsAppwindow');
  });
}

if (SettingsAppwindowclose) {
  SettingsAppwindowclose.addEventListener('mousedown', (e) => e.stopPropagation());
  SettingsAppwindowclose.addEventListener('pointerdown', (e) => e.stopPropagation());
  SettingsAppwindowclose.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('SettingsAppwindow'); });
}

document.addEventListener('DOMContentLoaded', () => {
  
  const appWin = document.getElementById('SettingsAppwindow');
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
dragElement(document.getElementById('Vaianaapp-window'), 'h2');
dragElement(document.getElementById('aboutwindow'));
dragElement(document.getElementById('SettingsAppwindow'));



const navButtons = document.querySelectorAll('.nav-button');
navButtons.forEach((button) => {
  button.addEventListener('mousedown', (e) => e.stopPropagation());
  button.addEventListener('pointerdown', (e) => e.stopPropagation());
  button.addEventListener('click', (e) => e.stopPropagation());
});

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


const aboutwindowOpenBtn = document.getElementById('aboutwindowopen');
const aboutwindowCloseBtn = document.getElementById('aboutwindowclose');
if (aboutwindowOpenBtn) aboutwindowOpenBtn.addEventListener('click', () => openWindowById('aboutwindow'));
if (aboutwindowCloseBtn) aboutwindowCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindowById('aboutwindow'); });

if (aboutwindowCloseBtn) {
  aboutwindowCloseBtn.addEventListener('mousedown', (e) => e.stopPropagation());
  aboutwindowCloseBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
}

const aboutLink = document.querySelector('.nav-button-moana');
if (aboutLink) {
  aboutLink.addEventListener('mousedown', (e) => e.stopPropagation());
  aboutLink.addEventListener('pointerdown', (e) => e.stopPropagation());
}

// Wallpaper selection and persistence
document.addEventListener('DOMContentLoaded', () => {
  const wallpaperThumbs = Array.from(document.querySelectorAll('.wallpaper-thumb'));
  const saved = localStorage.getItem('moanaos.wallpaper');
  const body = document.body;

  if (saved) {
    body.style.backgroundImage = `url('${saved}')`;
    body.style.backgroundSize = 'cover';
    wallpaperThumbs.forEach(btn => {
      if (btn.dataset && btn.dataset.url === saved) btn.classList.add('selected');
      else btn.classList.remove('selected');
    });
  }

  wallpaperThumbs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = btn.dataset && btn.dataset.url;
      if (!url) return;
      body.style.backgroundImage = `url('${url}')`;
      body.style.backgroundSize = 'cover';
      localStorage.setItem('moanaos.wallpaper', url);
      wallpaperThumbs.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
});