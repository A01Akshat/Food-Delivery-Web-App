import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Fooditemlist = () => {
    const [fooditems, setfooditems] = useState([]);
    const router=useRouter()

    useEffect(() => {
        loadfood();
    }, []);

    const loadfood = async () => {
        try {
            const restodata = JSON.parse(localStorage.getItem('restaurantuser'));
            if (!restodata) {
                throw new Error("No restaurant user data found in localStorage.");
            }
            const resto_id = restodata._id;
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
            response = await response.json();

            if (response.success) {
                console.log(response);
                setfooditems(response.result);
            } else {
                alert("NO LIST");
            }
        } catch (error) {
            console.error("Error loading food items:", error);
        }
    };

    const deletefooditem=async(id)=>{
        let response=await fetch('http://localhost:3000/api/restaurant/foods/'+id,{
            method:'delete'
        }); 
        response =await response.json();
        if(response.success)
            {
                loadfood()
            }
            else{
                alert("Item not deleted")
            }
    }

    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {fooditems && fooditems.map((item, key) => (
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
                            </td>
                            <td>
                                <button onClick={()=>deletefooditem(item._id)}>Delete</button>
                                <button onClick={()=>router.push('dashboard/'+item._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Fooditemlist;
