import { useRef, useState } from 'react';

const REVEAL_WIDTH = 132;

const useSwipeReveal = () => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    startOffsetRef.current = offset;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startXRef.current;
    const nextOffset = Math.min(0, Math.max(-REVEAL_WIDTH, startOffsetRef.current + deltaX));
    setOffset(nextOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setOffset((current) => (current < -REVEAL_WIDTH / 2 ? -REVEAL_WIDTH : 0));
  };

  const close = () => setOffset(0);

  return {
    offset,
    isDragging,
    close,
    revealWidth: REVEAL_WIDTH,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};

export default useSwipeReveal;
