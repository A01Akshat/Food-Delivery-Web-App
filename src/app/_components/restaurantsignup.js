import { useRouter } from 'next/navigation';
import { useState } from "react";

const Restaurantsignup = () => {

   const[email,setemail]=useState('')
   const[pass,setpass]=useState('')
   const[c_pass,setc_pass]=useState('')
   const[name,setname]=useState('')
   const[city,setcity]=useState('')
   const[addr,setaddr]=useState('')
   const[contact,setcontact]=useState('')
   const router=useRouter();
   const [error,seterror]=useState(false);
   const [passerror,setpasserror]=useState(false);

   const handlesignup=async()=>{
    if(pass!==c_pass)
        {
            setpasserror(true);
            return false;
        }
        else{
            setpasserror(false);
        }
        if(!email||!pass||!c_pass||!city||!addr||!contact||!name)
            {
                seterror(true)
                return false;
            }
            else{
                seterror(false)
            }
        
    // console.log(email,pass,c_pass,city,addr,contact,name)
    let response=await fetch("http://localhost:3000/api/restaurant",
       {
        method:"POST",
        body:JSON.stringify({email,pass,name,city,addr,contact})
       }
    )
    response=await response.json();
    console.log(response)
    if(response.success)
        {
            console.log(response)
            const {result}=response
            delete result.pass // to remove the show of pass in console
            localStorage.setItem("restaurantuser",JSON.stringify(result));
            router.push("/restaurant/dashboard");
        }
   }


    return (
        <>
            Signup Component
            <div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter email" onChange={(event)=>setemail(event.target.value)} value={email}/>
                    {
                        error && !email && <span className="input-error" >Please enter an email address</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="password" placeholder="Enter password" onChange={(event)=>setpass(event.target.value)} value={pass} />
                    {
                        passerror && <span className="input-error">Password and Confirm Password don't match</span>
                    }
                    {
                        error && !pass && <span className="input-error" >Please enter a password</span>
                    }
                </div>
                
                <div className="input-wrapper">
                    <input className="input-field" type="password" placeholder="Confirm password" onChange={(event)=>setc_pass(event.target.value)} value={c_pass}/>
                    {
                        passerror && <span className="input-error" >Password and Confirm Password don't match</span>
                    }
                    {
                        error && !c_pass && <span className="input-error" >Please enter a password</span>
                    }
                </div>


                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Resto Name" onChange={(event)=>setname(event.target.value)} value={name}
                     />
                     {
                        error && !name && <span className="input-error" >Please enter a name</span>
                    }
                </div>


                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter City" onChange={(event)=>setcity(event.target.value)} value={city}/>
                    {
                        error && !city && <span className="input-error" >Please enter a city</span>
                    }
                </div>


                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Address" onChange={(event)=>setaddr(event.target.value)} value={addr}/>
                    {
                        error && !addr && <span className="input-error" >Please enter a address</span>
                    }
                </div>


                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Phone number" onChange={(event)=>setcontact(event.target.value)} value={contact}/>
                    {
                        error && !contact && <span className="input-error" >Please enter a contact number</span>
                    }
                </div>
               
                <div className="input-wrapper">
                    <button className="button" onClick={handlesignup}>Signup</button>
                </div>
            </div>
        </>
    )
}

export default Restaurantsignup;