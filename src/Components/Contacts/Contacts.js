import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

const Contacts = () => {
    
    return (
        <div className="text-white">
           <form action="">
           <textarea name="" id="" cols="40" rows="10" placeholder="Enter Private message here....." className="mt-3 rounded" required></textarea> <br/>
            <button type="submit" className="btn btn-primary">Send</button>
           </form>
        </div>
    );
};

export default Contacts;