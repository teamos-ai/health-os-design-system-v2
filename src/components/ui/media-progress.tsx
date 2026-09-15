/**
 * MediaProgress: the seek bar for audio on light grounds (the audio player and music cards).
 * A soft ink track with an apricot-200 fill, since seeking is interaction; the ink thumb shows on
 * hover, focus and drag. Click or drag to seek; arrow keys move 5 seconds, Home and End jump to
 * the ends. The video player keeps its own white bar for the carbon veil.
 *
 *   <MediaProgress current={32} duration={112} onSeek={(t) => (audio.currentTime = t)} label="Seek" />
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

/** 72 → "1:12", 3725 → "1:02:05". */
export const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
};

export interface MediaProgressProps {
  current: number;
  duration: number;
  onSeek: (seconds: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export const MediaProgress = ({ current, duration, onSeek, label, disabled = false, className }: MediaProgressProps) => {
  const [dragging, setDragging] = React.useState(false);
  const pct = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;

  const seekFrom = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSeek((Math.min(Math.max(e.clientX - rect.left, 0), rect.width) / rect.width) * duration);
  };

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-disabled={disabled || undefined}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(current)}
      aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
      className={cn(
        'group relative h-6 w-full cursor-pointer touch-none select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-surface aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      onPointerDown={(e) => {
        if (disabled || duration <= 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        seekFrom(e);
      }}
      onPointerMove={(e) => dragging && seekFrom(e)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onKeyDown={(e) => {
        if (disabled || duration <= 0) return;
        const step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
        if (step !== undefined) {
          e.preventDefault();
          onSeek(Math.min(duration, Math.max(0, current + step)));
        } else if (e.key === 'Home' || e.key === 'End') {
          e.preventDefault();
          onSeek(e.key === 'Home' ? 0 : duration);
        }
      }}
    >
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-ink-200">
        <span className="absolute inset-y-0 left-0 rounded-full bg-apricot-200" style={{ width: `${pct}%` }} />
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-900 opacity-0 transition-opacity duration-sm group-hover:opacity-100 group-focus-visible:opacity-100',
          dragging && 'opacity-100'
        )}
        style={{ left: `${pct}%` }}
      />
    </div>
  );
};
