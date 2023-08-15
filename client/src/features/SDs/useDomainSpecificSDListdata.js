import { useDispatch, useSelector, useStore } from "react-redux";

export function useDomainSpecificSDListdata(slugPath) {
    const dispatch = useDispatch();
    const store = useStore();

    const fullSDList = useSelector(state => state.SDs.fullSDList);
    const SDObjectsList = fullSDList.find(slug => slug.domainSlug === slugPath).pageSDList;

    const { scrapedSDsData, scrapedSDsStatus, scrapedSDsError } = useSelector(state => state.scrapedSDs);
    

    return {
        dispatch,
        store,
        SDObjectsList,
        scrapedSDsData,
        scrapedSDsStatus,
        scrapedSDsError
    };
}