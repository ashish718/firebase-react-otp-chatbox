import React, {useState, useEffect} from 'react';
import LoginString from '../Register/LoginString';
import './Chat.css';
import firebase from '../../Services/firebase';
import ReactLoading from 'react-loading'

const Chat = (props)=>{

const [phoneno, setPhone] = useState(localStorage.getItem("number"))
const [firstname, setFirstName] = useState(localStorage.getItem("firstname"))
const [lastname, setLastName] = useState(localStorage.getItem("lastname"))
const [userPhoto, setUserPhoto] = useState(localStorage.getItem("photourl"))
const [userDocumentId, setUserDocumentId] = useState(localStorage.getItem("docid"))
const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("id"))

const [currentPeerUser, setCurrentPeerUser] = useState(null);
const [displayContactSwitchedNotification, setdisplayContactSwitchedNotification] = useState([])
const [displayedContacts, setDisplayedContacts] = useState([])
let currentUserMessages = [];
let searchUsers = [];
let notificationMessagesErase = []

// useEffect(()=>{
// if (!localStorage.getItem("docid")) {
//   props.showToast(0, 'Login failed')
//   props.history.push('/')
// }
// },[])


useEffect(()=>{
  firebase.firestore().collection('users').doc(userDocumentId).get()
  .then((doc)=>{
    doc.data().messages.map((item)=>{
      currentUserMessages.push({
        notificationId: item.notificationId,
        number: item.number
      })
    })
    setdisplayContactSwitchedNotification(currentUserMessages)
  })
  getListuser()
  console.log("useEffect");
},[])


const getListuser = async () =>{
  const result = await firebase.firestore().collection('users').get();
  if (result.docs.length>0) {
    let listUsers = []
    listUsers = [...result.docs]
    listUsers.forEach((item, index) => {
      searchUsers.push({
        key:index,
        documentKey: item.id,
        id:item.data().id,
        phoneno: item.data().phoneno,
        messages: item.data().messages,
        url: item.data().url
      })
    });

  }
  renderListUser();

}

const notificationErase= (itemId)=>{
displayContactSwitchedNotification.forEach((el, i) => {
  if (el.notificationId.length>0) {
    if (el.notificationId !== itemId) {
      notificationMessagesErase.push({
        notificationId: el.notificationId,
        number: el.number
      })
    }
  }
});
updateRenderList()
}


const updateRenderList = () =>{
  firebase.firestore().collection('users').doc(userDocumentId).update(
    {message: notificationMessagesErase}
  )
  setdisplayContactSwitchedNotification(notificationMessagesErase)
}


const renderListUser = () =>{
  if (searchUsers.length>0) {
    let viewListUser = [];
    let classname = "";
    searchUsers.map(item=>{
      if (item.id !== currentUserId) {
        classname = getClassnameforUserandNotification(item.id)
        viewListUser.push(
          <button
          id={item.key}
          className={classname}
          onClick={()=>{ notificationErase(item.id)
                          setCurrentPeerUser(item)
                          document.getElementById(item.key).style.backgroundColor="#fff"
                          document.getElementById(item.key).style.color="#fff"
          }}
          >
          <img
          className="viewAvatarItem"
          src = {item.url}
          alt=""
          />
          <div className="viewWrapContentItem">
            <span className="textItem">
              {item.phoneno}
            </span>
          </div>

          {classname === "viewWrapItemNotification"?
            (
            <div className="notificationpragraph">
              <p id={item.key} className="newmessages">New Messages</p>
            </div>
          ):null
          }
          </button>
        )
      }
    })
    setDisplayedContacts(viewListUser)
  }
  else {
    console.log("no user is present");
  }

}


const getClassnameforUserandNotification = (itemId) =>{
  let number =0;
  let className = '';
  let check = false;

  if (currentPeerUser && currentPeerUser.id === itemId) {
    className= 'viewWrapItemFocused'

  }
  else {
    displayContactSwitchedNotification.forEach((item, i) => {
      if (item.notificationId.length>0) {
        if (item.notificationId === itemId) {
          check = true;
          number = item.number
        }
      }
    });
     if (check===true) {
       className = "viewWrapItemNotification"
     }
     else {
       className="viewWrapItem"
     }
  }
  return className
}

const logout = () =>{
  firebase.auth().signOut();
  props.history.push('/')
  localStorage.clear()
}


const profileClick = () =>{
  props.history.push('/profile')
}



  return(
    <div className="root">
      <div className="body">
        <div className="viewListUser">
          <div className="profileviewleftside">
            <img
            className="ProfilePicture"
            alt=""
            src={userPhoto}
            onClick={profileClick}/>
            <button className="Logout" onClick={logout}>Logout</button>
          </div>
          {displayedContacts}
        </div>
      </div>
    </div>
  )
}
export default Chat;
