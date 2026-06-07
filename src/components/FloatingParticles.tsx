import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 4 + 1; // 1px to 5px
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -(Math.random() * 0.4 + 0.1); // float upwards
        
        // Soft blue, cyan, silver, white palette
        const colors = [
          'rgba(147, 197, 253, ', // Blue-300
          'rgba(103, 232, 249, ', // Cyan-300
          'rgba(226, 232, 240, ', // Slate-200 (Silver)
          'rgba(255, 255, 255, ', // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.1;
        this.fadeSpeed = (Math.random() * 0.002) + 0.001;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if it goes out of screen
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
          this.speedX = -this.speedX;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.shadowBlur = this.size * 2;
        context.shadowColor = 'rgba(103, 232, 249, 0.4)';
        context.fillStyle = `${this.color}${this.alpha})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0; // Reset
      }
    }

    const particles: Particle[] = Array.from({ length: 40 }, () => new Particle());

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      id="floating-particles-canvas"
    />
  );
}
