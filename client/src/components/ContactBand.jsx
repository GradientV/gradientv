// the contact section the home page ends with: the pitch on the left, and
// phone / email / LinkedIn as three big rows on the right.
// the Contact page has its own layout (ContactView.jsx) and shares only the rows
import { useLocale } from '../context/LocaleContext.jsx';
import ContactRows from './ContactRows.jsx';
import NightBand from './NightBand.jsx';
import Eyebrow from './ui/Eyebrow.jsx';

export default function ContactBand() {
    const { t } = useLocale();

    return (
        <NightBand id="contact">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                    <Eyebrow onNight>{t.contact.label}</Eyebrow>
                    <h2 className="display-lg mt-5 max-w-[19ch]">{t.contact.heading}</h2>
                    <p className="mt-5 max-w-[36rem] text-chalk/75">{t.contact.text}</p>
                </div>

                <ContactRows onNight className="self-end lg:col-span-5" />
            </div>
        </NightBand>
    );
}
