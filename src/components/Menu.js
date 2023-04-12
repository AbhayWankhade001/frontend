import React, { useState } from "react";
import "./Menu.css"
import Template from "./Template";
import {useNavigate} from "react-router-dom";


export default function Menu() {

   const [isOpen, setIsOpen] = useState(false);
   
   const navigate = useNavigate();

  const navigateToTemplate = () => {
    // 👇️ navigate to /contacts
    navigate('/Template');
  };

  return (
    <div>
      <div className="sidenav">
    
        
          <a href="#" className="active ">Home</a>
        
         
       
          <a href="#">Create</a>
        
          <a href="#">Profile</a>
        
    </div>

      <div className="content">
        <h2>Invoice Generator</h2>
        <br/>
        <p>
          This application will let you download the invoice on the click of button.
        </p>
      
        <button className="btn btn-success p-3" onClick={navigateToTemplate} >Preview the Invoice</button>
      </div>
      
    </div>
  )
}
