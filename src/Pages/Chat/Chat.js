import React, {useState, useEffect} from 'react';
import LoginString from '../Register/LoginString';
import './Chat.css';
import firebase from '../../Services/firebase';
import ReactLoading from 'react-loading'

const Chat = (props)=>{

const [phoneno, setPhone] = useState(localStorage.getItem("number"))

useEffect(()=>{
if (!localStorage.getItem("docid")) {
  props.showToast(0, 'Login failed')
  props.history.push('/')
}
},[])

const logout = () =>{
  firebase.auth().signOut();
  props.history.push('/')
  localStorage.clear()
}

  return(
    <div>
      {phoneno}
      <button onClick={logout}>Log Out</button>
    </div>
  )
}
export default Chat;
