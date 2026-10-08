import confetti from 'canvas-confetti';

export const safeConfetti = (options?: confetti.Options) => {
  try {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        ...options
      });
    } else if (typeof (confetti as any)?.default === 'function') {
      (confetti as any).default({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        ...options
      });
    }
  } catch (err) {
    // Non-blocking: Silently handle if canvas is unsupported
    console.debug('Confetti skipped:', err);
  }
};
