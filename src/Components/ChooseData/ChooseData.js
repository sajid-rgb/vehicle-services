import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import FakeData from "../../Fakedata.json"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
const ChooseData = ({inputValue,data}) => {
    const d= data
    console.log(d);
    const selectData= FakeData.find(data=>data.id===parseInt(d))
    
    return (
    
            <div className='bg-white text-left mt-5'>
            <div className='text-dark bg-success w-100' style={{height:'100px',marginTop:'40px',border:'3px solid grey'}}>
            <h2 className='text-center  text-white'>{inputValue.from}</h2>
               <h2 className='text-center text-white'>{inputValue.to}</h2>
          
           </div>
           <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-center bg-danger'>
           <img src={selectData.images} className='w-25 ml-4' alt=""/>
           <div className='d-flex flex-md-row flex-column'>
           <h4 className='mt-4'>{selectData.name}</h4>
           <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{color: 'white'}}></FontAwesomeIcon>4</h5>
           </div>
           <h5 className='mt-3 mr-4'>${selectData.Fare}</h5>
          
              
           </div>
           <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-center bg-info' >
           <img src={selectData.images} className='w-25 ml-4' alt=""/>
           <div className='d-flex flex-md-row flex-column'>
           <h4 className='mt-4'>{selectData.name}</h4>
           <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{color: 'white'}}></FontAwesomeIcon>4</h5>
           </div>
           <h5 className='mt-3 mr-4'>${selectData.Fare}</h5>
          
              
           </div>
           <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-center bg-success ' >
           <img src={selectData.images} className='w-25 ml-4' alt=""/>
           <div className='d-flex flex-md-row flex-column'>
           <h4 className='mt-4'>{selectData.name}</h4>
           <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{color: 'white'}}></FontAwesomeIcon>4</h5>
           </div>
           <h5 className='mt-3 mr-4'>${selectData.Fare}</h5>
          
              
           </div>

            
        </div>
        
    );
};

export default ChooseData;