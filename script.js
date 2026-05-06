const heartContainer = document.getElementById('heart-container');
const text = 'I Love You ';
const totalTextCount = 300; // จำนวนตัวหนังสือเยอะขึ้นเพื่อความแน่น
const spans = [];

for (let i = 0; i < totalTextCount; i++) {
    const span = document.createElement('span');
    span.innerText = text;
    heartContainer.appendChild(span);
    spans.push(span);
}

function getHeartPosition(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

let offset = 0;
function animate() {
    offset += 0.015; // ความเร็วการหมุน

    spans.forEach((span, i) => {
        const t = ((i / totalTextCount) * 2 * Math.PI) + offset;
        const pos = getHeartPosition(t);
        
        // ลูกเล่นหัวใจเต้น (Pulse)
        const pulse = 18 + Math.sin(offset * 3) * 1.5; 
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const finalX = centerX + pos.x * pulse;
        const finalY = centerY - pos.y * pulse;

        // ลูกเล่นเปลี่ยนสีรุ้ง (HSL Color)
        const hue = (i * 1.5 + offset * 100) % 360;
        span.style.setProperty('--color', `hsl(${hue}, 100%, 70%)`);

        span.style.left = `${finalX}px`;
        span.style.top = `${finalY}px`;
        
        // การหมุนตัวหนังสือให้หันหน้าเข้าหาจุดศูนย์กลาง
        span.style.transform = `translate(-50%, -50%) rotate(${t + Math.PI/2}rad)`;
    });

    requestAnimationFrame(animate);
}

// ปรับขนาดตามหน้าจออัตโนมัติ
window.addEventListener('resize', () => {
    // อัปเดตตำแหน่งเมื่อมีการขยายหน้าต่าง
});

animate();