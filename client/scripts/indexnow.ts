// tells Bing (and the other IndexNow search engines: Yandex, Naver, Seznam...) that the
// site changed, so they look again now instead of whenever they get around to it.
// Copilot answers from Bing's index, so this is the quickest way to get changes into it.
// Google doesn't use IndexNow; it reads the sitemap.
//
// run it after a deploy is live:
//     npm run indexnow
// it sends every address in the live sitemap (https://gradientv.com/sitemap.xml).
//
// the key is public on purpose. Bing checks that https://gradientv.com/<key>.txt holds
// the same key (client/public), which proves the request comes from whoever runs the site.
// to change it, rename that file and change KEY here to match

const SITE = 'https://gradientv.com';
const KEY = '48b9ad91ce002d490bb57795e6211164';

const sitemap = await fetch(`${SITE}/sitemap.xml`);
if (!sitemap.ok) {
    throw new Error(`indexnow: couldn't read ${SITE}/sitemap.xml (${sitemap.status}). is the deploy live?`);
}

const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
        host: new URL(SITE).host,
        key: KEY,
        keyLocation: `${SITE}/${KEY}.txt`,
        urlList
    })
});

// 200 = received, 202 = received and the key is still being checked (normal the first time)
if (response.status === 200 || response.status === 202) {
    console.log(`indexnow: sent ${urlList.length} pages (${response.status})`);
} else {
    throw new Error(`indexnow: ${response.status} ${await response.text()}`);
}
