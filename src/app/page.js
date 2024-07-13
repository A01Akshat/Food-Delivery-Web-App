"use client";
import Image from "next/image";
import Customerheader from "./_components/Customerheader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loc, setLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState("");
  const [show, setShow] = useState(false);
  const [rest, setRest] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/restaurant/customer/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      let data = await response.json();
      if (data.success) {
        setLoc(data.result);
      } else {
        console.error("Failed to fetch locations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleList = (item) => {
    setSelectLoc(item);
    setShow(false);
    loadRestaurants({ location: item });
  };

  const loadRestaurants = async (params) => {
    try {
      let url = "http://localhost:3000/api/restaurant/customer";
      if (params?.location) {
        url += "?location=" + params.location;
      } else if (params?.restaurant) {
        url += "?restaurant=" + params.restaurant;
      }

      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      let data = await response.json();
      if (data.success) {
        setRest(data.result);
      } else {
        console.error("Failed to fetch restaurants:", data.error);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <main>
      <Customerheader />
      <div className="main-page-banner">
        <h1>FOOD DELIVERY APP</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Select place"
            className="select-input"
            value={selectLoc}
            onClick={() => setShow(true)}
            onChange={(e) => setSelectLoc(e.target.value)}
          />
          <ul className="location-list">
            {show &&
              loc.map((item, index) => (
                <li key={index} onClick={() => handleList(item)}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            placeholder="Enter food or Restaurant name"
            className="search-input"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {rest.map((item, index) => (
          <div
            onClick={() => router.push('explore/' + item.name + "?id=" + item._id)}
            key={index}
            className="restaurant-wrapper"
          >
            <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city}</div>
              <div>{item.address}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
