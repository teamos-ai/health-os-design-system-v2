/**
 * VideoSection: the system overview video in the one video player the design system uses,
 * with its usage guidance underneath.
 */
import { VideoPlayer } from '@/components/ui/video-player';
import { Usage } from '@/showcase/Section';

export const VideoSection = () => (
  <section id="video" aria-labelledby="video-title" className="scroll-mt-8 border-b border-line px-6 py-16 md:py-24">
    <div className="mx-auto max-w-5xl">
      <h2 id="video-title" className="sr-only">
        System overview video
      </h2>
      {/* overview.mp4 has a pastel frame recorded into it (25px at the sides, 57px top and bottom
          at 1920x1080) and a stray dot in its first frame; the crop trims both off on screen. */}
      <VideoPlayer src="/media/overview.mp4" poster="/media/overview-poster.jpg" crop={{ top: 6, right: 2.6, bottom: 6, left: 2.6 }} />
      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border border-line">
        <Usage id="video-player" className="border-t-0" />
      </div>
    </div>
  </section>
);
