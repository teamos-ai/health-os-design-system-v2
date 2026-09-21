/**
 * Audio files the design system holds, as opposed to songs it only points at.
 *
 * Two different things live in the Music section and they must not be confused:
 *
 *   `src/data/music.ts`   other artists' songs, referenced, played from their official YouTube
 *                         video in YouTube's own player. Nothing is copied.
 *   this file             audio that sits in `public/media/audio/` and plays in `AudioPlayer`.
 *
 * **`licence` decides whether a track may be published, and it is not a formality.** A track that
 * is not cleared may sit here and play on a machine, so the shelf can be designed and a file can be
 * found again later, but its file is kept out of the repo: this repo deploys to a public address on
 * every push, so committing an uncleared recording publishes it. `public/media/audio/*.mp3` is
 * ignored by git for that reason, and the ignore is what makes the difference between a working
 * local shelf and distributing somebody else's master.
 *
 * To publish one: hold the licence, drop the file in, and remove its line from `.gitignore`.
 */

export interface AudioTrack {
  id: string;
  /** where the file sits under public/ */
  src: string;
  title: string;
  /** a short line under the title: what it is and where it came from */
  meta: string;
  /**
   * `cleared` means Health OS owns it or holds a licence covering the use, and it may ship.
   * `not cleared` means it may be used on a machine and never published.
   */
  licence: 'cleared' | 'not cleared';
  /** the filename it arrived as, so the right file can be recognised when it is dropped in */
  from: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'yummy-instrumental',
    src: '/media/audio/yummy-instrumental.mp3',
    title: 'Yummy, instrumental',
    meta: 'Justin Bieber · reference backing track',
    licence: 'not cleared',
    from: 'Justin Bieber - Yummy (Official Instrumental).mp3',
  },
  {
    id: 'im-the-one-instrumental',
    src: '/media/audio/im-the-one-instrumental.mp3',
    title: "I'm the One, instrumental",
    meta: 'DJ Khaled with Justin Bieber · reference backing track',
    licence: 'not cleared',
    from: "DJ Khaled - I'm the One ft. Justin Bieber [Instrumental].mp3",
  },
];

export const clearedTracks = () => AUDIO_TRACKS.filter((t) => t.licence === 'cleared');
