import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [state, setLogin] = useState({
        'email' : '',
        'password' : '',
    });

    const loginHandle = (e) => {
      setLogin({ ...state, [e.target.name]: e.target.value });
    };

    const data = {
        'email' : state.email,
        'password' : state.password,
    }

    const loginSubmit = (e) => {
       e.preventDefault();
       axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post('/api/login', data)
             .then(res=>{
                if(res.data.status === 200){
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('token_name', res.data.token_name);
                    navigate('/');
                } else {
                  console.log('Email and Password Wrong!!!!!')
                }
                
             })
       });
    }
    return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Login</h2>
              <hr className="main-hr" />
              <form onSubmit={loginSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={loginHandle}
                    value={state.email}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={loginHandle}
                    value={state.password}
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;