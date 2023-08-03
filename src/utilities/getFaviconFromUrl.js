export function getFaviconFromUrl (sourceUrl, iconSizeInPixel) {
    return `https://www.google.com/s2/favicons?domain=${sourceUrl}&sz=${iconSizeInPixel}`;
}