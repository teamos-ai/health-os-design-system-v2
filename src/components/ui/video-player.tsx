/**
 * VideoPlayer: the one video player in the Health OS design system. No other video UI
 * style is used anywhere: not native browser controls, not an embedded third-party player.
 *
 * The video sits with clean rounded edges and nothing around it: no border, frame, shadow
 * or gradient. A translucent carbon control bar rises from the bottom on hover, on keyboard
 * focus and whenever the video is paused: time and seek bar, play and pause, mute and
 * volume, and playback speed. Clicking the video plays or pauses it.
 *
 *   <VideoPlayer src="/media/overview.mp4" captionsSrc="/media/overview.vtt" />
 *
 * Real content should pass `captionsSrc` (WebVTT) so the video has captions. If a file has
 * margins or a frame baked into its pixels, pass `crop` to trim them off on screen instead
 * of showing them; the player keeps the trimmed picture's own proportions.
 */
import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const SPEEDS = [0.5, 1, 1.5, 2] as const;

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/** A thin click-to-set track. Arrow keys move it in 5% steps. */
const CustomSlider = ({
  value,
  onChange,
  label,
  valueText,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  valueText?: string;
  className?: string;
}) => (
  <motion.div
    role="slider"
    tabIndex={0}
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(value)}
    aria-valuetext={valueText}
    className={cn(
      'relative h-1 w-full cursor-pointer rounded-full bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon',
      className
    )}
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      onChange(Math.min(Math.max(percentage, 0), 100));
    }}
    onKeyDown={(e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onChange(Math.min(value + 5, 100));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onChange(Math.max(value - 5, 0));
      }
    }}
  >
    <motion.div
      className="absolute left-0 top-0 h-full rounded-full bg-white"
      style={{ width: `${value}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  </motion.div>
);

/** A square control on the carbon bar: white icon, darker carbon on hover. */
const ControlButton = ({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-md font-sans text-label text-white transition-colors duration-sm hover:bg-carbon/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
        active && 'bg-carbon/80'
      )}
    >
      {children}
    </button>
  </motion.div>
);

/** Edges to trim from the video frame, each as a percentage of the frame's width or height. */
export interface VideoCrop {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface VideoPlayerProps {
  /** path to the video, e.g. "/media/overview.mp4" */
  src: string;
  /** trim edges baked into the file, e.g. a recorded frame: { top: 5.5, right: 2, bottom: 5.5, left: 2 } */
  crop?: VideoCrop;
  poster?: string;
  /** WebVTT captions, e.g. "/media/overview.vtt" */
  captionsSrc?: string;
  captionsLang?: string;
  captionsLabel?: string;
  className?: string;
}

export const VideoPlayer = ({
  src,
  crop,
  poster,
  captionsSrc,
  captionsLang = 'en',
  captionsLabel = 'English',
  className,
}: VideoPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [progress, setProgress] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [frame, setFrame] = React.useState({ width: 16, height: 9 });

  // With a crop, the video overflows a box sized to the trimmed picture and is shifted so
  // only the kept area shows. Its box keeps the file's aspect ratio, so nothing stretches.
  const cropped = crop
    ? (() => {
        const keepW = 1 - (crop.left + crop.right) / 100;
        const keepH = 1 - (crop.top + crop.bottom) / 100;
        return {
          box: { aspectRatio: `${frame.width * keepW} / ${frame.height * keepH}` },
          video: {
            position: 'absolute' as const,
            maxWidth: 'none',
            width: `${100 / keepW}%`,
            height: `${100 / keepH}%`,
            left: `${-crop.left / keepW}%`,
            top: `${-crop.top / keepH}%`,
          },
        };
      })()
    : null;

  const showControls = hovered || focused || !isPlaying;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = value / 100;
    video.volume = newVolume;
    video.muted = newVolume === 0;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgress(isFinite(pct) ? pct : 0);
    setCurrentTime(video.currentTime);
    if (isFinite(video.duration)) setDuration(video.duration);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const time = (value / 100) * video.duration;
    if (isFinite(time)) {
      video.currentTime = time;
      setProgress(value);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      setVolume(0);
    } else {
      video.volume = 1;
      setVolume(1);
    }
  };

  const setSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <motion.div
      className={cn('relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-carbon/60', className)}
      style={cropped?.box}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // keyboard focus keeps the controls up; a mouse click does not, so they still hide on leave
      onFocus={(e) => setFocused((e.target as HTMLElement).matches(':focus-visible'))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="block w-full"
        style={cropped?.video}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          setDuration(video.duration);
          if (video.videoWidth && video.videoHeight) setFrame({ width: video.videoWidth, height: video.videoHeight });
        }}
      >
        {captionsSrc && <track kind="captions" src={captionsSrc} srcLang={captionsLang} label={captionsLabel} default />}
      </video>

      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute inset-x-0 bottom-0 m-2 mx-auto max-w-xl rounded-lg bg-carbon/60 p-4 backdrop-blur-md"
            initial={reduced ? { opacity: 0 } : { y: 20, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={reduced ? { opacity: 0 } : { y: 20, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'circInOut', type: 'spring' }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-sans text-label tabular-nums text-white">{formatTime(currentTime)}</span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                label="Seek"
                valueText={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                className="flex-1"
              />
              <span className="font-sans text-label tabular-nums text-white">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ControlButton label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </ControlButton>
                <div className="flex items-center gap-x-1">
                  <ControlButton label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : volume > 0.5 ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <Volume1 className="h-5 w-5" />
                    )}
                  </ControlButton>
                  <div className="w-24">
                    <CustomSlider value={volume * 100} onChange={handleVolumeChange} label="Volume" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {SPEEDS.map((speed) => (
                  <ControlButton
                    key={speed}
                    label={`Playback speed ${speed}x`}
                    active={playbackSpeed === speed}
                    onClick={() => setSpeed(speed)}
                  >
                    {speed}x
                  </ControlButton>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
