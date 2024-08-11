import React from 'react'
import './Topbar.css'

const Topbar = () => {
    return (
        <>
        <div className="topbar" >

           <div >
           <img className="logoimage" src="https://codearena.online/static/icons/logo.png" alt="codechef is a compitative programming socity"/>
           </div>

           
           
           <div className="rightdiv">
           
                
          

           <div className="box1">
           <a href="http://localhost:3000/contest/submit/playground/play" className="playGroundButton">Play Ground</a>
           <input type="text" className="input" placeholder="Username or Email"></input>
           <input type="password" className="input" placeholder="Password"></input>
           <button type="submit" className="button">Login</button>
            

          <div className="vl"></div>

          <button type="submit" className="button">New User</button>
           </div>
           
           </div>
        </div>
        </>
    )
}

export default Topbar
