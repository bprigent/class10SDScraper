export function createSDListObject (inputUrl, inputDomainList) {
    
    // get domain name with first letter as capital letter
    const computedDomainName = inputUrl.replace(/.+\/\/|www.|\..+/g, '').charAt(0).toUpperCase() + inputUrl.replace(/.+\/\/|www.|\..+/g, '').slice(1);
    // clean url from path
    const computedUrl = (new URL(inputUrl)).hostname;
    const computedId = inputDomainList.length + 1;
    const computedSlug = `${computedDomainName}-${computedId}`;

    const returnedSDListObject = {domainSlug: computedSlug, pageSDList: []};

    return returnedSDListObject;
};