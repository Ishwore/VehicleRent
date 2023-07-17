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
import Home from './screen/HomePage';
import UpdateVehicle from './screen/UpdateVehicle';
import ViewVehicle from './screen/ViewVehicle';
import CardList from './screen/CardList';
// import UserComponent from './components/UserComponent';
import Dashbord from './screen/Dashbord';
import Book from './screen/Book';
function App() {
  // const auth = localStorage.getItem('user');
  return (
    <div className="text-center">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/dashbord" element={<Dashbord />} exact />
            <Route path='/updatevehicle/:id' element={<UpdateVehicle />} />
            <Route path='/addvehicle' element={<AddVehicle />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/vehiclelist' element={<VehicleList />} />
          </Route>
          {/* <Route exact path="/" element={auth ? ((JSON.parse(auth).isAdmin) ? <Dashbord /> : <Home />) : <Home />} /> */}
          <Route path='/' element={<Home />} exact />
          <Route path='/home' element={<Home />} exact />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/view/:id' element={<ViewVehicle />} />
          <Route path='/card' element={<CardList />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
