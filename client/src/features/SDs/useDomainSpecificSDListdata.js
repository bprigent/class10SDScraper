import { useDispatch, useSelector, useStore } from "react-redux";

export function useDomainSpecificSDListdata(slugPath) {
    const dispatch = useDispatch();
    const store = useStore();
    const fullUrlList = useSelector(state => state.urls.fullUrlList);
    const urlObjectsList = fullUrlList.find(slug => slug.domainSlug === slugPath).pageUrlList;
    const fullSDList = useSelector(state => state.SDs.fullSDList);
    const SDObjectsList = fullSDList.find(slug => slug.domainSlug === slugPath).pageSDList;
    

    
    // unique pages scrapped for SD -- uniquePagesScrapedForSD
    const uniquePagesScrapedForSD = new Set(SDObjectsList.map(item => item.url)).size;
    // percentage of pages scrapped for SD over all URL scrapped -- ratioUniquePagesScrapedForSD
    const ratioUniquePagesScrapedForSD = parseFloat((uniquePagesScrapedForSD / urlObjectsList.length * 100).toFixed(2)) ;



    // number of unique pages with SD -- uniquePagesContainingSD
    const uniquePagesContainingSD = new Set((SDObjectsList.filter(item => item.sdPresent === true)).map(item => item.url)).size;
    // percentage of unique pages with SD -- ratioUniquePagesContainingSD
    const ratioUniquePagesContainingSD = parseFloat((uniquePagesContainingSD / uniquePagesScrapedForSD * 100).toFixed(2));
    // number of unique pages without SD -- uniquePagesNotContainingSD
    const uniquePagesNotContainingSD = SDObjectsList.filter(item => item.sdPresent === false).length;
    // percentage of unique pages without SD -- ratioUniquePagesNotContainingSD
    const ratioUniquePagesNotContainingSD = parseFloat((uniquePagesNotContainingSD / uniquePagesScrapedForSD * 100).toFixed(2));



    // function to get unique SD content from an Array
    function getListOfUniqueSDContent(inputArray) {
        const uniqueContents = new Set();
        const uniqueData = [];
        for (const item of inputArray) {
            const contentStr = JSON.stringify(item.sdContent);
            if (!uniqueContents.has(contentStr)) {
                uniqueContents.add(contentStr);
                uniqueData.push(item);
            }
        }
        return uniqueData;
    };
    // all SD objects found -- allSDObjectsPerDomain
    const allSDObjectsPerDomain = SDObjectsList.filter(item => item.sdPresent === true).length;
    // unique SD objects found -- uniqueSDObjectsPerDomain
    const uniqueSDObjectsPerDomain = getListOfUniqueSDContent(SDObjectsList).length;
    // percentage of unique SD over all SD elements -- ratioUniqueSDObjectsPerDomain
    const ratioUniqueSDObjectsPerDomain = parseFloat((uniqueSDObjectsPerDomain / allSDObjectsPerDomain * 100).toFixed(2));




    //get types
    function countTypes(dataList) {
        return dataList.reduce((acc, item) => {
            const type = item["@type"] || "no type"; // default to "no type" if not found
            acc[type] = (acc[type] || 0) + 1;  // increase the count for the found type or "no type"
            return acc;
        }, {});
    };
    const filteredSDObjects = getListOfUniqueSDContent(SDObjectsList).filter(item => item.sdPresent === true).map(item => item.sdContent);
    const typeCounts = countTypes(filteredSDObjects);
    const typeCountsArray = Object.entries(typeCounts);


    return {
        //base
        dispatch,
        store,
        SDObjectsList, 
        //progress
        uniquePagesScrapedForSD,
        ratioUniquePagesScrapedForSD,

        //SD count
        uniquePagesContainingSD,
        ratioUniquePagesContainingSD,
        uniquePagesNotContainingSD,
        ratioUniquePagesNotContainingSD,

        // unique SD count
        allSDObjectsPerDomain,
        uniqueSDObjectsPerDomain,
        ratioUniqueSDObjectsPerDomain,

        // types
        typeCountsArray
    }

}