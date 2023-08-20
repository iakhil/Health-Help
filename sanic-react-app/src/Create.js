import React, {useState} from 'react';
import './App.css'
import axios from 'axios';

function Create() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        try {
            const response = await axios.post(`http://localhost:8000/create`, {name, description});
            console.log("Data submitted successfully.", response.data);
        } catch(error){
            console.error('An error occurred:', error);
        }
    }

    return (

        <div className="create-form">
        <form onSubmit={handleSubmit}>
           <input type="text" name="name" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
           <input type="description" name="descrption" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

           <button type="Submit">Submit</button>
    </form>

    </div>
    )

}



export default Create;