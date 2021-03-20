import React, { createContext, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
const Login = () => {
  const [user,setUser] = useState({
    name:'',
    email:'',
    photo:'',
    password:'',
    confirmPassword:'',
    error:'',
    signIn:true,
    id:''
  })
  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const [isSignedIn,setIsSignedIn] = useState(false);
  const [isPasswordMatched,setIsPasswordMatched] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user
      const newUser={
        email:user.email,
        photo:user.photoURL,
        name:user.displayName,
        signIn:false,
        id:''
    }
   setUser(newUser)
    setLoggedInUser(newUser)
    history.replace(from);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    const newUser = {...user}
    newUser['error'] = errorMessage
    setUser(newUser)
    setLoggedInUser(newUser)
    history.replace(from)
  });
    }
    const handleEmailSignUp = () =>{
      const pass = user.password
      const confirmPass = user.confirmPassword
      if(pass===confirmPass){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((result) => {
    const user = result.user;
    const newUser={
        email:user.email,
        photo:user.photoURL,
        name:user.displayName
    }

    setUser(newUser)
    setLoggedInUser(newUser)
    updateUserInfo(user.name)
    history.replace(from);
  })
  .catch((error) => {
    const errorMessage = error.message;
    const newUser = {...user}
    newUser['error'] = errorMessage
    setUser(newUser)
    setLoggedInUser(newUser)
});
      }
      else{
        setIsPasswordMatched(true)
      }
        
    }
  const handleEmailSignIn = () =>{
   firebase.auth().signInWithEmailAndPassword(user.email, user.password)
   .then((result) => {
     console.log(result);
     const user = result.user;
     const newUser={
         email:user.email,
          photo:user.photoURL,
          name:user.displayName
     }
 
      setUser(newUser)
      setLoggedInUser(newUser)
     history.replace(from);
  })
  .catch((error) => {
    const errorMessage = error.message;
    const newUser = {...user}
    newUser['error'] = errorMessage
    console.log(errorMessage);
    setUser(newUser)
    setLoggedInUser(newUser)

  });
}
const handleFacebookSignIn = () =>{
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    const user = result.user;
    const newUser={
      email:user.email,
      photo:user.photoURL,
      name:user.displayName,
      signIn:false,
      id:''
  }

  setUser(newUser)
  setLoggedInUser(newUser)
  history.replace(from);
  })
  .catch((error) => {

    const errorMessage = error.message;
    const newUser = {...user}
    newUser['error'] = errorMessage
    console.log(errorMessage);
    setUser(newUser)
    setLoggedInUser(newUser)

  });

}
const updateUserInfo = (name) =>{
  const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
})
.then(function() {
})
.catch(function(error) {

});

}
    const handleOnBlur = (e) =>{
      let isFormValid=true;
      if(e.target.name==='name'){
        const name = e.target.value
        const newUser = {...user}
        newUser[e.target.name]=name
        setUser(newUser)
        setLoggedInUser(newUser)

      }
      if(e.target.name==='email'){
        const email =(e.target.value)
        const newUser = {...user}
        newUser[e.target.name]=email
        setUser(newUser)
        setLoggedInUser(newUser)
      }
      if(e.target.name==='password'){
        const password =(e.target.value)
        console.log(password);
        console.log(e.target.value);
        const newUser = {...user}
        newUser[e.target.name]=password
        setUser(newUser)
        setLoggedInUser(newUser)
      }
      if(e.target.name==='confirm'){
        const confirmPassword = (e.target.value)
        const newUser = {...user}
        console.log(confirmPassword);
        newUser['confirmPassword']=confirmPassword
        setUser(newUser)
        setLoggedInUser(newUser)
      }
 }
    const haveAccount = () =>{
      setIsSignedIn(!isSignedIn)
      setIsPasswordMatched(false)
    }
    return (
      
        <div style={{marginTop:'100px',backgroundColor:'black',marginBottom:'100px',color:'white'}} className="w-lg-75 w-sm-100 mx-auto">
          {
            isSignedIn && <div>
              <label for="exampleInputEmail1">Full Name</label>
          <input type="text" class="form-control w-75 mx-auto" name='name' onBlur={handleOnBlur} placeholder="Enter Full Name" required/>
            </div>
          }
          {
            isSignedIn ? <div>
              <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control w-75 mx-auto" name='email' onBlur={handleOnBlur}  placeholder="Enter email" required/>
          <label>Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='password' onBlur={handleOnBlur}  placeholder="Password" required/>
            </div>: <div>
            <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control w-75 mx-auto" name='email'  placeholder="Enter email" required/>
          <label>Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='password'   placeholder="Password" required/>
            </div>
          }
          {
            isSignedIn && <div>
              <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='confirm' onBlur={handleOnBlur} placeholder="Confirm Password" required/>
            </div>
          }
          <p className='text-danger'>{user.error}</p>
          {
            isPasswordMatched && <p className='text-danger'>Error! Password is not matched.</p>
          }
         {
                 isSignedIn ?<button type="submit" class="btn btn-primary mt-3 mb-3" onClick={handleEmailSignUp}>Sign Up</button>:
                      <button type="submit" class="btn btn-primary mt-3 mb-3" onClick={handleEmailSignIn}>Sign In</button>
         }
        <button type="submit" class="btn btn-primary mt-3 mb-3 ml-3" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} style={{color:'yellow'}}></FontAwesomeIcon >Google Sign In</button> <br/>
        <button type="submit" class="btn btn-primary mt-3 mb-3 ml-3" onClick={handleFacebookSignIn}><FontAwesomeIcon icon={faFacebookF} style={{color:'blue',marginRight:'5px'}}></FontAwesomeIcon >Facebook Sign In</button> <br/>
        {
           isSignedIn ? <Link to='/login'  onClick={haveAccount}>I have an account</Link>: <Link to='/sign up' onClick={haveAccount}>I have no account</Link>
         }
      </div>
    
    )
    
};

export default Login;