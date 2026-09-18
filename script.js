['welcome'].forEach(id => {
  const el = document.getElementById(id);
  if (el) dragElement(el);
});

function dragElement(el) {
  let startX = 0, startY = 0, prevX = 0, prevY = 0;
  if (!el) return;

  el.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    prevX = e.clientX;
    prevY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    startX = prevX - e.clientX;
    startY = prevY - e.clientY;
    prevX = e.clientX;
    prevY = e.clientY;
    el.style.top = (el.offsetTop - startY) + "px";
    el.style.left = (el.offsetLeft - startX) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

if (document.getElementById(elmnt.id + "header")) {
	// if present, the header is where you move the DIV from:
	document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
} else {
	// otherwise, move the DIV from anywhere inside the DIV:
	elmnt.onmousedown = dragMouseDown;
}