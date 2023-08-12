export function formatUrlArrayIntoUrlObjectArray (inputArray) {

    if (!Array.isArray(inputArray)) {
        console.error('formatUrlArrayIntoUrlObjectArray received invalid input:', inputArray);
        return [];
    }
    
    const objectArray = inputArray.map(url => ({
        pageUrl: url,
        metaScrapingStatus:'undone',
        urlScrapingStatus:'undone',
        title: '',
        description: ''
    }));
    
    return objectArray;
}