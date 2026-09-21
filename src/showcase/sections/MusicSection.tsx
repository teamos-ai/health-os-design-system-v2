/**
 * MusicSection: Health OS music, in two shelves that are not the same thing.
 *
 * **Songs** are other artists' recordings. They are referenced, never copied, and play from their
 * official YouTube video in YouTube's own player. A brief for how Health OS should sound.
 *
 * **Audio files** are the ones the system actually holds, in `AudioPlayer`. Each carries a licence
 * state, and a track that is not cleared plays on a machine but keeps its file out of the repo,
 * because this repo deploys to a public address on every push.
 */
import { AlertTriangle } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { AudioPlayer } from '@/components/ui/audio-player';
import { MusicLibrary } from '@/components/media/MusicLibrary';
import { Badge } from '@/components/ui/badge';
import { AUDIO_TRACKS } from '@/data/audio-tracks';
import { MUSIC_TRACKS } from '@/data/music';

const AudioShelf = () => (
  <div className="flex flex-col gap-6">
    <div className="flex gap-4 rounded-lg border border-warning-300 bg-warning-100 p-5">
      <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-warning-600" strokeWidth={1.75} aria-hidden />
      <div className="flex flex-col gap-2">
        <p className="font-display text-title text-ink-900">Neither of these is cleared to publish</p>
        <p className="max-w-reading font-sans text-body text-ink-600">
          Both are commercial instrumentals, so their files are kept out of the repo and this shelf plays them from a machine only. Every push here
          deploys to a public address, and committing a recording somebody else owns publishes it. A track ships once Health OS holds a licence: drop
          the file in, set its licence to cleared, and take its line out of .gitignore.
        </p>
      </div>
    </div>

    <ul className="flex flex-col gap-5">
      {AUDIO_TRACKS.map((t) => (
        <li key={t.id} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-label uppercase text-ink-500">{t.from}</span>
            {t.licence === 'not cleared' && (
              <Badge variant="warning" size="sm">
                Not cleared
              </Badge>
            )}
          </div>
          <AudioPlayer src={t.src} title={t.title} meta={t.meta} />
        </li>
      ))}
    </ul>
  </div>
);

export const MusicSection = () => (
  <Section id="music">
    <div className="flex flex-col gap-8">
      <Example id="audio-shelf" label="Audio files the system holds">
        <AudioShelf />
      </Example>

      <Example id="music-library" label="Ten reference songs">
        <div className="flex flex-col gap-6">
          <p className="max-w-reading font-sans text-body text-ink-600">
            A brief for the sound, not a library to publish: these are other artists' recordings, played from their own official videos. Using any of
            them in Health OS content needs a licence.
          </p>
          <MusicLibrary tracks={MUSIC_TRACKS} />
        </div>
      </Example>
    </div>
  </Section>
);
