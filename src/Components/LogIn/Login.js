import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
    password: '',
    confirmPassword: '',
    error: '',
    signIn: true,
    id: ''
  })
  console.log(user);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const updateUserFromGoogleAndFb = (result) => {

    const user = result.user
    const newUser = {
      email: user.email,
      photo: user.photoURL,
      name: user.displayName,
      signIn: false,
      id: ''
    }
    setUser(newUser)
    setLoggedInUser(newUser)
    history.replace(from);
  }
  const updateErrorFromGoogleAndFb = (error) => {
    const errorMessage = error.message;
    const newUser = { ...user }
    newUser['error'] = errorMessage
    setUser(newUser)
  }
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        updateUserFromGoogleAndFb(result)
      })
      .catch((error) => {
        updateErrorFromGoogleAndFb(error);
      });
  }
  const handleEmailSignUp = (e) => {
    const pass = user.password
    const confirmPass = user.confirmPassword
    if (pass === confirmPass && user.name && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUser = { ...user }
          newUser.error = ''
          setUser(newUser)
          setLoggedInUser(newUser)
          setIsSignedUp(true)
          setIsPasswordMatched(false)
          setIsError(false)
          updateUserInfo(user.name)
        })
        .catch((error) => {
          emailSignUpAndSignInError(error)
        });
      e.preventDefault()
    }
    else if (pass !== confirmPass) {
      setIsPasswordMatched(true)
    }
    else {
      setIsError(true)
    }
  }
  const handleEmailSignIn = (e) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newUserInfo = { ...user }
        newUserInfo.email = user.email
        newUserInfo.name = user.displayName
        setUser(newUserInfo)
        setLoggedInUser(newUserInfo)
        history.replace(from);
        setIsError(false);
      })
      .catch((error) => {
        emailSignUpAndSignInError(error);
      });
    e.preventDefault()
  }
  const emailSignUpAndSignInError = (error) => {
    const errorMessage = error.message;
    const newUser = { ...user }
    newUser.error = errorMessage;
    setUser(newUser)
    setIsPasswordMatched(false)
    setLoggedInUser(newUser)

  }
  const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        updateUserFromGoogleAndFb(result)
      })
      .catch((error) => {
        updateErrorFromGoogleAndFb(error);
      });

  }
  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
      .then(function () {
      })
      .catch(function (error) {

      });

  }
  const handleOnBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)


    }
    if (e.target.name === 'password') {
      isFormValid = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,20}$/.test(e.target.value)

    }
    if (e.target.name === 'confirmPassword') {
      isFormValid = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,20}$/.test(e.target.value)

    }
    if (isFormValid === true) {
      const userInfo = { ...user }
      userInfo[e.target.name] = e.target.value
      setUser(userInfo)
    }
  }
  const haveAccount = () => {
    setIsSignedIn(!isSignedIn)
    setIsPasswordMatched(false)
    setIsSignedUp(false)
  }
  return (
    <div style={{ marginTop: '100px', backgroundColor: 'black', marginBottom: '100px', color: 'white' }} className="w-lg-75 w-sm-100 mx-auto rounded">
      {
        isSignedIn && <div>
          <label>Full Name</label>
          <input type="text" class="form-control w-75 mx-auto" name='name' onBlur={handleOnBlur} placeholder="Enter Full Name" required />
        </div>
      }
      {
        isSignedIn ? <div>
          <label>Email address</label>
          <input type="text" class="form-control w-75 mx-auto" name='email' onBlur={handleOnBlur} placeholder="Enter email" required />
          <label>Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='password' onBlur={handleOnBlur} placeholder="Password" required />
        </div> : <div>
          <label >Email address</label>
          <input type="text" name='email' class="form-control w-75 mx-auto" onBlur={handleOnBlur} placeholder="Enter email" required />
          <label>Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='password' onBlur={handleOnBlur} placeholder="Password" required />
        </div>
      }
      {
        isSignedIn && <div>
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" class="form-control w-75 mx-auto" name='confirmPassword' onBlur={handleOnBlur} placeholder="Confirm Password" required />
        </div>
      }
      <p className='text-danger'>{user.error}</p>
      {
        isError && <p className="text-danger">Please fill the form correctly</p>
      }
      {
        isSignedUp && <p className='text-success'>Account Creates Successfully</p>
      }
      {
        isPasswordMatched && <p className='text-danger'>Error! Password is not matched.</p>
      }
      {
        isSignedIn ? <button type="submit" class="btn btn-primary mt-3 mb-3" onClick={handleEmailSignUp}>Sign Up</button> :
          <button type="submit" class="btn btn-primary mt-3 mb-3" onClick={handleEmailSignIn}>Sign In</button>
      }
      <button type="submit" class="btn btn-primary mt-3 mb-3 ml-3" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} style={{ color: 'yellow' }}></FontAwesomeIcon >Google Sign In</button> <br />
      <button type="submit" class="btn btn-primary mt-3 mb-3 ml-3" onClick={handleFacebookSignIn}><FontAwesomeIcon icon={faFacebookF} style={{ color: 'blue', marginRight: '5px' }}></FontAwesomeIcon >Facebook Sign In</button> <br />
      {
        isSignedIn ? <Link to='/login' onClick={haveAccount} className='mb-3'>I have an account</Link> : <Link to='/sign up' onClick={haveAccount} className='mb-3'>I have no account</Link>
      }
    </div>
  )
};
export default Login;