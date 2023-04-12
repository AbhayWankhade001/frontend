import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

function UserDetails() {
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


   

  const deleteToken = () => {
    Cookies.remove('token');
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  }


  const navigate = useNavigate();
  
  const handleLogout = () => {
    deleteToken();
    // additional code to redirect the user to the login page or to update the UI
    navigate("/AdminSignIn", {replace: true});
  }

  const handleDelete = (id) => {

    console.log(id)
    // Get token from cookie
    const token = document.cookie.split('=')[1];

    // Delete employee using API
    fetch(`https://backend-server-14.vercel.app/api/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error(error));
  };


  useEffect(() => {
    // Get token from cookie
    const token = document.cookie.split('=')[1];
    setIsLoading(true);

    // Fetch data from API
    fetch('https://backend-server-14.vercel.app/api/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setEmployees(data));
      setIsLoading(false);
  }, []);


    return (
      <div>
      <header role="banner">
        <h1>Admin Panel</h1>
        <ul className="utilities">
         {/*  <li className="users"><a href="#">My Account</a></li> */}
          <li className="logout-icon">
          <a onClick={handleLogout} className='btn-logout'>Log Out</a>

        </li>
        </ul>
      </header>
      <nav role="navigation">
        <ul className="main">
          <li className="dashboard"><Link to='/Dashboard'>Dashboard</Link></li>
          <li className="users"><Link to="/Manageuser">Manage Users</Link></li>
          <li className="user_details"><a href="#">User Details</a></li>
          <li className="edit"><Link to='/Template'>Create Invoice</Link></li>
          
         


        </ul>
      </nav>
      <main role='main'>


      <section className="panel important">
          <h2>Bank Details of the Employee </h2>
        
        </section>
        <section className="panel important ">
          <h2>Employee Table</h2>
          {isLoading ? (
      <ClipLoader />
    ) : (
          <table>
  <thead>
  
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>email</th>
      <th>Account Holder name</th>
      <th>Bank Account Number</th>
      <th>Mobile Number</th>
      <th>Account type</th>
      <th>Bank Name</th>
      <th>Branch Name</th>
      <th>IFSC Code</th>
      <th>Pan Number</th>
     
    </tr>
  </thead>
  <tbody>
    {employees.map((employee, index) => (
      <tr key={index}>
           <td>{employee.employee.firstName}</td>
        <td>{employee.employee.lastName}</td>
        <td>{employee.employee.email}</td>
        <td>{employee.bankDetails ? employee.bankDetails.accountholdername : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.bankaccnumber : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.mobilenumber : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.acctype : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.bankname : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.branchname : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.ifsc : '-'}</td>
        <td>{employee.bankDetails ? employee.bankDetails.pannumber : '-'}</td>
      </tr>
    ))}
  </tbody>
</table>
    )
    }
        </section>
      </main>
  </div>
    );
  }
  
export default UserDetails;
