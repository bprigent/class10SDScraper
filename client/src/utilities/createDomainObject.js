
export function createDomainObject (inputUrl, inputDomainList) {
    // get domain name with first letter as capital letter
    const computedDomainName = inputUrl.replace(/.+\/\/|www.|\..+/g, '').charAt(0).toUpperCase() + inputUrl.replace(/.+\/\/|www.|\..+/g, '').slice(1);
    // get first letter of domain name in capital letter
    const computedLetter = computedDomainName.charAt(0);
    // clean url from path
    const computedUrl = (new URL(inputUrl)).hostname;
    const computedId = inputDomainList.length + 1;
    const computedSlug = `${computedDomainName}-${computedId}`;
    // return formated object 
    return {id:computedId, name:computedDomainName, letter:computedLetter, url:`https://${computedUrl}`, slug:computedSlug}
}