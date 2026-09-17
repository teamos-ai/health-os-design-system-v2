/**
 * DashboardsSection: the Health OS product screens. The main dashboard opens the section as a card
 * that floats, tilts toward the pointer and turns over into the overview video, with the same
 * effect written out underneath for any other site. Every screen follows, tagged by area, layout
 * and the parts it is built from.
 */
import { Copy } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Card3D } from '@/components/ui/card-3d';
import { Disclosure } from '@/components/ui/disclosure';
import { VideoPlayer } from '@/components/ui/video-player';
import { useToast } from '@/components/ui/toast';
import { DashboardLibrary } from '@/components/dashboards/DashboardLibrary';
import { DASHBOARDS, dashboardLarge, dashboardOriginal } from '@/data/dashboards';

/* The effect on its own, with the Health OS values as the defaults. Paste it into another site and
   change the variables at the top; nothing else in it is Health OS specific. */
const PORTABLE = `<!-- 1. Markup. The stage owns the perspective; without it the card skews instead of turning. -->
<div class="card3d-stage">
  <div class="card3d" data-card3d data-tilt="11">
    <div class="card3d-face card3d-front">
      <img src="your-dashboard.jpg" width="1920" height="1080" alt="" />
      <button class="card3d-flip" type="button">Play the overview</button>
    </div>
    <div class="card3d-face card3d-back" hidden>
      <video src="your-video.mp4" controls playsinline></video>
      <button class="card3d-flip-back" type="button">Back to the dashboard</button>
    </div>
  </div>
</div>

<style>
/* 2. The knobs. Change these and the effect moves to another brand. */
:root {
  --card3d-perspective: 1200px;   /* lower is more dramatic, higher is subtler */
  --card3d-tilt: 11deg;           /* past about 12deg a large picture warps */
  --card3d-rest-x: 3deg;          /* the resting angle is what makes it float */
  --card3d-rest-y: -7deg;
  --card3d-follow: 200ms;         /* how fast it chases the pointer */
  --card3d-flip: 700ms;           /* how long it takes to turn over */
  --card3d-lift: 0 40px 80px -30px rgba(31, 31, 31, 0.28);
  --card3d-glow: 0 0 60px -25px rgba(245, 160, 96, 0.5);  /* your brand colour */
}

.card3d-stage { perspective: var(--card3d-perspective); }

.card3d {
  position: relative;
  transform-style: preserve-3d;
  transition: transform var(--card3d-flip) cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotateX(var(--card3d-rest-x)) rotateY(var(--card3d-rest-y));
  will-change: transform;
}
.card3d.is-following { transition-duration: var(--card3d-follow); }
.card3d.is-flipped { transform: rotateX(var(--card3d-rest-x)) rotateY(calc(var(--card3d-rest-y) + 180deg)); }

.card3d-face {
  overflow: hidden;
  border-radius: 12px;
  backface-visibility: hidden;
  box-shadow: var(--card3d-lift), var(--card3d-glow);
}
.card3d-face img,
.card3d-face video { display: block; width: 100%; height: auto; }
.card3d-back { position: absolute; inset: 0; transform: rotateY(180deg); }

/* Sits flat and cross-fades for anyone who has asked for less motion. */
@media (prefers-reduced-motion: reduce) {
  .card3d, .card3d.is-flipped { transition: none; transform: none; }
  .card3d-back { transform: none; }
}
</style>

<script>
/* 3. Behaviour. The tilt follows a mouse only, and only while the front is showing, so the
   controls on the back stay usable. The back is hidden until it turns, which stops the video. */
document.querySelectorAll('[data-card3d]').forEach((card) => {
  const max = parseFloat(card.dataset.tilt) || 11;
  const back = card.querySelector('.card3d-back');
  const video = back.querySelector('video');
  const rest = () => { card.classList.remove('is-following'); card.style.transform = ''; };

  card.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || card.classList.contains('is-flipped')) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * -max;
    const y = ((e.clientX - r.left) / r.width - 0.5) * max;
    card.classList.add('is-following');
    card.style.transform = \`rotateX(\${x.toFixed(2)}deg) rotateY(\${y.toFixed(2)}deg)\`;
  });
  card.addEventListener('pointerleave', rest);

  card.querySelector('.card3d-flip').addEventListener('click', () => {
    rest();
    back.hidden = false;
    card.classList.add('is-flipped');
    /* revealed by a click, so it may play with sound; a browser that refuses gets it muted */
    video.play().catch(() => { video.muted = true; video.play(); });
  });

  card.querySelector('.card3d-flip-back').addEventListener('click', () => {
    card.classList.remove('is-flipped');
    video.pause();
    setTimeout(() => { back.hidden = true; }, 700);
  });
});
</script>`;

const FEATURED = DASHBOARDS.find((d) => d.featured) ?? DASHBOARDS[0];

const FeaturedCard = () => {
  const { toast } = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PORTABLE);
      toast({ title: 'Copied the floating card' });
    } catch {
      toast({ title: 'Could not copy the code', description: 'Your browser blocked the clipboard. Select the code instead.', tone: 'warning' });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="px-2 py-6 sm:px-8 sm:py-10">
        <Card3D
          front={<img src={dashboardLarge(FEATURED)} alt={FEATURED.summary} width={1920} height={1080} decoding="async" className="block w-full" />}
          back={<VideoPlayer src="/media/overview.mp4" poster="/media/overview-poster.jpg" crop={{ top: 6, right: 2.6, bottom: 6, left: 2.6 }} float={false} playOnReveal />}
          frontAction="Play the overview"
          backAction="Back to the dashboard"
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="max-w-reading font-sans text-body text-ink-600">
          The main dashboard rests at a slight angle so it reads as lifted off the page, tilts toward the pointer, and turns over on a click into the system overview video. The tilt follows a mouse only and stops while the video is showing, so its controls stay usable. With reduced motion on, the card sits flat and the two faces cross-fade.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="small" leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />} onClick={copy}>
            Copy the effect
          </Button>
          <Button variant="secondary" size="small" href={dashboardOriginal(FEATURED)}>
            Download the 4K screen
          </Button>
        </div>
        <Disclosure title="Use this effect on another site">
          <div className="flex flex-col gap-3 px-4 pb-4">
            <p className="max-w-reading font-sans text-body text-ink-600">
              Plain HTML, CSS and JavaScript, no build step, nothing Health OS specific in it. The variables at the top are the whole design: perspective, tilt, the resting angle, how fast it follows and turns, and the lift and glow. In this system those same values live in tokens.json under card3d, and the React version is Card3D.
            </p>
            <pre className="max-h-96 overflow-auto rounded-md border border-line bg-surface-2 p-4 font-sans text-label normal-case text-ink-900">{PORTABLE}</pre>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};

export const DashboardsSection = () => (
  <Section id="dashboards">
    <div className="flex flex-col gap-8">
      <Example id="dashboard-card" label="Main dashboard">
        <FeaturedCard />
      </Example>
      <Example id="dashboard-library" label="Dashboard library">
        <DashboardLibrary />
      </Example>
    </div>
  </Section>
);
