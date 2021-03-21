import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = ({ vehicle, data, setData }) => {
    const { images, name, id } = vehicle;
    const passData = () => {
        setData(id)
    }
    return (
        <div className='col-lg-3 col-md-6 mt-5 mb-3' >
            <Card className='bg-dark'>
                <Link to="/destination"> <Card.Img src={images} className="img-fluid w-50 mx-auto mt-5">
                </Card.Img>
                </Link>
                <Card.Body>
                    <Card.Title><Link to="/destination" onClick={passData}><h3 className="text-danger">{name}</h3></Link></Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Home;