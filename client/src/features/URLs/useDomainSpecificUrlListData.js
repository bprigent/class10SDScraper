import { useDispatch, useSelector, useStore } from "react-redux";

export function useDomainSpecificUrlListData(slugPath) {
    const dispatch = useDispatch();
    const store = useStore();

    const fullUrlList = useSelector(state => state.urls.fullUrlList);
    const urlObjectsList = fullUrlList.find(slug => slug.domainSlug === slugPath).pageUrlList;
    const urlsList = urlObjectsList.map(obj => obj.pageUrl);

    const currentNumOfUrlsScraped = urlObjectsList.length;
    const maxNumOfUrlsScraped = useSelector(state => state.domains.domainsList.find(item => item.slug === slugPath).maxUrlList);
    const { scrapedUrlsData, scrapedUrlsStatus } = useSelector(state => state.scrapedUrls);

    return {
        dispatch,
        store,
        urlObjectsList,
        urlsList,
        currentNumOfUrlsScraped,
        maxNumOfUrlsScraped,
        scrapedUrlsData,
        scrapedUrlsStatus
    };
}