import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function Assistant() {

    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        try {
            const response = await axios.post(`http://localhost:8000/assistant`, {formData});
            console.log("Data submitted successfully.", response.data);
        } catch(error){
            console.error('An error occurred:', error);
        }
    }
    return (


        <div>

            <h1>
                Ask your health queries!
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="key"
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                
                />

        <input type="submit" text="Submit"></input>
        </form>

        </div>
    )


}



export default Assistant;