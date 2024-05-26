import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Page/Home/Home';
import Signup from './Page/LoginSignup/Signup';
import Login from './Page/LoginSignup/Login';
import ForgotPassword from './Page/LoginSignup/Forgotpassword';
import LandingPage from './Page/LandingPage/LandingPage';
import CreatePost from './Component/BlogList/CreatePost';
import { useEffect } from 'react';
import { auth } from './Component/FirebaseConfig/firebaseConfig';
import EditProfile from './Page/EditProfile/EditProfile';
import UserProfile from './Page/EditProfile/UserProfile';

function App() {
  useEffect(
    () => {
      if (!auth.currentUser){
        localStorage.removeItem('isAuth');
      }
    },[]
  )
  return (
    <Routes>
      <Route path='/' element={ <LandingPage /> }/>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/home/createpost' element={<CreatePost />}/>
      <Route path='/home/edit-profile' element={<EditProfile />} />
      <Route path='/users/:userId' element={< UserProfile/>}/>
      <Route path='/signup' element={<Signup/>} />
    </Routes>
  );
}

export default App;
