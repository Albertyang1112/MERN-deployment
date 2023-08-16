import axios from "axios";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import PirateList from "../components/PirateList";

const PirateCrew = () => {

    const [pirates, setPirates] = useState([]);
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates")
            .then(res => {
                setPirates(res.data.allPirates);

                if(pirates.length > 0)
                    setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);


    const removeFromDom = (pirateId) => {
        setPirates(pirates.filter(pirate => pirate._id !== pirateId));
    };

    return (
        <div>
            <h1 className="fw-bold m-auto mb-2">Pirate Crew</h1>
            <Link to="/pirate/new"><button className="btn btn-primary justify-content-end mb-4">Add Pirate</button></Link>
            <div>
                {loaded && pirates.map((pirate, i) => {
                    return (<div className="card"><PirateList key={i} pirate={pirate} removeFromDom={removeFromDom}/></div>)
                })}
            </div>
        </div>
    );
};

export default PirateCrew;