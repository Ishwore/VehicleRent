import './index.css';
import Nav from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer';
import PrivateComponent from './components/PrivateComponent';
import AboutUs from './screen/AboutUs';
import SignUp from './screen/SignUp';
import Login from './screen/Login';
import AddVehicle from './screen/Vehicle';
import ContactUs from './screen/ContactUs';
import UserList from './screen/UserList';
import VehicleList from './screen/VehicleList';
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/addvehicle' element={<AddVehicle />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/vehiclelist' element={<VehicleList />} />
          </Route>
          <Route path='/' element={<h1>Product Listing Componet</h1>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/aboutus' element={<AboutUs />} />

          <Route path='/contactus' element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
