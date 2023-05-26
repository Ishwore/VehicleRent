
//import './App.css';
import './index.css';
import Nav from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/footer';
import SignUp from './screen/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './screen/Login';
function App() {
  return (
    <div class="text-center">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/addvehicle' element={<h1>About AddVehicle Page</h1>} />
            <Route path='/addcategory' element={<h1>About AddCategory</h1>} />
          </Route>
          <Route path='/aboutus' element={<h1>About pages</h1>} />
          <Route path='/contact' element={<h1>Contactus page</h1>} />
          <Route path='/' element={<h1>Product Listing Componet</h1>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
