import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/LogIn/Login';
import Main from './Components/Main/Main';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import FakeData from './Fakedata.json'
import ChooseData from './Components/ChooseData/ChooseData';
import Contacts from './Components/Contacts/Contacts';
import Blog from './Components/Blog/Blog';
export const UserContext = createContext()
function App() {
  const [loggedInUser,setLoggedInUser] = useState({
    signIn:true,
  })
  const [data,setData]=useState()
  console.log(data);
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <div className="App">
      <div className="container">
      <Router>
      <Header></Header>
        <Switch>
            <Route path='/login'>
              <Login></Login>
              </Route>
              <Route path='/home'>
              <Main FakeData={FakeData} data={data} setData={setData}></Main>
              </Route>
              <PrivateRoute path='/destination'>
                <Destination FakeData={FakeData} data={data} setData={setData} ></Destination>
              </PrivateRoute>
              <Route path='/destination/:data'>
                <ChooseData data={data}></ChooseData>
              </Route>
              <Route path='/sign up'>
                <Login FakeData={FakeData} setData={setData}></Login>
              </Route>
              <PrivateRoute path="/contact">
                <Contacts></Contacts>
              </PrivateRoute>
              <PrivateRoute path="/blog">
                <Blog></Blog>
              </PrivateRoute>
              <Route exact path='/'>
              <Main FakeData={FakeData} setData={setData}></Main>
              </Route>
              <Route path='*'>
                <h1 className='text-danger'>404-Link not found.</h1>
              </Route>
        </Switch>
      </Router>
      </div>
    </div>
    </UserContext.Provider>
  );
}

export default App;
