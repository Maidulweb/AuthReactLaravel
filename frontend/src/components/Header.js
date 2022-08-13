import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logout = (e) => {
   e.preventDefault();
   axios.post('/api/logout')
        .then (res => {
          if(res.data.status === 200){
            localStorage.clear();
            console.log(res.data.success)
            navigate('/login')
          }
        })
  }
  var token_name = '';
  if(localStorage.getItem('token')){
     token_name = (
       <>
         <li className="nav-item">
           <button type='button' className="nav-link" onClick={logout}>
             Logout
           </button>
         </li>
       </>
     );
  }else {
    token_name = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </>
    );
    
  }
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Logo
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                {token_name}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Header;