import { useRouter } from "next/navigation";
import { useState } from "react";

const Restaurantlogin = () => {

    const [email, setemail] = useState();
    const [pass, setpass] = useState();
    const [error, seterror] = useState(false);
    const router=useRouter()
    const handlelogin =async () => {
        if (!email || !pass) {
            seterror(true)
            return false;
        }
        else {
            seterror(false)
        }

        let response=await fetch ("http://localhost:3000/api/restaurant",
            {
             method:"POST",
             body:JSON.stringify({email,pass,login:true})
            }
         );
         response = await response.json();
         if(response.success)
            {
               
                       
                        const {result}=response
                        delete result.pass // to remove the show of pass in console
                        localStorage.setItem("restaurantuser",JSON.stringify(result));
                        router.push("/restaurant/dashboard");
                    
                alert("LOGIN SUCCESSFULL")
            }else{
                alert("FAILED LOGIN")
            }
        }

    return (
        <>
            <div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter email"
                        value={email} onChange={(e) => setemail(e.target.value)}
                    />
                    {error && !email && <span className="input-error">Enter valid email</span>}
                </div>

                <div className="input-wrapper">
                    <input className="input-field" type="password" placeholder="Enter password"
                        value={pass} onChange={(e) => setpass(e.target.value)}
                    />
                    {error && !pass && <span className="input-error">Enter valid password</span>}
                </div>

                <div className="input-wrapper">
                    <button className="button" onClick={handlelogin}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Restaurantlogin;