const welcome = document.getElementById("welcome");
const handle = document.getElementById("welcomeheader");

let dragState = null;

if (handle) {
  handle.addEventListener("mousedown", startDrag);
}

function startDrag(e) {
  if (!welcome) return;

  const rect = welcome.getBoundingClientRect();

  dragState = {
    startX: e.clientX,
    startY: e.clientY,
    left: rect.left,
    top: rect.top
  };

  welcome.style.transform = "none";
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  e.preventDefault();
}

function onDrag(e) {
  if (!dragState) return;

  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;

  welcome.style.left = `${dragState.left + dx}px`;
  welcome.style.top = `${dragState.top + dy}px`;
}

function stopDrag() {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  dragState = null;
}
