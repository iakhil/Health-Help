import React, {useState} from 'react';
import './App.css';
import axios from 'axios';


function Update () {

    const [name, setName] = useState('');
    const[description, setDescription] = useState('');
    const [id, setId] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(e);

        try {
            axios.put(`http://localhost:8000/update/${id}`, {name, description});
            console.log("Update successful.");
        } 

        catch (error) {
            console.error("An error occurred.", error);
        }

    }



    return (

        <div className="create-form">
        <form onSubmit={handleSubmit}>

            <input type="text" name="id" value={id} placeholder='ID' onChange={(e) => setId(e.target.value)}></input>
           <input type="text" name="name" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
           <input type="description" name="descrption" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

           <button type="Submit">Submit</button>
    
    </form>

    </div>
    )

}


export default Update;