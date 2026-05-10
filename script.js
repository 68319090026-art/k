const container = document.getElementById('heart-container');
const message = 'I Love You ';
const totalElements = 250; 
const spans = [];

for (let i = 0; i < totalElements; i++) {
    const span = document.createElement('span');
    span.innerText = message;
    container.appendChild(span);
    spans.push(span);
}

function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

let offset = 0;
function draw() {
    offset += 0.015; // ความเร็วการหมุน

    spans.forEach((span, i) => {
        const t = ((i / totalElements) * 2 * Math.PI) + offset;
        const point = getHeartPoint(t);
        
        // ปรับขนาดตามหน้าจอ
        const scale = window.innerWidth < 600 ? 12 : 18;
        
        const x = (window.innerWidth / 2) + point.x * scale;
        const y = (window.innerHeight / 2) - point.y * scale;

        // คำนวณสีรุ้ง
        const hue = (i * 2 + offset * 50) % 360;
        const color = `hsl(${hue}, 100%, 70%)`;

        span.style.setProperty('--color', color);
        span.style.color = color;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        
        // หมุนตัวหนังสือให้หันตามแนวเส้น
        const angle = Math.atan2(-point.y, point.x);
        span.style.transform = `translate(-50%, -50%) rotate(${angle + Math.PI/2}rad)`;
    });

    requestAnimationFrame(draw);
}
draw();
