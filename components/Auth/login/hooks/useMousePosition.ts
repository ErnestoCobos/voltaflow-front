import { useEffect, useState, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Custom hook to track the mouse position relative to a container element.
 *
 * @param containerRef - The reference to the container element.
 * @returns An object containing the x and y coordinates of the mouse position.
 */
const useMousePosition = (containerRef: RefObject<HTMLElement>): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (event.clientX - left) / width,
          y: (event.clientY - top) / height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  return mousePosition;
};

export default useMousePosition;