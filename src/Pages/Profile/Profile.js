import React, {useState, useEffect, useRef} from 'react'
import './Profile.css'
import ReactLoading from 'react-loading'
import 'react-toastify/dist/ReactToastify.css'
import firebase from '../../Services/firebase'
import LoginString from '../Register/LoginString'

const Profile = (props) =>{
  const refInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [documentKey, setDocumentKey] = useState(localStorage.getItem("docid"))
  const [firstname, setFirstName] = useState(localStorage.getItem("firstname"))
  const [lastname, setLastName] = useState(localStorage.getItem("lastname"))
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem("photourl"))
  const [phoneno, setPhone] = useState(localStorage.getItem("number"))
  const [id, setCurrentUserId] = useState(localStorage.getItem("id"))
  const [addOnImage, setAddOnImage] = useState([])
  const [url, setUrl] = useState({})
  let newPhoto = null;
  let newPhotoUrl = "";

useEffect(()=>{
  if (!localStorage.getItem("docid")) {
    props.history.push('/')
  }
})

const onChangeAvatar = (e) =>{
  let imgData = e.target.files
console.log(e.target.files[0]);
  if (e.target.files && e.target.files[0]) {
    // const prefixFiletype = e.target.files[0].type.toString()
    // if (prefixFiletype.indexOf(LoginString.PREFIX_IMAGE) !== 0) {
    //   props.showToast(0, 'This file is not image')
    //   return
    // }
    // newPhoto = e.target.files[0]
    setUrl(e.target.files[0])
    setUserPhoto(URL.createObjectURL(e.target.files[0]))
  }
  else {
    props.showToast(0, "Something wrong with input file")
  }
}

const uploadAvatar = () =>{
  console.log(url===null);
  setIsLoading(true)
  if (url===null) {
    const uploadTask  = firebase.storage()
    .ref()
    .child(id)
    .put(url)
    uploadTask.on(
      LoginString.UPLOAD_CHANGED,
      null,
      err =>{
        props.showToast(0, err.message)
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=>{
          updateUserInfo(true, downloadURL)
        })
      }
    )
  }
  else {
    updateUserInfo(false, null)
  }
}

const updateUserInfo =async  (isUpdatePhotoURL, downloadURL)=>{
  let newinfo={};

  if (isUpdatePhotoURL===true) {
    console.log("if condition");

    console.log({firstname:firstname,
    lastname:lastname,
    url: downloadURL.toString()
  });

    newinfo = await {
      firstname:firstname,
      lastname:lastname,
      url: downloadURL.toString()
    }
    console.log({newinfo});
  }
  else {
    newinfo = await {
      firstname:firstname,
      lastname:lastname,

    }
    console.log(newinfo);

  }
  await firebase.firestore().collection('users')
  .doc(documentKey)
  .update(newinfo)
  .then(sdata=>{
    console.log("then");

    localStorage.setItem("firstname", firstname)
    localStorage.setItem("lastname", lastname)
    if (isUpdatePhotoURL===true) {
      localStorage.setItem("photourl", downloadURL)
    }
    setIsLoading(false)
    props.showToast(1, "updated SuccessFully")
  })

}

  return(
    <div className="profileroot">
      <div className="headerprofile">
        <span>Profile</span>
      </div>

      <img className="avatar" alt="" src={userPhoto}/>

      <div className="viewWrapInputFile">
        {/*<img className="imgInputFile" alt="icon gallery" src={`data:image/png;base64,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`} onClick={()=>{refInput.current.focus()}}/>
        <input ref={refInput} accept="image/*" className="viewInputFile" type="file" onChange={onChangeAvatar}/>*/}

        <input
                 type='file'
                 name='addOnImage'
                 className='form-control'
                 onChange={(e) => {
                   setAddOnImage(e.target.files);
                   onChangeAvatar(e);
                 }}
                 multiple
                 accept='image/*'
               />
      </div>

      <span className="textLabel1" style={{marginTop:"40px"}}>First Name</span>
      <input className="textInput" value={firstname?firstname:''} placeholder="Enter First Name" onChange={(e)=>setFirstName(e.target.value)}/>

      <span className="textLabel1" style={{marginTop:"20px"}}>Last Name</span>
      <input className="textInput" value={lastname?lastname:''} placeholder="Enter Last Name" onChange={(e)=>setLastName(e.target.value)}/>

      <div>
        <button className="btnUpdate" onClick={uploadAvatar}>Save</button>
        {/*<button className="btnback" onClick={props.history.push('/chat')}>Back</button>*/}
      </div>

      {isLoading?(
        <div>
          <ReactLoading
          type={'spin'}
          color={'#203152'}
          height={'3%'}
          width={'3%'}
          />
        </div>
      ):null}
    </div>
  )
}

export default Profile
