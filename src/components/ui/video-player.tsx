/**
 * VideoPlayer — a flat hairline video frame with an empty-state placeholder (drop a
 * file in and it appears) and scroll-to-PiP: while it's playing and you scroll past it,
 * the video docks to a bottom-right mini-player (picture-in-picture), then returns
 * inline when you scroll back. The inline frame reserves its space, so nothing jumps.
 * 8px squircle, zero glass.
 */
import * as React from 'react';
import { Play, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoPlayerProps {
  /** path to the video, e.g. "/media/overview.mp4" (drop the file in /public/media) */
  src?: string;
  poster?: string;
  hint?: string;
  className?: string;
}

export const VideoPlayer = ({
  src,
  poster,
  hint = 'Your video goes here — drop overview.mp4 in /public/media',
  className,
}: VideoPlayerProps) => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  // dock to PiP only while playing AND the inline frame is mostly scrolled away
  const floating = playing && !visible;

  React.useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.5), {
      threshold: [0, 0.5, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={anchorRef}
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-md border border-line bg-paper',
        className
      )}
    >
      {/* placeholder shown in the inline frame while the video is docked away */}
      {floating && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-paper font-mono text-caption text-ink-500">
          <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          Playing in mini-player
        </div>
      )}

      <div
        className={cn(
          floating
            ? 'fixed bottom-6 right-6 z-50 aspect-video w-[min(360px,82vw)] overflow-hidden rounded-md border border-line bg-carbon shadow-xl'
            : 'absolute inset-0'
        )}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onCanPlay={() => setReady(true)}
          className="h-full w-full bg-carbon object-contain"
        />

        {/* empty-state placeholder (until a video can play) */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-brand-gradient-soft text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-md bg-surface/85 text-brand-600 shadow-sm">
              <Play className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="max-w-xs px-6 font-mono text-caption text-ink-600">{hint}</p>
          </div>
        )}

        {/* close the mini-player (pauses, returns inline) */}
        {floating && (
          <button
            type="button"
            aria-label="Close mini player"
            onClick={() => videoRef.current?.pause()}
            className="absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-carbon/80 text-white transition-colors hover:bg-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
};
