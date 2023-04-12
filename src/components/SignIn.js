import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Logo from "../components/img/logo.jpeg"
import ClipLoader from 'react-spinners/ClipLoader';


function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    setIsLoading(true);

    // Send POST request to API to login user
    const response = await fetch('http://localhost:8080/api/employeeslogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    setIsLoading(false);

    // Handle response from API
    const result = await response.json();
    

    // Check if login was successful
    if (response.ok) {
      const token = result.token;
      /* localStorage.setItem("token", token);
      sessionStorage.setItem("token", token); */
      document.cookie = `token=${token}; path=/;`;
      navigate("/UserDashboard");

    } else {
      setError(result.message);
    }
  };
  
  


  

  return (
    
    <div className="container contact-form rounded-lg relative top-20
    ">
    <div className="flex justify-center">
      <img className='h-32 w-32'
        src={Logo}
        alt="rocket_contact"
      />
    </div>
    {isLoading ? (
        <ClipLoader />
      ) : (
    <form onSubmit={handleLogin}>
    {error && <p>{error}</p>}
      <h2>Sign In </h2>
      <p className="text-center">Sign In to generate Invoices.</p>
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              className="form-control"
              placeholder="Your Email *"
              value={formData.email} onChange={handleInputChange}
            />
          </div>
          
              
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
              className="form-control"
              placeholder="Password *"
              value={formData.password} onChange={handleInputChange}
            />
          </div>          
          <div className="text-center">
            <button className="btn btn-primary mt-3 pb-2" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
      )
    }
  </div>
 
  )
}

export default SignIn
