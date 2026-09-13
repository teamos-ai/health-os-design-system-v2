/**
 * VideoSection: the system overview video in a padded band. The player docks to a
 * corner while it plays and the section scrolls away.
 */
import { VideoPlayer } from '@/components/ui/video-player';

export const VideoSection = () => (
  <section id="video" aria-labelledby="video-title" className="scroll-mt-8 border-b border-line px-6 py-16 md:py-24">
    <div className="mx-auto max-w-5xl">
      <h2 id="video-title" className="sr-only">
        System overview video
      </h2>
      <VideoPlayer src="/media/overview.mp4" />
    </div>
  </section>
);
