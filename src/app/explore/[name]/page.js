'use client'
import Customerheader from "@/app/_components/Customerheader";
// import CustomerHeader from "@/app/_components/CustomerHeader"
import { useEffect, useState } from "react"

const Page = (props) => {
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [cartdata, setcartdata] = useState();
    const [cartstorage, setcartstorage] = useState(JSON.parse(localStorage.getItem('cart')));

    const [cartid, setcartid] = useState(cartstorage?() => cartstorage.map((item) => {
        return item._id
    }):[]);

    const [removecartdata,setremovecartdata]=useState()




    useEffect(() => {
        loadRestaurantDetails();
    }, []);
    console.log(cartid)
    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        let response = await fetch("http://localhost:3000/api/restaurant/customer/" + id)
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.detail); // Updated to match the correct response property
            setFoodItems(response.food); // Updated to match the correct response property
        }
    }

    const addtocart = (item) => {
        setcartdata(item)
        let localcartid=cartid;
        localcartid.push(item._id)
        setcartid(localcartid)
        setremovecartdata();
    }

    const removefromcart=(id)=>{
        setremovecartdata(id);
        var localid=cartid.filter(item=>item!=id);
        setcartid(localid)
        setcartdata()
    }



    return (
        <div>
            <Customerheader cartdata={cartdata} removecartdata={removecartdata} />
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="details-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.addr}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-list-wrapper">
                {
                    foodItems.length > 0 ? foodItems.map((item) => (
                        <div className="list-item" key={item._id}>
                            <div><img style={{ width: 100 }} src={item.img_path} alt={item.name} /></div>
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                {
                                    cartid.includes(item._id) ? <button onClick={()=>removefromcart(item._id)}> Remove from Cart</button>
                                        :

                                        <button onClick={() => addtocart(item)}> Add to cart</button>

                                }


                            </div>
                        </div>
                    ))
                        : <h1>No Food Items for this Restaurant</h1>
                }
            </div>
        </div>
    )
}

export default Page;
