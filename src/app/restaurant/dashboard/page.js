"use client"
import Restaurantheader from "@/app/_components/Restaurantheader"
import './../style.css'
import Addfooditems from "@/app/_components/Addfooditem"
import { useState } from "react"
import Fooditemlist from "@/app/_components/Fooditemlist"
const Dashboard=()=>{
    const [additem,setadditem]=useState(false);
    return(<>
    <Restaurantheader/>
    <button onClick={()=>setadditem(true)}>Add food</button>
    <button  onClick={()=>setadditem(false)}>Dashboard</button>
   
    {
        additem? <Addfooditems setadditem={setadditem}/> : <Fooditemlist/>
    }
    
    </>)
}

export default Dashboard