/**
 * MusicLibrary: reference music people can play, in music cards on a grid of three. For songs
 * Health OS does not own, so nothing is copied: each card plays its song from the official
 * YouTube video through YouTube's own player, which appears in the card's artwork while it plays
 * (YouTube's terms do not allow hiding it). Around it sit Health OS controls: previous, play or
 * pause, next, a seek bar with elapsed and total time, and a link to the song on YouTube.
 *
 *   <MusicLibrary tracks={MUSIC_TRACKS} />
 *
 * One song plays at a time: playing another card stops the first, and a song that ends moves on
 * to the next. Until a card is played it shows the video's thumbnail, and YouTube's player code
 * loads only once the library is on screen. A song whose owner blocks playback on other sites
 * says so and links to YouTube instead. Health OS's own audio uses AudioPlayer, and its own video
 * uses VideoPlayer; this is only for other people's music.
 */
import * as React from 'react';
import { useInView } from 'framer-motion';
import { ArrowUpRight, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';
import { Badge } from '@/components/ui/badge';
import { MediaProgress, formatTime } from '@/components/ui/media-progress';
import { trackThumbnail, trackThumbnailFallback, trackUrl, type MusicTrack } from '@/data/music';
import { cn } from '@/lib/utils';

/* ── the YouTube IFrame Player API, loaded once ─────────────────────────── */
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, string | number>;
      events?: { onReady?: (e: { target: YTPlayer }) => void; onStateChange?: (e: { data: number }) => void; onError?: (e: { data: number }) => void };
    }
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
const loadYouTube = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT as YTNamespace);
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return apiPromise;
};

/* YouTube player states */
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'blocked';

export const MusicLibrary = ({ tracks, className }: { tracks: MusicTrack[]; className?: string }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: '400px 0px' });
  const hosts = React.useRef<(HTMLDivElement | null)[]>([]);
  const player = React.useRef<YTPlayer | null>(null);
  const [active, setActiveState] = React.useState<number | null>(null);
  const activeRef = React.useRef<number | null>(null);
  const setActive = (i: number | null) => {
    activeRef.current = i;
    setActiveState(i);
  };
  const [status, setStatus] = React.useState<Status>('idle');
  const [blocked, setBlocked] = React.useState<Set<number>>(new Set());
  const [time, setTime] = React.useState({ current: 0, duration: 0 });

  /* fetch YouTube's player code once the library is close to the screen, so a click plays at once */
  React.useEffect(() => {
    if (inView) void loadYouTube();
  }, [inView]);

  /* while a song is active, read its position a few times a second */
  React.useEffect(() => {
    if (active === null) return;
    const id = window.setInterval(() => {
      const p = player.current;
      if (p?.getDuration) setTime({ current: p.getCurrentTime() || 0, duration: p.getDuration() || 0 });
    }, 250);
    return () => window.clearInterval(id);
  }, [active]);

  React.useEffect(() => () => player.current?.destroy(), []);

  const start = async (index: number) => {
    const YT = await loadYouTube();
    player.current?.destroy();
    player.current = null;
    if (activeRef.current !== null) hosts.current[activeRef.current]?.replaceChildren();
    const host = hosts.current[index];
    if (!host) return;
    const mount = document.createElement('div');
    host.replaceChildren(mount);
    setActive(index);
    setStatus('loading');
    setTime({ current: 0, duration: 0 });
    player.current = new YT.Player(mount, {
      videoId: tracks[index].youtubeId,
      width: '100%',
      height: '100%',
      playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1, iv_load_policy: 3, origin: window.location.origin },
      events: {
        onReady: (e) => e.target.playVideo(),
        onStateChange: (e) => {
          if (e.data === PLAYING) setStatus('playing');
          else if (e.data === PAUSED) setStatus('paused');
          else if (e.data === BUFFERING) setStatus('loading');
          else if (e.data === ENDED) void start((index + 1) % tracks.length);
        },
        onError: () => {
          setBlocked((b) => new Set(b).add(index));
          setStatus('blocked');
          player.current?.destroy();
          player.current = null;
          hosts.current[index]?.replaceChildren();
        },
      },
    });
  };

  const toggle = (index: number) => {
    if (index === active && player.current && status !== 'blocked') {
      if (status === 'playing' || status === 'loading') player.current.pauseVideo();
      else player.current.playVideo();
      return;
    }
    void start(index);
  };

  const step = (index: number, by: number) => void start((index + by + tracks.length) % tracks.length);

  return (
    <div ref={rootRef} className={cn('grid gap-6 md:grid-cols-3', className)}>
      {tracks.map((track, i) => {
        const isActive = i === active;
        const isPlaying = isActive && (status === 'playing' || status === 'loading');
        const isBlocked = blocked.has(i);
        const label = `${track.title} by ${track.artist}`;
        return (
          <article
            key={track.youtubeId}
            aria-label={label}
            className={cn('flex min-w-0 flex-col overflow-hidden rounded-lg border bg-surface transition-colors duration-md', isActive ? 'border-apricot-200 ring-1 ring-apricot-200' : 'border-line')}
          >
            {/* artwork: the thumbnail, then YouTube's own player while this card is active */}
            <div className="relative h-52 bg-ink-100">
              <img
                src={trackThumbnail(track)}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const fallback = trackThumbnailFallback(track);
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                ref={(el) => {
                  hosts.current[i] = el;
                }}
                className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-sans text-label tabular-nums text-ink-500">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="truncate font-display text-title text-ink-900">{track.title}</h3>
                  <p className="truncate font-sans text-label text-ink-600">{track.artist}</p>
                </div>
                {isActive && status !== 'blocked' && (
                  <Badge variant="outline" size="sm" className="shrink-0">
                    {status === 'paused' ? 'Paused' : 'Playing'}
                  </Badge>
                )}
              </div>

              {isBlocked ? (
                <p role="status" className="font-sans text-label text-ink-600">
                  The owner of this video does not allow it to play on other sites. Listen on YouTube instead.
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-10 shrink-0 font-sans text-label tabular-nums text-ink-600">{formatTime(isActive ? time.current : 0)}</span>
                  <MediaProgress
                    current={isActive ? time.current : 0}
                    duration={isActive ? time.duration : 0}
                    disabled={!isActive || time.duration === 0}
                    onSeek={(t) => {
                      player.current?.seekTo(t, true);
                      setTime((v) => ({ ...v, current: t }));
                    }}
                    label={`Seek ${label}`}
                  />
                  <span className="w-10 shrink-0 whitespace-nowrap text-right font-sans text-label tabular-nums text-ink-600">{formatTime(isActive ? time.duration : 0)}</span>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <IconButton variant="text" size="small" aria-label={`Previous song, before ${track.title}`} onClick={() => step(i, -1)}>
                    <SkipBack className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden />
                  </IconButton>
                  <IconButton variant="primary" aria-label={`${isPlaying ? 'Pause' : 'Play'} ${label}`} onClick={() => toggle(i)} disabled={isBlocked} className="rounded-full">
                    {isPlaying ? <Pause className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden /> : <Play className="ml-px h-4 w-4 fill-current" strokeWidth={0} aria-hidden />}
                  </IconButton>
                  <IconButton variant="text" size="small" aria-label={`Next song, after ${track.title}`} onClick={() => step(i, 1)}>
                    <SkipForward className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden />
                  </IconButton>
                </div>
                <a
                  href={trackUrl(track)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1 rounded-md px-2 font-sans text-label text-ink-600 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
                >
                  YouTube
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                  <span className="sr-only">(opens {label} in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
