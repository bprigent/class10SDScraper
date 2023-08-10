import React, {useState} from "react";
import "./Add.css";
import { useDispatch, useSelector } from "react-redux";

// domain slice and utilities
import { addToDomainsList } from "../showDomains/domainsSlice";
import { createDomainObject } from "../../utilities/createDomainObject";


import { InputSearch, InputSubmitButton } from "../../components/formComponents/Inputs";
import { validateURL } from "../../utilities/validateURL";


//url slice and utilities
import { addToFullUrlList } from "../URLs/urlsSlice";
import { createUrlListObject } from "../../utilities/createUrlListObject";







function Add() {
    //save form data
    const [url, setUrl] = useState('');
    const [helpText, setHelpText] = useState('Please do not forget “https://” and do not add anything after the domain extension.');

    // install dispatch
    const dispatch = useDispatch();
    
    // get data from store, we use this to get the right ID number based on length of array during formatting of domain Object
    const domains = useSelector(state => state.domains.domainsList);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateURL(url)) {
            // add to domain slice
            const formatedDomainObject = createDomainObject(url, domains);
            dispatch(addToDomainsList(formatedDomainObject));
            // add to url list slice
            const formatedUrlListObject = createUrlListObject(url, domains);
            dispatch(addToFullUrlList(formatedUrlListObject));
            // empty input field
            setUrl('');

        } else {
            setUrl('');
        }
    }

    const handleChange = (e) => {
        setUrl(e.target.value);
        const latestUrlCheck = validateURL(url);

        if (latestUrlCheck && url.includes("http") && url.includes("://")) {
            setHelpText("This is looking good, thank you.");
        };

        if (!latestUrlCheck) {
            setHelpText("This does not look like a URL yet. Please add HTTP or HTTPS");
        };        
    }


    return (
        <div className='add_w'>
            <form className='form_w' onSubmit={handleSubmit}>
                <InputSearch onChange={handleChange} value={url} placeholder="Enter URL" type="text" />
                <p className='form_help_text'>{helpText}</p>
                <InputSubmitButton value="Add domain"/>
            </form>
        </div>
    );
}

export default Add;