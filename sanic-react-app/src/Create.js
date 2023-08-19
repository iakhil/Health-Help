import React, {useState} from 'react';
import './App.css'
import axios from 'axios';

function Create() {

    
    return (

        <div className="create-form">
        <form action="/create" method="post">
           <input type="text" name="name" placeholder='Name' />
           <input type="description" name="descrption" placeholder='Description' />

           <button>Submit</button>
    </form>

    </div>
    )

}



export default Create;