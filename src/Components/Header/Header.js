import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (
        <div className='d-flex justify-content-between  border-bottom-white bg-success'>
            <Navbar  expand="lg">
                <Navbar.Brand href="/home" className="text-dark font-weight-bold">Vehicle Services</Navbar.Brand>
            </Navbar>
           <div>
                <Navbar  expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto mr-3 mt-2">
                            <Link to="/home" className=" mr-3 text-white">Home</Link>
                            <Link to="/destination" className=" mr-3 text-white">Destination</Link>
                            <Link to="/blog" className=" mr-3 text-white">Blog</Link>
                            <Link to="/contact" className=" mr-3 text-white">Contacts</Link>
                            {
                                loggedInUser.signIn ? <Link to="/login" className=" mr-3 text-white">Sign In</Link>:<p className=" mr-3 text-white">{loggedInUser.name}</p>
                            }
                        </Nav>
                   </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;