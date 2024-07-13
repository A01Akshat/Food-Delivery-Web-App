"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Editfooditems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        handleloadfooditem();
    }, []);

    const handleloadfooditem = async () => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`);
            response = await response.json();
            if (response.success) {
                const foodItem = response.result[0]; // Assuming the response.result is an array
                console.log(foodItem);
                setName(foodItem.name);
                setPrice(foodItem.price);
                setPath(foodItem.img_path);
                setDescription(foodItem.description);
            }
        } catch (error) {
            console.error("Error loading food item:", error);
        }
    };

    const handleAddFoodItem = async () => {
        if (!name || !path || !price || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        let response=await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id,{
            method:'PUT',
            body:JSON.stringify({name,price,img_path:path,description})
        })
        response=await response.json();
        if(response.success)
            {
                router.push('../dashboard')
            }
        
    };
    return (<div className="container">
        <h1>Update Food Item</h1>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter food name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="input-error">Please enter valid name</span>}
        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter price"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="input-error">Please enter valid price</span>}

        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter image path"
                value={path} onChange={(e) => setPath(e.target.value)}
            />
            {error && !path && <span className="input-error">Please enter valid path</span>}

        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter description"
                value={description} onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <span className="input-error">Please enter valid description</span>}

        </div>
        <div className="input-wrapper">
            <button className="button" onClick={handleAddFoodItem}>Update Food Item</button>
        </div>
        <div className="input-wrapper">
            <button className="button" onClick={()=>router.push('../dashboard')}>Back to Food Item List</button>
        </div>
    </div>)
}

export default Editfooditems;
