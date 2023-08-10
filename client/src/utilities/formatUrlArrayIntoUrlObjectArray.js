export function formatUrlArrayIntoUrlObjectArray (inputArray) {

    if (!Array.isArray(inputArray)) {
        console.error('formatUrlArrayIntoUrlObjectArray received invalid input:', inputArray);
        return [];
    }
    
    const objectArray = inputArray.map(url => ({
        pageUrl: url,
        metaScraped: false,
        urlScraped: false,
        title: '',
        description: ''
    }));
    
    return objectArray;
}