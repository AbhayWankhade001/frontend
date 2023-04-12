import React,{useState, useEffect} from 'react'
import "./Dashboard.css"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Popup from './Popup';
import "./popup.css"


export default function Manageuser() {
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


   const togglePopup = () => {
    setShowPopup(!showPopup);
  };


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
    fetch(`http://localhost:8080/api/employees/${id}/inactive`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
        console.log(id.status)
      })
      .catch(error => console.error(error));
  };

  const handleactive = (id) => {

    console.log(id)
    // Get token from cookie
    const token = document.cookie.split('=')[1];

    // Delete employee using API
    fetch(`http://localhost:8080/api/employees/${id}/active`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
        console.log(id)
         console.log(employees.employee.status)
      })
      .catch(error => console.error(error));
  };
  
  const showStatus = () => {
    // Get token from cookie
    const token = document.cookie.split('=')[1];
  
    // Retrieve all employees data using API
    fetch('http://localhost:8080/api/employees', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json()) // Parse response data to JSON
      .then(employeesData => {
        // Iterate over employee data and update status in HTML
        employeesData.forEach(employeeData => {
          const id = employeeData.id;
          const status = employeeData.status;
  console.log(employeeData.status);
          // Update the HTML element with the status value
          const statusElement = document.getElementById(`status-${id}`);
          if (statusElement) {
            statusElement.textContent = status;
          }
        });
      })
      .catch(error => console.error(error));
  };
  
  const handleConfirm = (id) =>{

    console.log(id)
  }

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
            <li className="user_details"><Link to="/UserDetails">User Details</Link></li>
            <li className="edit"><Link to='/Template'>Create Invoice</Link></li>
            
           


          </ul>
        </nav>
        <main role='main'>


        <section className="panel important">
            <h2>Managing Employees </h2>
            <ul>
              <li>Here you can add, edit and delete the details of the employees.</li>
            {/*   <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
            </ul>
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
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee, index) => (
        <tr key={index}>
          <td><p>{employee.employee.firstName}</p></td>
          <td>{employee.employee.lastName}</td>
          <td>{employee.employee.email}</td>
          <td><i class="fa fa-trash" aria-hidden="true" onClick={togglePopup}>
            <Popup handleClose = {togglePopup}
            show = {showPopup}>

              <h1>Want to Delete this employee?</h1>
              <span><button className="btn btn-danger pb-2" onClick={() => handleDelete(employee.employee._id)}>inactive</button></span>
              <span><button className="btn btn-danger pb-2" onClick={() => handleactive(employee.employee._id)}>active</button></span>

            </Popup>
          </i></td>
          <td>{employee.employee.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
      )
      }
          </section>
        </main>
    </div>
  )
}
