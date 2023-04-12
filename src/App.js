import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Menu from './components/Menu';
import Form from './components/Form';
import Form1 from './components/Form1';
import Template from './components/Template';
import Dashboard from './admin/Dashboard';
import Manageuser from './admin/Manageuser';
import Table from './admin/Table';
import AdminSignUp from './admin/adminSignUp';
import Download from './components/Download';
import Otp from './admin/Otp';
import AdminSignIn from './admin/adminSignIn';
import UserDashboard from './components/UserDashboard';
import Profile from './components/Profile';
import UserDetails from './admin/UserDetails';
import ParentComponent from './admin/ParentComponent';
import Password from './components/password';
import Storage from './components/storage';
import Upload from './components/Upload';
import UploadInvoice from './components/Temtrial';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';
import ForgetPassword from './components/forgotPassword';


function App() {
  return (
    <Router>
    <div className="App">

    <Routes>
    <Route exact path='/' element={< SignIn />}></Route>
    <Route exact path='/Signin' element={<SignIn/>}></Route>
    <Route exact path='/AdminSignin' element={<AdminSignIn/>}></Route>
    <Route exact path='/Signup' element={<SignUp/>}></Route>
    <Route exact path='/Menu' element={<Menu/>}></Route>
    <Route exact path='/Storage' element={<Storage/>}></Route>
    <Route exact path='/Table' element={<Table/>}></Route>
    <Route exact path='/AdminSignUp' element={<AdminSignUp/>}></Route>
    <Route exact path='/Template' element={<Template/>}></Route>
    <Route exact path='/Form' element={<Form/>}></Route>
    <Route exact path='/Otp' element={<Otp/>}></Route>
    <Route exact path='/ParentComponent' element={<ParentComponent/>}></Route>
    <Route exact path='/Profile' element={<Profile/>}></Route>
    <Route exact path='/Dashboard' element={<Dashboard/>}></Route>
    <Route exact path='/UserDashboard' element={<UserDashboard/>}></Route>
    <Route exact path='/Manageuser' element={<Manageuser/>}></Route>
    <Route exact path='/UserDetails' element={<UserDetails/>}></Route>
    <Route exact path='/Password' element={<Password/>}></Route>
    <Route exact path='/Upload' element={<Upload/>}></Route>
    <Route exact path='/Download' element={<Download/>}></Route>
    <Route exact path='/UploadInvoice' element={<UploadInvoice/>}></Route>
    <Route exact path='/ForgetPassword' element={<ForgetPassword/>}></Route>

</Routes>    
    </div>
    </Router>
  );
}

export default App;
