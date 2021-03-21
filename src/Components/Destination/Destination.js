import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChooseDestination from '../ChooseDestination/ChooseDestination';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
const Destination = (props) => {
    const { data, setData } = props;
    const [inputValue, setInputValue] = useState({
        from: '',
        to: '',
        date: ''
    })
    const [isHide, setIsHide] = useState(false)
    const passInput = (name, value) => {
        const newInputValue = { ...inputValue }
        newInputValue[name] = value
        setInputValue(newInputValue)

    }
    const inputOnBlur = (e) => {
        if (e.target.name === 'from') {
            const from = e.target.value;
            passInput('from', from)
        }
        if (e.target.name === 'to') {
            const to = e.target.value
            passInput('to', to)
        }
        if (e.target.name === 'date') {
            const date = e.target.value;
            passInput('date', date)
        }
    }
    const clickToHide = () => {
        if (inputValue.from && inputValue.to && inputValue.date) {
            setIsHide(true)
        }
    }
    return (
        <div className="text-center row ">
            <div className='col-6 mt-0 mb-3'>
                {
                    isHide === false ? <div className='mt-5'>
                        <form action="">
                            <label for="exampleInputEmail1" className="text-white">From</label> <br />
                            <input type="text" class="form-control w-100" name="from" onBlur={inputOnBlur} required />
                            <label for="exampleInputEmail1" className="text-white">To</label><br />
                            <input type="text" class="form-control w-100" name="to" onBlur={inputOnBlur} required />
                            <label for="exampleInputEmail1" className="text-white">Tour Date</label><br />
                            <input type="date" class="form-control w-100" name="date" onBlur={inputOnBlur} required />
                            <button as={Link} to={"/destination/" + data} className="btn btn-success mt-3 mb-3" onClick={clickToHide}>Search</button>
                        </form>
                    </div> :
                        <ChooseDestination inputValue={inputValue} data={data}></ChooseDestination>
                }
            </div>
            <div className='col-6 mt-3'>
                <Map google={props.google} className='' zoom={14} style={{ height: '90%', width: '80%', marginTop: '30px' }}>
                    <Marker onClick={props.onMarkerClick}
                        name={'Current location'} />
                    <InfoWindow onClose={props.onInfoWindowClose}>
                        <div>
                            <h1>{props.selectedPlace}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        </div>
    );
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBf54iiHH_vD3YjvF3XTjzVUNJnKfyYNtQ'
})(Destination)
