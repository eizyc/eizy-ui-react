import { useEffect, useRef } from 'react';

export interface UseTimerProps {
    id: number|string;
    duration?: number;
    remove: (id: number|string) => void;
}

export function useTimer(props: UseTimerProps) {
  const { remove, id, duration = 3000 } = props;

  const timer = useRef<number | null>(null);

  const startTimer = () => {
    timer.current = window.setTimeout(() => {
        remove?.(id);
        removeTimer();
    }, duration);
  };

  const removeTimer = () => {
    if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => removeTimer();
  }, []);

  const onMouseEnter = () => {
    removeTimer();
  };

  const onMouseLeave = () => {
    startTimer();
  };

  return {
    onMouseEnter,
    onMouseLeave,
  };
}