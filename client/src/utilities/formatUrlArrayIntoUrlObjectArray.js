export function formatUrlArrayIntoUrlObjectArray (inputArray) {
    
    const objectArray = inputArray.map(url => ({
        pageUrl: url,
        metaScraped: false,
        urlScraped: false,
        title: '',
        description: ''
    }));
    
    return objectArray;
}