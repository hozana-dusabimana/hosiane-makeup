import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  /** className applied to the animated text (e.g. shimmer-text). */
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

/**
 * Rotating typewriter effect: types a word, holds, deletes, then moves to the
 * next word — looping forever. A blinking gold caret trails the text.
 */
export default function Typewriter({
  words,
  className = '',
  typingSpeed = 95,
  deletingSpeed = 45,
  pauseMs = 1700,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pauseMs);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="inline-flex items-baseline">
      <span className={className}>{text || ' '}</span>
      <span className="type-caret" />
    </span>
  );
}
