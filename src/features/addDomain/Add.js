import React, {useState} from "react";
import "./Add.css";
import { useDispatch, useSelector } from "react-redux";
import { addToDomainsList } from "../showDomains/domainsSlice";
import { InputSearch, InputSubmitButton } from "../../components/formComponents/Inputs";
import { validateURL } from "../../utilities/validateURL";
import { createDomainObject } from "../../utilities/createDomainObject";


function Add() {
    //save form data
    const [url, setUrl] = useState('');

    // install dispatch
    const dispatch = useDispatch();
    
    // get data from store, we use this to get the right ID number based on length of array during formatting of domain Object
    const domains = useSelector(state => state.domains.domainsList);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateURL(url)) {
            const formatedDomainObject = createDomainObject(url, domains);
            console.log(formatedDomainObject);
            dispatch(addToDomainsList(formatedDomainObject));
            setUrl('');
        } else {
            setUrl('not a url');
        }
    }


    return (
        <div className='add_w'>
            <form onSubmit={handleSubmit}>
                <InputSearch onChange={e => setUrl(e.target.value)} value={url} placeholder="Enter URL" type="text" />
                <InputSubmitButton value="Add domain"/>
            </form>
        </div>
    );
}

export default Add;