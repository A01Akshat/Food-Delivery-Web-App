"use client"
import { useState, useEffect } from "react"
import Customerheader from "../_components/Customerheader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/const"
import { useRouter } from "next/navigation"

const Page = () => {
    const [userstorage,setuserstorage]=useState(JSON.parse(localStorage.getItem('user')))
    const [cartstorage, setCartStorage] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [total, setTotal] = useState(0);
    const [removecartdata,setremovecartdata]=useState(false)
    const router=useRouter()

    useEffect(() => {
        if (cartstorage.length > 0) {
            const calculatedTotal = cartstorage.reduce((acc, item) => acc + item.price, 0);
            setTotal(calculatedTotal);
        } else {
            setTotal(0);
        }
    }, [cartstorage]);

    useEffect(()=>{
        if(!total)
        {
            router.push('/')
        }
    })



    const removeFromCart = (id) => {
        const updatedCart = cartstorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const ordernow=async()=>{
        let user_id=JSON.parse(localStorage.getItem('user'))._id;
        let cart=JSON.parse(localStorage.getItem('cart'));
        //we did this map coz there can be many food items, so we need their ids
        let foodItemIds=cart.map((item)=>item._id).toString();
        let deliveryBoy_id="6684421dce1c36f50f02b486";
        let resto_id=cart[0].resto_id;

        let collection={
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',
            amount:(total + DELIVERY_CHARGES + (total * TAX / 100))

        }
        let response=await fetch('http://localhost:3000/api/order',{
            method:'POST',
            headers: {
                    'Content-Type': 'application/json'
                },
            body:JSON.stringify(collection)
        });
        response=await response.json();
        if(response.success)
        {
            alert("ORDER CONFIRMED")
            setremovecartdata(true)
            router.push('myprofile')
        }
        else{
            alert("FAILED TO ORDER")
        }
        console.log(collection)
       
    }

    return (
        <div>
            <Customerheader removecartdata={removecartdata}/>
            
            <div className="total-wrapper">
                <div className="block-1">
                <h2>User Details:</h2>
                <div className="row">
                        <span>Name: </span>
                        <span>{userstorage?.name}</span>
                    </div>
                    <div className="row">
                        <span>Address: </span>
                        <span>{userstorage?.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile: </span>
                        <span>{userstorage?.mobile}</span>
                    </div>
                    <h2>Amount Details:</h2>
                    <div className="row">
                        <span>Food Price: </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Total Tax: </span>
                        <span>{(total * TAX / 100).toFixed(2)}</span>
                    </div>
                    <div className="row">
                        <span>Delivery: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash On Delivery: </span>
                        <span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={ordernow}>Place your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;
