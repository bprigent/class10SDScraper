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

    // function to get unique content
    function getUniqueBySdContent(inputArray) {
        const uniqueContents = new Set();
        const uniqueData = [];
    
        for (const item of inputArray) {
            // Convert sdContent to a string representation for easier comparison
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
    const uniqueSDObjectsPerDomain = getUniqueBySdContent(SDObjectsList).length;
    // percentage of unique SD over all SD elements -- ratioUniqueSDObjectsPerDomain
    const ratioUniqueSDObjectsPerDomain = parseFloat((uniqueSDObjectsPerDomain / allSDObjectsPerDomain * 100).toFixed(2));



    // number of unique organization SD
    const uniqueOrganizationSDPerThisDomain = '';
    // number of unique website SD
    const uniqueWebsiteSDPerThisDomain = '';
    // number of unique logo SD
    const uniqueLogoSDPerThisDomain = '';
    // number of unique software SD
    const uniqueSoftwareSDPerThisDomain = '';
    // number of unique local business SD
    const uniqueLocalBusinessSDPerThisDomain = '';
    // number of unique salary SD
    const uniqueSalarySDPerThisDomain = '';
    // number of unique job posting SD
    const uniqueJobPostingSDPerThisDomain = '';
    // number of unique employer rating SD
    const uniqueEmployerRatingSDPerThisDomain = '';

    // number of unique product SD
    const uniqueProductSDPerThisDomain = '';
    // number of unique books SD
    const uniqueBookSDPerThisDomain = '';
    // number of unique article SD
    const uniqueArticleSDPerThisDomain = '';
    // number of unique events SD
    const uniqueEventSDPerThisDomain = '';
    // number of unique movies SD
    const uniqueMovieSDPerThisDomain = '';
    // number of unique recipes SD
    const uniqueRecipeSDPerThisDomain = '';

    // number of unique reviews SD
    const uniqueReviewSDPerThisDomain = '';
    // number of unique faq SD
    const uniqueFaqSDPerThisDomain = '';
    // number of unique how to SD
    const uniqueHowToSDPerThisDomain = '';
    // number of unique Q and A SD
    const uniqueQandASDPerThisDomain = '';
    // number of unique images SD
    const uniqueImageSDPerThisDomain = '';
    // number of unique video SD
    const uniqueVideoSDPerThisDomain = '';


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
        ratioUniqueSDObjectsPerDomain
    };
}