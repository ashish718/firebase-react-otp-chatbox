import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import Chat from './Pages/Chat/Chat';
import ChatBox from './Pages/ChatBox/ChatBox';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import firebase from './Services/firebase';
import {toast, ToastContainer} from 'react-toastify';


function App() {

const showToast = (type, message)=>{
  switch (type) {
    case 0:
      toast.warning(message)
      break;
    case 1:
      toast.success(message)
      default:
      break;
  }
}


  return (
      <Router>
        <ToastContainer
          autoClose= {2000}
          hideProgressBar = {true}
          position={toast.POSITION.BOTTOM_CENTER}
        />

        <Switch>
          <Route exact path='/' render={props=> <Register showToast={showToast}{...props}/>}/>
          <Route exact path='/profile' render={props=> <Profile showToast={showToast}{...props}/>}/>
          <Route exact path='/chat' render={props=> <Chat showToast={showToast}{...props}/>}/>


        </Switch>


      </Router>
  );
}

export default App;
