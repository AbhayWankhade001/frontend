import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

export default function Form1() {
    const [bankaccnumber, setBankaccnumber] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [pannumber, setPanNumber] = useState("");
    const [accountholdername, setAccountholdername] = useState("");
    const [acctype, setAcctype] = useState("")
    const [bankname, setBankname] = useState("")
    const [branchname, setBranchname] = useState("")
    const [error, setError] = useState(null);
  
    const getToken = () => {
      // Check session storage for token
      const sessionToken = sessionStorage.getItem("auth-token");
      if (sessionToken) {
        console.log("Token found in session storage");
        return sessionToken;
      }
  
      // Check local storage for token
      const localToken = localStorage.getItem("auth-token");
      if (localToken) {
        console.log("Token found in local storage");
        return localToken;
      }
  
      // Check cookies for token
      const Token = getCookie("token");
      if (Token) {
        console.log("Token found in cookie", Token);
        return Token;
      }
  
      console.log("No token found");
      return null;
    };
  
    const navigate = useNavigate();

    const getCookie = (name) => {
      const cookieValue = document.cookie.match(
        "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
      );
      return cookieValue ? cookieValue.pop() : null;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const token = getCookie("token");
      console.log("Token:", token);
    
      if (!token) {
        setError("No authorization token provided");
        return;
      }
    
      try {
        const response = await fetch("https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/addbankdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bankaccnumber,
            ifsc,
            accountholdername,
            pannumber,
            mobilenumber,
            acctype,
            bankname,
            branchname
             
            
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to add or update user data");
        }
    
        setBankaccnumber("");
        setIfsc("");
        setMobileNumber("");
        setPanNumber("");
        setAccountholdername("");
        setAcctype("");
        setBankname("");
        setBranchname("");
        setError(null);
    
        console.log("User data added or updated successfully");
        navigate("/Menu")
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    
  
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Data Form</h1>
        {error && (
          <div className="bg-red-100 text-red-700 py-2 px-4 mb-4 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bankAcc" className="block font-medium mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              id="accountholdername"
              value={accountholdername}
              required
              onChange={(event) => setAccountholdername(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ifsc" className="block font-medium mb-2">Mobile Number</label>
            <input
              type="text"
              id="mobilenumber"
              value={mobilenumber}
              required
              onChange={(event) => setMobileNumber(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="acctype" className="block font-medium mb-2">
              Account Type
            </label>
            <input
              type="text"
              id="acctype"
              value={acctype}
              required
              onChange={(event) => setAcctype(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="panNumber" className="block font-medium mb-2">
              PAN Number
            </label>
            <input
              type="text"
              id="panNumber"
              value={pannumber}
              required
              onChange={(event) => setPanNumber(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bankname" className="block font-medium mb-2">
              Bank Name
            </label>
            <textarea
              id="bankname"
              value={bankname}
              required
              onChange={(event) => setBankname(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="branchname" className="block font-medium mb-2">
              Branch Name
            </label>
            <input
              type="text"
              id="branchname"
              value={branchname}
              required
              onChange={(event) => setBranchname(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bankaccnumber" className="block font-medium mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankaccnumber"
              value={bankaccnumber}
              required
              onChange={(event) => setBankaccnumber(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ifsc" className="block font-medium mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              id="ifsc"
              value={ifsc}
              required
              onChange={(event) => setIfsc(event.target.value)}
              className="border-gray-400 border-2 px-4 py-2 w-full rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
  