import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const CardList = () => {
    const auth = localStorage.getItem('user');
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth)) {
            navigate('/login');
        }

        const fetchCards = async () => {
            const id = JSON.parse(auth)._id;
            // console.log(id);
            try {
                const response = await fetch(`http://localhost:5000/api/card/${id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchCards();


    }, [auth, navigate])

    const getImageUrl = (imageName) => {
        return `http://localhost:5000${imageName}`;
    };

    const removeCard = async (id) => {
        console.log(id);
        const response = await fetch(`http://localhost:5000/api/card/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data) {
            alert("Card remove ");
        }
    }


    return (
        <form className="inline-grid mt-6 ">
            <div >
                <h1 className="text-red-400 font-bold text-2xl">My Card List</h1>
                <div className="inline-grid">
                    {cards.length > 0 ? <> {
                        cards.map((card) => (
                            <div
                                key={card._id}
                                className="mt-8 bg-stone-300 rounded-lg shadow-lg  "
                            >
                                <div className=" my-2 w-fit rounded-lg mx-2 flex ">
                                    <div key={card._id} />
                                    <img src={getImageUrl(card.image)} className="m-2 p-2 rounded-xl w-28 h-24" alt={card.name} />
                                    <span className=" text-2xl font-bold pt-10 px-2">{card.name.toUpperCase()}</span>
                                    <span className="text-sm pt-11 px-2">Category : {card.category}</span>
                                    <span className="text-sm pt-11 px-2">Rent Price Per Day : {card.price}</span>
                                    <span className="text-sm pt-11 px-2">RegistrationNo : {card.registrationNo}</span>
                                    <span className="text-sm pt-11 px-2">Description : {card.description}</span>
                                    <div className="inline-flex justify-end ">
                                        <button
                                            onClick={() => removeCard(card._id)}
                                            className="bg-red-700 text-white p-2 h-10 mt-9 mx-2 rounded-md hover:bg-red-800 hover:font-medium"
                                        >
                                            Remove
                                        </button>
                                        <Link to={`/view/${card.vehicle_id}`}>
                                            <button
                                                className="bg-green-600 text-white p-2 mt-9 h-auto mx-2 rounded-md  hover:bg-green-700 hover:font-medium"
                                            >
                                                Book Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }</>
                        :
                        <h1 className="mt-20 text-5xl  text-red-600">No card available !</h1>
                    }

                </div>
            </div>
        </form>
    )
}


export default CardList;