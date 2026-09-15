/**
 * MusicSection: Health OS music. Nine reference songs for how Health OS background music should
 * feel, in music cards on a grid of three, each playing from its official YouTube video.
 */
import { Section, Example } from '@/showcase/Section';
import { MusicLibrary } from '@/components/media/MusicLibrary';
import { MUSIC_TRACKS } from '@/data/music';

export const MusicSection = () => (
  <Section id="music">
    <Example id="music-library" label="Nine reference songs">
      <div className="flex flex-col gap-6">
        <p className="max-w-reading font-sans text-body text-ink-600">
          A brief for the sound, not a library to publish: these are other artists' recordings. Using any of them in Health OS content needs a licence.
        </p>
        <MusicLibrary tracks={MUSIC_TRACKS} />
      </div>
    </Example>
  </Section>
);
