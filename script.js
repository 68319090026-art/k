const container = document.getElementById('heart-container');
const message = 'I Love You ';
const totalElements = 300; // จำนวนตัวหนังสือ (300 จะเรียงกันแน่นพอดี)
const spans = [];

// สร้าง Elements ครั้งเดียว
for (let i = 0; i < totalElements; i++) {
    const span = document.createElement('span');
    span.innerText = message;
    container.appendChild(span);
    spans.push(span);
}

function getHeartPoint(t) {
    // สูตรหัวใจมาตรฐานที่สวยที่สุด
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

let angleOffset = 0;

function render() {
    angleOffset += 0.01; // ความเร็วในการหมุนวน

    spans.forEach((span, i) => {
        // กระจายตัวอักษรให้ห่างเท่ากันรอบวง 2PI
        const t = ((i / totalElements) * 2 * Math.PI) + angleOffset;
        const point = getHeartPoint(t);
        
        // ปรับขนาดตามหน้าจอ (ถ้ามือถือจะเล็กลงอัตโนมัติ)
        const isMobile = window.innerWidth < 768;
        const scale = isMobile ? 12 : 20; 

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const x = centerX + point.x * scale;
        const y = centerY - point.y * scale;

        // คำนวณสีรุ้งให้ไหลวนตามตำแหน่ง
        const hue = (i * (360 / totalElements) + angleOffset * 100) % 360;
        const color = `hsl(${hue}, 100%, 75%)`;
        
        span.style.setProperty('--color', color);
        span.style.color = color;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        // ปรับมุมให้ตัวหนังสือเอียงขนานไปกับเส้นรอบรูปหัวใจ
        // ใช้ Math.atan2 เพื่อหาความชันของจุด
        const angle = Math.atan2(-point.y, point.x);
        span.style.transform = `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`;
    });

    requestAnimationFrame(render);
}

render();

// รีเฟรชตำแหน่งเวลาเปลี่ยนขนาดหน้าจอ
window.addEventListener('resize', () => {
    // ตำแหน่งจะถูกคำนวณใหม่ใน render loop อยู่แล้ว
});
