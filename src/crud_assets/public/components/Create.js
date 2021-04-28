import React, { useState, useEffect } from 'react';
import crud from 'ic:canisters/crud';
import { fromOptional, toOptional } from './helper';

const Create = (props) => {

    const [pageTitle, setPageTitle] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const id = props.match.params.id;

    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const changeAddressHandler = (event) => {
        setAddress(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const saveOrUpdate = (event) => {
        event.preventDefault();
        if (!name || !address || !email) {
            alert("Fill everything");
            return;
        }
        let customer = {
            name: name,
            address: address,
            email: email,
        };
        crud.addCustomer(customer).then((result) => {
            props.history.push('/customers');
        });
    }

    return (
        <div>
            <h2 className="text-center">{pageTitle}</h2>

            < input name="name" placeholder=" Customers Name"
                value={name} onChange={changeNameHandler} />
            <input name="address" placeholder="Address"
                value={address} onChange={changeAddressHandler} />
            <input name="email" placeholder="Email"
                value={email} onChange={changeEmailHandler} />
            <button className="btn btn-success" onClick={saveOrUpdate}>Save</button>
        </div>
    )
}
export default Create