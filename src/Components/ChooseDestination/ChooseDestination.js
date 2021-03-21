import React from 'react';
import FakeData from "../../Fakedata.json"
import './ChoseDestination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faUsers } from '@fortawesome/free-solid-svg-icons';
const ChooseDestination = ({ inputValue, data }) => {
    const dataId = data
    const selectData = FakeData.find(data => data.id === parseInt(dataId))
    return (
        <div className='bg-white text-left mt-5'>
            <div className='text-dark bg-success w-100 destination-option'>
                <h5 className='text-center text-white mt-3 text-uppercase'><span className="ml-2">{inputValue.from}</span></h5>
                <h5 className='text-center text-white text-uppercase'><span className="ml-2">{inputValue.to}</span></h5>
            </div>
            <div className='d-flex flex-md-row flex-column justify-content-md-between justify-content-left align-items-center border-bottom-dark bg-white vehicle' >
                <img src={selectData.images} className='w-50 ml-4' alt="" />
                <div className='d-flex flex-md-row flex-column'>
                    <h4 className='mt-4'>{selectData.name}</h4>
                    <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{ color: 'black' }}></FontAwesomeIcon>4</h5>
                </div>
                <h5 className='mt-3 mr-md-4'>${selectData.Fare}</h5>
            </div>
            <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-center bg-white vehicle' >
                <img src={selectData.images} className='w-50 ml-4' alt="" />
                <div className='d-flex flex-md-row flex-column'>
                    <h4 className='mt-4'>{selectData.name}</h4>
                    <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{ color: 'black' }}></FontAwesomeIcon>4</h5>
                </div>
                <h5 className='mt-3 mr-md-4'>${selectData.Fare}</h5>
            </div>
            <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-center bg-white vehicle'>
                <img src={selectData.images} className='w-50 ml-4' alt="" />
                <div className='d-flex flex-md-row flex-column'>
                    <h4 className='mt-4'>{selectData.name}</h4>
                    <h5 className='mt-4 ml-md-2'><FontAwesomeIcon icon={faUsers} style={{ color: 'black' }}></FontAwesomeIcon>4</h5>
                </div>
                <h5 className='mt-3 mr-md-4'>${selectData.Fare}</h5>
            </div>
        </div>

    );
};

export default ChooseDestination;