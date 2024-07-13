'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// We are storing some info in LOCAL STORAGE because we want to elminate frequent calls to DB
// Ab harr choti chiz ke liye DB se kya data fetch krna direct local storage se krlo
const Restaurantheader=()=>{

    const [details,setdetails]=useState();
    const router=useRouter();
    const pathname=usePathname()
    useEffect(()=>{
        //checking if user is logged in and then only he is directed to dashboard
        let data=localStorage.getItem("restaurantuser");
        if(!data && pathname=="/restaurant/dashboard")
            {
                router.push("/restaurant")
            }
            else if(data && pathname == "/restaurant"){
                router.push("/restaurant/dashboard");
            }
            else
            {
                setdetails(JSON.parse(data));
            }
    },[])
    const logout=()=>{
        localStorage.removeItem("restaurantuser")
        router.push("/restaurant")
    }
    return(
        <div className='header-wrapper'>
            <div className="logo">
                <img style={{width:100}} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" />
            </div>
            <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                {
                    details && details.name?
                    <> 
                    <Link href="/">Profile</Link>
                    <button onClick={logout}>Logout</button>
                    </>
                    :<Link href="/">Login/SignUp</Link>

                }
                
            </li>
            
            </ul>
        </div>
    )
}

export default Restaurantheader