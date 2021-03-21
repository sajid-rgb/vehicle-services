import React, { useContext, useState } from 'react';
import map from '../../images/Map.png'
import { Link, useParams } from 'react-router-dom';
import ChooseData from '../ChooseData/ChooseData';
import FakeData from '../../Fakedata.json'
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import {Map, GoogleApiWrapper,Marker,InfoWindow} from 'google-maps-react';

const Destination = (props) => {
    const {FakeData,data,setData} =props
    // const {id} = useParams()
    // console.log(id);
    const [inputValue,setInputValue] = useState({
        from:'',
        to:'',
        date:''
    })
    const [fixedInput,setFixedInput]=useState(false)
    const [fixedInput2,setFixedInput2]=useState(false)
    const [isHide,setIsHide] = useState(false)
    const inputOnBlur = (e) =>{
        if(e.target.name==='from'){
            const from = e.target.value
            const newInputValue = {...inputValue}
            newInputValue['from'] = from
            setInputValue(newInputValue)
            if(e.target.value ===''){
               
                setFixedInput(true)
            }
            
        }
        if(e.target.name==='to'){
            const to = e.target.value
            const newInputValue = {...inputValue}
            newInputValue['to'] = to
            setInputValue(newInputValue)
            
        }
        if(e.target.name==='date'){
            const date = e.target.value
            const newInputValue = {...inputValue}
            newInputValue['date'] = date
            setInputValue(newInputValue)
            
        }
        
}
  let errors;
  const clickToHide = ()=>{
     if(inputValue.from && inputValue.to && inputValue.date){
         setIsHide(true)
      }
    }
    return (
  
    <div className="text-center row ">
        <div className='col-6 mt-0 mb-3'>
        {
            isHide===false ? <div className='mt-5'>
                <form action="">
                <label for="exampleInputEmail1" className="text-white">From</label> <br/>
        <input type="text" class="form-control w-100" name="from"  maxLength="10"  onBlur={inputOnBlur} required/>
        <label for="exampleInputEmail1"  className="text-white">To</label><br/>
        <input type="text" class="form-control w-100" name="to" maxLength="10"  onBlur={inputOnBlur}  required/>
        <label for="exampleInputEmail1"  className="text-white">Tour Date</label><br/>
        <input type="date" class="form-control w-100" name="date" maxLength="10"  onBlur={inputOnBlur}  required/>
        <button as={Link} to={"/destination/"+data}  className="btn btn-success mt-3 mb-3" onClick={clickToHide}>Search</button>

                </form>
                    {/* <form action="" data-toggle="validator" role="form">
                <div className='form-group'>
                <label for="exampleInputEmail1" className="text-white">From</label> <br/>
        <input type="text" class="form-control w-100" name="from"  maxLength="10"  onBlur={inputOnBlur} required/>
                </div>
        <div className='form-group'>
        <label for="exampleInputEmail1"  className="text-white">To</label><br/>
        <input type="text" class="form-control w-100" name="to" maxLength="10"  onBlur={inputOnBlur}  required/>
        <p>{errors}</p>
    <Link to={"/destination/"+data}><button className="btn btn-success mt-3 mb-3" onClick={clickToHide}>Search</button></Link>
        
        </div>
                </form>   */}
            </div>:
                <ChooseData inputValue={inputValue} data={data}></ChooseData>
            
        }
        </div>
        <div className='col-6 mt-3'>
         <Map google={props.google} zoom={14} style={{height:'90%',width:'80%',marginTop:'30px'}}>
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

// export default Destination;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBf54iiHH_vD3YjvF3XTjzVUNJnKfyYNtQ'
  })(Destination)
