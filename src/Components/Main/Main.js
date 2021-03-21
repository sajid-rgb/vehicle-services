import React from 'react';
import Home from '../Home/Home';
import './Main.css'
const Main = ({FakeData,data,setData}) => {
    return (
        <div className='main' >
            <div className=" row container mx-auto mt-5 text-danger">
      {
        FakeData.map(vehicle=><Home vehicle={vehicle} data={data} setData={setData} key={vehicle.id}></Home>)
      }
      </div>
        </div>
    );
};

export default Main;