import React, { useEffect, useState } from 'react'
import NavBar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import Card from '../components/Card.js';


function Home() {
    const [search,setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([]);


    const localData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'applicayion/json'
            }
        });
        response = await response.json();
        setFoodCat(response[1]);
        setFoodItem(response[0]);
        console.log(response[0], response[1]);

    }

    useEffect(() => {
        localData()
    }, [])

    return (
        <div>
            <div><NavBar /></div>
            <div><div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                style={{ objectFit: "contain !important" }}
            >
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ "zIndex": "10" }}>
                        <div className="d-flex justify-content-center">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value = {search}
                                onChange={(e)=>{setSearch(e.target.value)}}

                            />
                            {/* <button className="btn btn-outline-success text-white" type="submit">
                                Search
                            </button> */}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img
                            src="https://source.unsplash.com/random/900×700/?burger"
                            className="d-block w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/900×700/?pizza"
                            className="d-block w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/900×700/?pastry"
                            className="d-block w-100"
                            style={{ filter: "brightness(30%)" }}
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    foodCat.length !== 0 //if food category is not null
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} style={{ color: 'white' }} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div> {/*here index is used as data._id for distinction or uniqueness */}

                                    <hr />
                                    {foodItem.length !== 0 ? foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}>
                                                    </Card>
                                                </div>
                                            )
                                        }) : <div>No Such Data Found</div>

                                    }
                                </div>
                            );
                        })
                        : ""
                }


            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home;