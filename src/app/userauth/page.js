"use client"
import Customerheader from "../_components/Customerheader"
import Footer from "../_components/Footer"
import Usersignup from "../_components/Usersignup"
import Userlogin  from "../_components/Userlogin"
import { useState } from "react"
const Userauth=(props)=>{
    const [login,setlogin]=useState(true)
    return(<div>
        <Customerheader/>
        <div className="container">
        <h1>{login?'User Login':'User Signup'}</h1>
        {
            login? <Userlogin redirect={props.searchParams}/>: <Usersignup redirect={props.searchParams}/>
        }

        <button className="button-link" onClick={()=>setlogin(!login)}>{login?"Don't have an Account? Signup":"Already have an account ? Login"}</button>
      
       
       
        </div>
        
        <Footer/>
    </div>)
}
export default Userauth