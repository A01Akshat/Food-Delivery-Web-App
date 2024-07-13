"use client"
import { useState } from "react"
import Restaurantlogin from "../_components/restaurantlogin"
import Restaurantsignup from "../_components/restaurantsignup"
import Restaurantheader from "../_components/Restaurantheader"
import "./style.css"
import Footer from "../_components/Footer"
const Restaurant = () => {
    const [login, setlogin] = useState(true)
    return (<>
        <div className="container ">
            <Restaurantheader></Restaurantheader>
        <h1>Restaurant Page Login/SignUp</h1>
        {
            login ? <Restaurantlogin /> : <Restaurantsignup />
        }

        <div>
            <button className="button-link" onClick={() => setlogin(!login)}>{login ? "Don't have an Account ? Signup" :
                "Already Have Account? Login"}</button>
        </div>
        <Footer/>
        </div>
    </>)
}

export default Restaurant