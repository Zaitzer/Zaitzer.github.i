const header = document.getElementById("header");

const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 30;
header.appendChild(canvas);
const ctx = canvas.getContext("2d");
const wave = [];
for (let i = 0; i < canvas.width; i++) {
    wave.push(Math.sin(i / 10) * 10);
}
ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, canvas.height / 2 - wave[i]);
}
ctx.strokeStyle = "#000";
ctx.stroke();
