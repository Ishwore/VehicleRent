import './index.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
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

import Dashboard from './screen/Dashbord';
import Book from './screen/Book';
import Billing from './screen/Billing';
import WhyWithUs from './screen/WhyWithUs';
import Profile from './screen/Profile';
import ViewBooking from './screen/ViewBooking';
import UserBook from './screen/UserBook';
import ViewUserBookingDetails from './screen/UserBookingDetails';
import ForgetPassword from './screen/ForgetPassword';
import ChangePassword from './screen/ChangePassword'
import UpdateUser from './screen/UpdateUser';
import ViewUser from './screen/ViewUser';
// import KhaltiPaymentComponent from './screen/Khalti';

function App() {
  const auth = localStorage.getItem('user');

  return (
    <div className="text-center">
      <BrowserRouter>
        <Nav />
        {/* <Carousel className='mt-10' images={images} /> */}
        <Routes>
          <Route
            path='/'
            element={auth && (JSON.parse(auth).isAdmin) ? <Dashboard /> : <Home />}
            exact
          />
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Dashboard />} exact />
            <Route path='/userbookings' element={<UserBook />} />
            <Route path='/veiwuserbookingdetails/:id' element={<ViewUserBookingDetails />} />
            <Route path='/dashbord' element={<Dashboard />} exact />
            <Route path='/updatevehicle/:id' element={<UpdateVehicle />} />
            <Route path='/updateuser/:id' element={<UpdateUser />} />
            <Route path='/viewuser/:id' element={<ViewUser />} />
            <Route path='/addvehicle' element={<AddVehicle />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/vehiclelist' element={<VehicleList />} />
          </Route>
          {/* <Route exact path="/" element={auth ? ((JSON.parse(auth).isAdmin) ? <Dashbord /> : <Home />) : <Home />} /> */}
          {/* <Route path='/' element={<Home />} exact /> */}
          <Route path='/home' element={<Home />} exact />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/view/:id' element={<ViewVehicle />} />
          <Route path='/card' element={<CardList />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search/:key' element={<Home />} exact />
          {/* <Route path='/khalti' element={<KhaltiPaymentComponent />} /> */}
          <Route path='/whywithus' element={<WhyWithUs />} />
          <Route path='/veiwbookingdetails/:id' element={<ViewBooking />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/changepassword' element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
