/**
 * AudioPlayer: the one audio player, for listening to an article, episode or voice note inside
 * a page. A calm light card: an icon tile, what is playing, then play, skip back and forward
 * 15 seconds, a seek bar with elapsed and total time, playback speed and mute. Never the
 * browser's own audio controls.
 *
 *   <AudioPlayer
 *     src="/media/audio/hustle-hq-s1e3-clip.m4a"
 *     title="Listen to the episode"
 *     meta="Hustle HQ · Season 1, episode 3"
 *   />
 *
 * States: loading shows a spinner in the play button, a file that fails says so with a retry,
 * and the end of the audio turns play into replay. Keyboard: every control is a button; the seek
 * bar takes arrow keys, Home and End. Pass `transcript` for anything published: it sits in a
 * disclosure under the controls, so people who cannot listen still get the words.
 */
import * as React from 'react';
import { Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';
import { IconTile } from '@/components/ui/icon-tile';
import { Disclosure } from '@/components/ui/disclosure';
import { MediaProgress, formatTime } from '@/components/ui/media-progress';
import { cn } from '@/lib/utils';

const SPEEDS = [1, 1.25, 1.5, 2];

export interface AudioPlayerProps {
  src: string;
  /** what the listener is about to hear, e.g. "Listen to the episode" */
  title: string;
  /** a short line under the title: show, episode, source */
  meta?: string;
  /** an icon from the icon library beside the title (default: studio microphone) */
  icon?: string;
  /** the words, for anything published */
  transcript?: React.ReactNode;
  className?: string;
}

const Spinner = () => (
  <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-4 w-4 animate-spin">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AudioPlayer = ({ src, title, meta, icon = 'studio-microphone', transcript, className }: AudioPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [speed, setSpeed] = React.useState(1);
  const [muted, setMuted] = React.useState(false);

  const audio = () => audioRef.current;

  const toggle = () => {
    const a = audio();
    if (!a) return;
    if (a.paused) {
      setWaiting(true);
      void a.play().catch(() => {
        setWaiting(false);
        setFailed(true);
      });
    } else a.pause();
  };

  const seek = (t: number) => {
    const a = audio();
    if (!a) return;
    a.currentTime = t;
    setCurrent(t);
    setEnded(false);
  };

  const skip = (by: number) => seek(Math.min(duration, Math.max(0, current + by)));

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audio()) audio()!.playbackRate = next;
  };

  const retry = () => {
    setFailed(false);
    audio()?.load();
  };

  return (
    <div className={cn('rounded-lg border border-line bg-surface p-4 sm:p-5', className)}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        muted={muted}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
        }}
        onPlaying={() => setWaiting(false)}
        onWaiting={() => playing && setWaiting(true)}
        onPause={() => {
          setPlaying(false);
          setWaiting(false);
        }}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
        }}
        onError={() => {
          setFailed(true);
          setWaiting(false);
        }}
      />

      <div className="flex items-center gap-4">
        <IconTile id={icon} size="sm" />
        <div className="min-w-0">
          <p className="font-display text-title text-ink-900">{title}</p>
          {meta && <p className="truncate font-sans text-label text-ink-500">{meta}</p>}
        </div>
      </div>

      {failed ? (
        <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-error-100 px-4 py-3">
          <p className="font-sans text-body text-ink-900">This audio could not load.</p>
          <button type="button" onClick={retry} className="font-sans text-label text-ink-900 underline decoration-apricot-200 decoration-2 underline-offset-4 hover:decoration-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900">
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap">
          <div className="flex items-center gap-1">
            <IconButton variant="text" size="small" aria-label="Back 15 seconds" onClick={() => skip(-15)} disabled={duration === 0}>
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </IconButton>
            <IconButton variant="primary" aria-label={`${playing ? 'Pause' : ended ? 'Replay' : 'Play'}: ${title}`} onClick={toggle} className="rounded-full">
              {waiting ? <Spinner /> : playing ? <Pause className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden /> : <Play className="ml-px h-4 w-4 fill-current" strokeWidth={0} aria-hidden />}
            </IconButton>
            <IconButton variant="text" size="small" aria-label="Forward 15 seconds" onClick={() => skip(15)} disabled={duration === 0}>
              <RotateCw className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </IconButton>
          </div>
          <div className="order-last flex w-full min-w-0 items-center gap-3 sm:order-none sm:w-auto sm:flex-1">
            <span className="w-10 shrink-0 text-right font-sans text-label tabular-nums text-ink-600">{formatTime(current)}</span>
            <MediaProgress current={current} duration={duration} onSeek={seek} label={`Seek ${title}`} disabled={duration === 0} />
            <span className="w-10 shrink-0 font-sans text-label tabular-nums text-ink-600">{formatTime(duration)}</span>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:ml-0">
            <button
              type="button"
              onClick={cycleSpeed}
              aria-label={`Playback speed ${speed} times. Change speed`}
              className="h-9 rounded-md px-3 font-sans text-label tabular-nums text-ink-600 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
            >
              {speed}x
            </button>
            <IconButton variant="text" size="small" aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
              {muted ? <VolumeX className="h-4 w-4" strokeWidth={1.75} aria-hidden /> : <Volume2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
            </IconButton>
          </div>
        </div>
      )}

      {transcript && (
        <Disclosure title="Read the transcript" className="mt-4">
          {transcript}
        </Disclosure>
      )}
    </div>
  );
};
