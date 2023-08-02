import React, {useState} from "react";
import "./Add.css";
import { useDispatch } from "react-redux";
import { addToDomainsList } from "../features/domains/domainsSlice";


function Add() {
    //save form data
    const [url, setUrl] = useState('');

    // install dispatch
    const dispatch = useDispatch()


    // validate URL
    function validURL(inputUrl) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(inputUrl);
      }


    // get letter and name from URL
    const createFormatedDomainObject = (inputUrl) => {
        // get domain name with first letter as capital letter
        const computedDomainName = inputUrl.replace(/.+\/\/|www.|\..+/g, '').charAt(0).toUpperCase() + inputUrl.replace(/.+\/\/|www.|\..+/g, '').slice(1);
        // get first letter of domain name in capital letter
        const computedLetter = computedDomainName.charAt(0);
        // clean url from path
        const computedUrl = (new URL(inputUrl)).hostname;
        // return formated object 
        return {name:{computedDomainName}, letter:{computedLetter}, url:`https://${computedUrl}`}
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validURL(url)) {
            const formatedDomainObject = createFormatedDomainObject(url);
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
                <input onChange={e => setUrl(e.target.value)} value={url} placeholder="Enter URL" type="text"></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}

export default Add;