const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

// Atur ukuran canvas sesuai ukuran jendela browser
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Konfigurasi Hujan
const raindrops = [];
const numberOfRaindrops = 150; // Jumlah tetesan hujan di layar

class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Mulai dari atas luar layar
    this.length = Math.random() * 20 + 10; // Panjang tetesan
    this.speed = Math.random() * 10 + 8; // Kecepatan jatuh
    this.opacity = Math.random() * 0.4 + 0.1; // Transparansi
  }

  update() {
    this.y += this.speed;
    // Jika tetesan melewati batas bawah, reset ke atas lagi
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    // Warna tetesan hujan: Blue Cyan Neon dengan transparansi kustom
    ctx.strokeStyle = `rgba(0, 240, 255, ${this.opacity})`;
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

// Inisialisasi Tetesan Hujan
for (let i = 0; i < numberOfRaindrops; i++) {
  raindrops.push(new Raindrop());
}

// Loop Animasi (Render terus menerus)
function animateRain() {
  // Bersihkan canvas pada setiap frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  raindrops.forEach((drop) => {
    drop.update();
    drop.draw();
  });

  requestAnimationFrame(animateRain);
}

// Jalankan animasi hujan
animateRain();
