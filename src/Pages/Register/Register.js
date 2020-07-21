import React, {useState} from 'react';
import firebase from '../../Services/firebase';
import {Link} from 'react-router-dom';

const Register = ()=>{


  const [phone, setPhone] = useState()
  const [otp, setOtp] = useState()

  const submit = e=>{
    e.preventDefault()
    console.log("number", phone);

    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    firebase.auth().signInWithPhoneNumber(phone, recaptcha)
    .then(e=>{
    let code = prompt('enter the otp', '')
    if (code==null) return;
    e.confirm(code).then(result=>{
      console.log('user', result.user);
    })
    .catch(error=>{
      console.log("Error is ", error);
    })

    })

  }

  return(
    <div>
      <form className="form" onSubmit={submit}>
        <input type="number" onChange={e=>setPhone('+91'+e.target.value)} className="telephone" maxLength="10" pattern="{0-9}{10}" placeholder="enter mobile no." required/>
        <button className="btn btn-primary">Send Otp</button>
        <div id="recaptcha-container"></div>
      </form>
    </div>
  )
}
export default Register;
