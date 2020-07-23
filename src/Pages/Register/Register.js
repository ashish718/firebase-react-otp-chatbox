import React, {useState, useEffect} from 'react';
import firebase from '../../Services/firebase';
import {Link} from 'react-router-dom';
import LoginString from './LoginString'



const Register = (props)=>{

  const [phoneno, setPhone] = useState()
  const [otp, setOtp] = useState()

useEffect(()=>{
  if (localStorage.getItem(LoginString.ID)) {
    props.showToast(1, 'Login Success')
    props.history.push('/chat')
  }
},[])

  const submit = e=>{
    e.preventDefault()
    console.log("number", phoneno);

    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    firebase.auth().signInWithPhoneNumber(phoneno, recaptcha)
    .then(e=>{
    let code = prompt('enter the otp', '')
    if (code==null) return;
    e.confirm(code).then( async result=>{
       console.log('user', result.user);
       console.log('user', result.user.uid);
      let user = result.user
      console.log(user, "user");
      console.log(user.uid);
      if (user) {
        await firebase.firestore().collection('users')
        .where('id', '==', user.uid)
        .get()
        .then(querySnapshot=>{
          console.log("userData", querySnapshot);
          console.log("userData .data");
          const datass = querySnapshot.docs.map(doc => doc.data());
          if (datass.length>0) {

              querySnapshot.forEach((doc)=>{
                console.log("doc", doc);

                const currentData = doc.data();
                console.log("currentData", currentData);
                localStorage.setItem(LoginString.ID, currentData.id);
                localStorage.setItem(LoginString.FirstName, currentData.firstname);
                localStorage.setItem(LoginString.LastName, currentData.lastname);
                localStorage.setItem(LoginString.PhotoURL, currentData.url);
                localStorage.setItem(LoginString.PhoneNo, currentData.phoneno);
                localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
              })

          }
          else {
            return firebase.firestore().collection('users')
            .add({
              id:result.user.uid,
              phoneno,
              firstname:'test',
              lastname:'',
              url:'',
              messages:[{notificationId:'', number:0}]
            })
            .then(docRef=>{
              console.log("docRef after adding account", docRef);
              localStorage.setItem(LoginString.ID, result.user.uid);
              localStorage.setItem(LoginString.FirstName, '');
              localStorage.setItem(LoginString.LastName, '');
              localStorage.setItem(LoginString.PhotoURL, '');
              localStorage.setItem(LoginString.PhoneNo, phoneno);
              localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
            })
          }
        })
      }
      props.history.push('/chat')
    })
    .catch(error=>{
      console.log("Error is ", error);
    })

    })

  }

  return(
    <div>
    <div id="recaptcha-container"></div>
      <form className="form" onSubmit={submit}>
        <input type="number" onChange={e=>setPhone('+91'+e.target.value)} className="telephone" maxLength="10" pattern="{0-9}{10}" placeholder="enter mobile no." required/>

        <button className="btn btn-primary">Send Otp</button>

      </form>
    </div>
  )
}
export default Register;
