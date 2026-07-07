/**
 * VideoSection — a plain, generously-padded band holding just the video, between the
 * hero and Overview. The player is empty until a file is dropped in /public/media, and
 * docks to a bottom-right mini-player (PiP) while playing as you scroll past.
 */
import { VideoPlayer } from '@/components/ui/video-player';

export const VideoSection = () => (
  <section
    id="video"
    aria-labelledby="video-heading"
    className="scroll-mt-8 border-b border-line px-6 py-24 md:py-32"
  >
    <div className="mx-auto max-w-5xl">
      <h2 id="video-heading" className="sr-only">
        System overview video
      </h2>
      <VideoPlayer src="/media/overview.mp4" />
    </div>
  </section>
);
