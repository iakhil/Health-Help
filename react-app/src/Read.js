import React, {useState} from 'react';
import './App.css'
import axios from 'axios';


function Read() {

    const [id, setId] = useState('');
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const handleSearch = () => {
        setLoading(true);

        axios.get(`http://localhost:8000/read/${id}`)
        .then(response => {
            setEntry(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching entry:", error);
            setLoading(false);
        })
    }


    
    return (

        <div className="search">
            <input
            type="text"
            placeholder="Enter ID."
            value={id}
            onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <div>Loading...</div>}
            {entry && (
                <div className="search-result">

                    <table>
                        <thead>

                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>

                        </thead>
                     <tbody>

                        <tr>
                            <td>{entry.item.name}</td>
                            <td>{entry.item.description}</td>
                        </tr>

                     </tbody>
                      </table>
        </div>
            )}
    
    </div>
    );


}




export default Read;