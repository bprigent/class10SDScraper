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


    const [helpText, setHelpText] = useState('Please do not forget “https://” and do not add anything after the domain extension.');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateURL(url)) {
            const formatedDomainObject = createDomainObject(url, domains);
            console.log(formatedDomainObject);
            dispatch(addToDomainsList(formatedDomainObject));
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