import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';

function Home(){



    return (

        <div>

            
       <Create/>
       <Read/>
       <Update/>

        <Delete/>


        </div>




    )
}