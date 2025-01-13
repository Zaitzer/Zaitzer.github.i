function f(x) {
  return Math.sin(x * 2 * Math.PI) * 50; // Adjusted amplitude for better visibility
}

function updateData(data, time) {
  const x = time / 1000; // Use continuous time for smoother animation
  data.push(f(x));
  if (data.length > canvas.width) {
    data.shift(); // Keep the data length equal to canvas width
  }
}

function plot(ctx, data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(i, canvas.height / 2 - data[i]);
  }
  ctx.strokeStyle = "#000";
  ctx.stroke();
}

const banner = document.getElementById("banner");
const canvas = document.createElement("canvas");
banner.appendChild(canvas);

const ctx = canvas.getContext("2d");
const data = [];

// Function to resize the canvas to fit the banner
function resizeCanvas() {
  canvas.width = banner.clientWidth;
  canvas.height = banner.clientHeight;
}

// Initial resize
resizeCanvas();

// Update canvas size on window resize
window.addEventListener("resize", resizeCanvas);

setInterval(() => {
  updateData(data, Date.now());
  plot(ctx, data);
}, 2);