import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Customerheader = (props) => {
    console.log(props);
    const userstorage = JSON.parse(localStorage.getItem('user'));
    const [user,setuser]=useState(userstorage?userstorage:undefined)
    
    const cartstorage = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartno, setcartno] = useState(cartstorage.length);
    const [cartitem, setcartitem] = useState(cartstorage);
    const router=useRouter()

  

    useEffect(() => {
        if (props.cartdata) {
            let localcartitem = [...cartitem];
            localcartitem.push(JSON.parse(JSON.stringify(props.cartdata)));
            setcartitem(localcartitem);
            setcartno(localcartitem.length);
            localStorage.setItem('cart', JSON.stringify(localcartitem));
        }
    }, [props.cartdata]);

    useEffect(()=>{
        if(props.removecartdata)
        {
            let localcartitem=cartitem.filter((item)=>{
            return item._id!=props.removecartdata})

            setcartitem(localcartitem)
            setcartno(cartno-1)
            localStorage.setItem('cart',JSON.stringify(localcartitem))
            if(localcartitem.length==0)
            {
                localStorage.removeItem('cart')
            }
        }
    },[props.removecartdata])

    useEffect(()=>{
        if(props.removecartdata)
        {
            setcartitem([])
            setcartno(0)
            localStorage.removeItem('cart')
        }
    },[props.removecartdata])

  const logout=()=>{
    localStorage.removeItem('user')
    router.push('/userauth')

  }

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 100 }} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" />
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {
                   user?
                   <>
                    <li><Link href="/#">{user?.name}</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                   </>:
                   <>
                   <li><Link href="/">Login</Link></li>
                   <li><Link href="/userauth">Signup</Link></li>
                   </>
                }
                <li><Link href={cartno?"/cart":"#"}>Cart({cartno ? cartno : 0})</Link></li>
                <li><Link href="/">Add Restaurant</Link></li>
            </ul>
        </div>
    );
}

export default Customerheader;
