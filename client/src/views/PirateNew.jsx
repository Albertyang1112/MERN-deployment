import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const PirateNew = () => {

    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [numChests, setChests] = useState();
    const [catchPhrase, setCatchPhrase] = useState();
    const [position, setPosition] = useState();
    const [features, setFeatures] = useState([]);

    //Frontend validations
    const [nameErr, setNameErr] = useState();
    const [imageErr, setImageErr] = useState();
    const [numChestsErr, setNumChestsErr] = useState();
    const [catchPhraseErr, setCatchPhraseErr] = useState();
    const [positionErr, setPositionErr] = useState();

    //Backend validations
    const [errors, setErrors] = useState([]);

    const nav = useNavigate();

    const validatePirate = () => {
        let isValid = true;

        if(!name){
            setNameErr("Name is required");
            isValid = false;
        }
        if(!image){
            setImageErr("Image is required");
            isValid = false;
        }
        if(!numChests){
            setNumChestsErr("No chests? No pirate!");
            isValid = false;
        }
        if(!position){
            setPositionErr("Position required");
            isValid = false;
        }
        if(!catchPhrase){
            setCatchPhraseErr("Must have a catch phrase");
            isValid = false;
        }

        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(validatePirate()){
            axios.post("http://localhost:8000/api/pirates", {name, image, numChests, catchPhrase, position, features})
                .then(res => {
                    setName("");
                    setImage("")
                    setChests();
                    setCatchPhrase("");
                    setPosition("");
                    setFeatures([]);
                    nav("/");
                })
                .catch(err => {
                    const errorResponse = err.response.data.errors;
                    const errorArr = []; 
                    for (const key of Object.keys(errorResponse)) 
                        errorArr.push(errorResponse[key].message)
                    
                    setErrors(errorArr);
                });
            }
    }

    const handleFeatures = (featureName) => {
        if(features.includes(featureName)){
            setFeatures(features.filter(feature => feature !== featureName));
        } else{
            setFeatures([...features, featureName]);
        }
    }

    return(
        <div>
            <h1 className="fw-bold m-auto mb-2">Add Pirate</h1>
            <Link to="/pirates"><button className="btn btn-primary justify-content-end mb-4">Crew Board</button></Link>
            <div className="card container w-50 d-flex flex-column p-4">
                <form onSubmit={submitHandler}>
                    {errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
                    <div>
                        {nameErr && <p className="text-danger">{nameErr}</p>}
                        <label className="text-start">Pirate Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-50 mb-3"/>
                    </div>
                    <div>
                        {imageErr && <p className="text-danger">{imageErr}</p>}
                        <label className="text-start">Img URL:</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-50 mb-3"/>
                    </div>
                    <div>
                        {numChestsErr && <p className="text-danger">{numChestsErr}</p>}
                        <label className="text-start"># of Treasure Chests:</label>
                        <input type="number" value={numChests} onChange={(e) => setChests(e.target.value)} className="w-50 mb-3" />
                    </div>
                    <div>
                        {catchPhraseErr && <p className="text-danger">{catchPhraseErr}</p>}
                        <label className="text-start">Pirate Catch Phrase:</label>
                        <input type="text" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} className="w-50 mb-3"/>
                    </div>
                    <div>
                        {positionErr && <p className="text-danger">{positionErr}</p>}
                        <label className="text-start">Crew Position</label>
                        <select value={position} onChange={(e) => setPosition(e.target.value)} className="w-50 mb-3">
                            <option value="">-- Select --</option>
                            <option value="Captain">Captain</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Bootswain">Bootswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={() => handleFeatures("pegLeg")}/>
                        <label className="ms-2">Peg Leg</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={() => handleFeatures("eyePatch")}/>
                        <label className="ms-2">Eyepatch</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={true} onChange={() => handleFeatures("hookHand")}/>
                        <label className="ms-2">Hook Hand</label>
                    </div>
                    <input type="submit" value="Add pirate" className="mt-3 btn btn-success text-white"/>
                </form>
            </div>
        </div>
    )
}

export default PirateNew;