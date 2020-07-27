import React, {useState, useEffect} from 'react'
import './Welcome.css'

const Welcome=(props)=>{


  return(
    <div className="viewWelcomeBoard">
      <img
      className="avatarWelcome"
      src={props.currentUserPhoto}
      alt=""
      />
      <span className="textTileWelcome">{`Welcome ${props.currentUserName||props.currentUserPhoneno}`}</span>
      <span className="textDescriptionWelcome"> Let's connect the world
      </span>
    </div>
  )
}
export default Welcome
