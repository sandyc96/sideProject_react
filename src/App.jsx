import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import MyHeader from './component/nav/MyHeader';
import MyFooter from './component/MyFooter';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import Account from './pages/Account';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './PrivateRoute';
import GlobalProvider from './GlobalProvider';
import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <>
      <BrowserRouter basename='/sideProject_react'>
        <ScrollToTop />
        <GlobalProvider>
          <header>
            <MyHeader />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new_in' element={<ProductList />} />
              <Route path='/new_in/:pId' element={<ProductPage />} />
              <Route
                path='/account'
                element={
                  <PrivateRoute>
                    <Account user={user} onLogout={handleLogout} />
                  </PrivateRoute>
                }
              />
              <Route path='/sign_up' element={<SignUp />} />
              <Route
                path='/login'
                element={<SignIn onLoginSuccess={setUser} />}
              />
              <Route path='/cart' element={<CheckoutPage />} />
              <Route
                path='*'
                element={
                  <h1
                    style={{
                      paddingLeft: '3rem',
                      paddingTop: '0.5vh',
                      marginBottom: 800,
                    }}
                  >
                    NotFound
                  </h1>
                }
              />
            </Routes>
          </main>
          <footer>
            <MyFooter />
          </footer>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
