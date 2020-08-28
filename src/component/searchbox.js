import React, { useState, useEffect } from 'react';
import { useStyles } from 'react-styles-hook'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Dropdown } from 'primereact/dropdown';
import * as FontAwesome from 'react-icons/fa'
import useDebounce from './usedebounce';

import gbstyle from '../assets/gbstyle'
import apphelper from '../apphelper/apphelper';

export default function SearchBox(props) {
    const [initsearch, setinitsearch] = useState(true);
    const [condselect, setcondselect] = useState(props.condlist[0].value);
    // State and setter for search term
    const [searchTerm, setSearchTerm] = useState('');
    // State and setter for search results
    // const [results, setResults] = useState([]);
    // State for search status (whether there is a pending API request)
    const [isSearching, setIsSearching] = useState(false);

    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            //console.log('use effect dubounce')
            if (!initsearch)
                doSearch(condselect, debouncedSearchTerm ? debouncedSearchTerm : '')

            setinitsearch(false)
        },
        // This is the useEffect input array
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
        [debouncedSearchTerm]
    );

    const oncondChange = (e) => {
        //console.log(e.value)
        setcondselect(e.value);
        doSearch(e.value, debouncedSearchTerm ? debouncedSearchTerm : '')
    }

    const doSearch = (cond, text) => {
        //console.log('search box do search ', cond, text)
        if (!isSearching) {
            setIsSearching(true);

            if (apphelper.IsNull(text)) {
                //console.log('empty');
                props.searchevent(undefined)
            } else {
                //console.log('no empty');
                props.searchevent({ condition: cond, searchtext: text })
            }

            setIsSearching(false);
        }
    }

    return (
        <div style={styles.searchdiv}>
            <Row>
                <InputGroup style={gbstyle.rowmargin} className="mb-3">
                    <InputGroup.Prepend >
                        <Dropdown value={condselect} options={props.condlist} onChange={oncondChange} placeholder="Select Condition" optionLabel="label" style={{ width: '15vw', height: '100%' }} />
                    </InputGroup.Prepend>
                    <Form.Control style={{ marginLeft: 5 }} type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
                    <InputGroup.Append >
                        <span className="input-group-text"><FontAwesome.FaSearch /></span>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        </div >

    )
}

SearchBox.propTypes = {
    condlist: PropTypes.array.isRequired,
    searchevent: PropTypes.func.isRequired,
};

const styles = useStyles({
    searchdiv: {

    }
})


