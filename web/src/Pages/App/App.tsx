import { useState, useEffect } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Gallery from '../Gallery/Gallery';
import ListCar from '../ListCar/ListCar';
import CarInfo from '../CarInfo/CarInfo';

import { useNavigation } from '../../Providers/Navigation/NavigationProvider';

import './App.scss';

export default function App() {
  let { currentPage, selectPage } = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);

  function checkLogin() {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function doLogout() {
    localStorage.removeItem('token');
    checkLogin();
  }

  useEffect(() => {
    checkLogin();
  }, []);

  function renderPage() {
    switch (currentPage) {
      case 'register':
        return <Register />;
      case 'login':
        return <Login checkLogin={checkLogin} />;
      case 'list_car':
        return <ListCar />;
      case 'car_info':
        return <CarInfo />;
      default:
        if (loggedIn) {
          return <Gallery />;
        } else {
          return <Login checkLogin={checkLogin} />;
        }
    }
  }

  return (
    <>
      <div className='pageBackground'></div>
      <div className='pageContainer'>
        <div className='topBanner'>
          <div className='bannerLeft'>
            <div className='pageHeading'>RentACar</div>
          </div>
          <div className='bannerMiddle'></div>
          <div className='bannerRight'>
            {loggedIn ? (
              <div className='bannerLink' onClick={() => doLogout()}>
                Logout
              </div>
            ) : (
              <>
                <div className='bannerLink' onClick={() => selectPage('')}>
                  Login
                </div>
                |
                <div
                  className='bannerLink'
                  onClick={() => selectPage('register')}
                >
                  Register
                </div>
              </>
            )}
          </div>
        </div>
        <div className='pageContent'>{renderPage()}</div>
      </div>
    </>
  );
}
