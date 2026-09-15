/**
 * Health OS music: nine songs Tumai chose on 15 September 2026 as a reference for how Health OS
 * background music should feel. They are other artists' copyrighted recordings, so nothing is
 * copied here: each plays from its official YouTube video through YouTube's own player, one at a
 * time. Using any of them in Health OS content needs a licence; they are a brief, not a library.
 * Titles and artists read from YouTube on 15 September 2026.
 */

export interface MusicTrack {
  /** the YouTube video id */
  youtubeId: string;
  title: string;
  artist: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { youtubeId: 'sQR2-Q-k_9Y', title: 'Savage Love (live on GMA)', artist: 'Jason Derulo' },
  { youtubeId: '2S24-y0Ij3Y', title: 'Kill This Love', artist: 'BLACKPINK' },
  { youtubeId: 'EaMed9sUPVo', title: 'Yummy (lyric video)', artist: 'Justin Bieber' },
  { youtubeId: 'kd4m1HsmyLA', title: 'Attente', artist: 'Beauvois' },
  { youtubeId: 'WfV49_dwMvU', title: 'Borders', artist: 'Monomotion' },
  { youtubeId: '91HApMUvv4w', title: "Your Lovin'", artist: 'Sol Rising' },
  { youtubeId: '7wtfhZwyrcc', title: 'Believer', artist: 'Imagine Dragons' },
  { youtubeId: 'ekr2nIex040', title: 'APT.', artist: 'ROSÉ and Bruno Mars' },
  { youtubeId: 'b73BI9eUkjM', title: 'SOLO', artist: 'JENNIE' },
];

/** The widescreen YouTube thumbnail shown until a song is played, and a smaller one if that is missing. */
export const trackThumbnail = (t: MusicTrack) => `https://i.ytimg.com/vi/${t.youtubeId}/hq720.jpg`;
export const trackThumbnailFallback = (t: MusicTrack) => `https://i.ytimg.com/vi/${t.youtubeId}/mqdefault.jpg`;
export const trackUrl = (t: MusicTrack) => `https://www.youtube.com/watch?v=${t.youtubeId}`;
