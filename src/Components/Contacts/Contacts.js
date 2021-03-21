import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

const Contacts = () => {
    
    return (
        <div>
            Coming Soon.........................
        </div>
    );
};

export default Contacts;