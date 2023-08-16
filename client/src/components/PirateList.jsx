import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const PirateList = (props) => {
    const {removeFromDom, pirate} = props;

    const deletePirate = (pirateId) => {
        axios.delete(`http://localhost:8000/api/pirates/${pirateId}`)
            .then(res => removeFromDom(pirateId))
            .catch(err => console.log(err));
    };

    return (
        <div className="card">
            <div className="card-body d-flex align-items-center m-auto">
                <img src={pirate.image} alt={pirate.name} />
                <p className="me-3 m-0">{pirate.name}</p>
                <Link to={"/pirate/" + pirate._id}><button className="btn btn-primary rounded-pill me-2" style={{width: "110px"}}>View Pirate</button></Link>
                <button className="btn btn-danger rounded-pill" style={{width: "80px"}} onClick={(e) => deletePirate(pirate._id)}>Delete</button>
            </div>
        </div>
    )
}

export default PirateList;