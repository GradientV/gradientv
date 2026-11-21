// the Videos page, hidden for now (see src/data/pages.ts).
// to bring it back: put introduction.mp4 and .vtt back in public/videos and set its locales to ['en']
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import { useLocale } from '../context/LocaleContext';
import { videoSchema } from '../data/schema';

export default function VideosView() {
    const { t } = useLocale();
    const { videos } = t;

    return (
        <>
            <Seo pageId="videos" title={videos.seo.title} description={videos.seo.description} schema={videoSchema(t)} />

            <PageHero title={videos.heading} />

            <UnderBand className="pb-24 md:pb-32">
                {/* the video has no narration, its only audio is instrumental music. so introduction.vtt
                    has one cue naming the music instead of a transcript, and there's no "default" on the
                    track: captions stay off until the viewer turns them on */}
                <video controls preload="metadata" className="aspect-video w-full bg-night">
                    <source src="/videos/introduction.mp4" type="video/mp4" />
                    <track kind="captions" srcLang="en" label={videos.captions} src="/videos/introduction.vtt" />
                    {videos.unsupported}
                </video>

                <div className="mt-10 grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <h2 className="display-md">{videos.title}</h2>
                        <p className="mt-4 text-lg text-ink-soft">{videos.text}</p>
                    </div>
                    <div className="md:col-span-6 md:col-start-7">
                        <h3 className="font-display text-lg font-semibold">{videos.summaryHeading}</h3>
                        <div className="mt-3 space-y-4 text-ink-soft">
                            {videos.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                    </div>
                </div>
            </UnderBand>
        </>
    );
}
