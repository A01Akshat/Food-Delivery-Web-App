"use client"
import { useState, useEffect } from "react"
import Customerheader from "../_components/Customerheader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/const"
import { useRouter } from "next/navigation"

const Page = () => {
    const [cartstorage, setCartStorage] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const router=useRouter();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cartstorage.length > 0) {
            const calculatedTotal = cartstorage.reduce((acc, item) => acc + item.price, 0);
            setTotal(calculatedTotal);
        } else {
            setTotal(0);
        }
    }, [cartstorage]);

    const removeFromCart = (id) => {
        const updatedCart = cartstorage.filter(item => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const ordernow=()=>{
        if(JSON.parse(localStorage.getItem('user')))
        {
        router.push('/order')
        }
        else
        {
            router.push('/userauth?order=true')
        }
    }

    return (
        <div>
            <Customerheader />
            <div className="food-list-wrapper">
                {cartstorage.length > 0 ? cartstorage.map((item) => (
                    <div className="list-item" key={item._id}>
                        <div><img style={{ width: 100 }} src={item.img_path} alt={item.name} className="list-item-block-1" /></div>
                        <div className="list-item-block-2">
                            <div>{item.name}</div>
                            <div className="description">{item.description}</div>
                            <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                        </div>
                        <div className="list-item-block-3">Price: {item.price}</div>
                    </div>
                )) : <h1>No Food Items for this Restaurant</h1>}
            </div>
            <div className="total-wrapper">
                <div className="block-1">
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
                </div>
                <div className="block-2">
                    <button onClick={ordernow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;
