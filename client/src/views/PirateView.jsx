import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PirateView = () => {

    const { _id } = useParams();
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [numChests, setChests] = useState();
    const [catchPhrase, setCatchPhrase] = useState();
    const [position, setPosition] = useState();
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pirates/${_id}`)
            .then(res => {
                setName(res.data.pirate.name);
                setImg(res.data.pirate.image);
                setChests(res.data.pirate.numChests);
                setCatchPhrase(res.data.pirate.catchPhrase);
                setPosition(res.data.pirate.position);
                setFeatures(res.data.pirate.features);
                console.log(features);
            })
            .catch(err => console.log(err));
    }, [_id]);

    const toggleFeature = (featureName) => {
        let updatedFeatures
        if (features.includes(featureName)) {
            updatedFeatures = features.filter(feature => feature !== featureName);
            setFeatures(features.filter(feature => feature !== featureName));
        } else {
            updatedFeatures = [...features, featureName];
            setFeatures(updatedFeatures = [...features, featureName]);
        }

        axios.patch(`http://localhost:8000/api/pirates/${_id}`, {features: updatedFeatures})
            .then(res => res)
            .catch(err => console.log(err));
    };


    return (
        <div>
            <h1 className="fw-bold m-auto mb-2">{name}</h1>
            <h2 className="fw-bold m-auto mb-4">{catchPhrase}</h2>
            <div className="card container w-25 d-flex flex-column p-4">
                <h3>About</h3>
                <img src={img} alt={name} />
                <p>Position: {position}</p>
                <p>Treasures: {numChests}</p>
                <div className="d-flex align-items-center justify-content-around mb-2">
                    <p className="m-0">Peg Leg: {features.includes("pegLeg") ? "Yes" : "No"}</p>
                    {features.includes("pegLeg") ? <button className="btn btn-danger text-white fw-bold" onClick={() => toggleFeature('pegLeg')}>NO</button> : <button className="btn btn-success text-white fw-bold" onClick={() => toggleFeature('pegLeg')}>YES</button>}
                </div>
                <div className="d-flex align-items-center justify-content-around mb-2">
                    <p className="m-0">Eye Patch: {features.includes("eyePatch") ? "Yes" : "No"}</p>
                    {features.includes("eyePatch") ? <button className="btn btn-danger text-white fw-bold" onClick={() => toggleFeature('eyePatch')}>NO</button> : <button className="btn btn-success text-white fw-bold" onClick={() => toggleFeature('eyePatch')}>YES</button>}
                </div>
                <div className="d-flex align-items-center justify-content-around">
                    <p className="m-0">Hook Hand: {features.includes("hookHand") ? "Yes" : "No"}</p>
                    {features.includes("hookHand") ? <button className="btn btn-danger text-white fw-bold" onClick={() => toggleFeature('hookHand')}>NO</button> : <button className="btn btn-success text-white fw-bold" onClick={() => toggleFeature('hookHand')}>YES</button>}
                </div>
            </div>
            <Link to="/pirates"><button className="btn btn-primary justify-content-end mb-4">Crew Board</button></Link>
        </div>
    )
}

export default PirateView;