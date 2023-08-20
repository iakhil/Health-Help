import React, {useState} from 'react';
import './App.css'
import axios from 'axios';

function Delete (){

    
    const [id, setId] = useState('');
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const handleDelete = async (e) => {

        e.preventDefault(e);

        try {
            const response = axios.delete(`http://localhost:8000/delete/${id}`);
            console.log('Deletion successful.');
        }
        
        catch (error) {

            console.error('An error error occurred:', error);

        }
    }




    return (
        <form className='delete-form' onSubmit={handleDelete}> 
            <input type='text' placeholder='Enter ID to delete.' value={id} onChange={(e) =>setId(e.target.value)}></input>
            <button type="Submit">Submit</button>
        </form>
    )


}


export default Delete;