import { useRef, useState, type ReactNode, type CSSProperties } from 'react';

interface TiltCardProps {
  children: ReactNode;
  index?: number;
}

export default function TiltCard({ children, index = 0 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) scale3d(1.01,1.01,1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)');
  };

  return (
    <div
      ref={ref}
      className="tilt-wrap"
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        '--i': index,
      } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}