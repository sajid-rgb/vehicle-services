import React, { useState } from 'react';
import firebase from "firebase/app";
const Contacts = () => {
    
    return (
        <div className="text-white">
           <form action="">
           <textarea name="" id="" cols="30" rows="10" placeholder="Enter Private message here....." className="mt-3 rounded" required></textarea> <br/>
            <button type="submit" className="btn btn-primary">Send</button>
           </form>
        </div>
    );
};

export default Contacts;