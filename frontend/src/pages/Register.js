import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../assets/css/Register.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [state, setRegister] = useState({
    'name': '',
    'email': '',
    'password': '',
    'error': [],
  });
 
  const navigate = useNavigate();

  const handleInput = (e) => {
    setRegister({...state, [e.target.name] : e.target.value});
  }

  const data = {
    'name' : state.name,
    'email' : state.email,
    'password' : state.password,
  }

  const submitRegister = (e) => {
    e.preventDefault();
     axios.get("/sanctum/csrf-cookie").then((response) => {
       axios.post("/api/register", data)
            .then(res => {
              if(res.data.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('token_name', res.data.token_name)
                console.log(res.data.message)
                console.log(res.data.token);
                console.log(res.data.token_name);
                navigate('/');
              }else {
                setRegister({ ...state, error: res.data.validation_errors });
              }
            })
     });
  }


    return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Register</h2>
              <hr className="main-hr" />
              <form onSubmit={submitRegister}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInput}
                    value={state.name}
                  />
                  <span className="red-color">{state.error.name}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleInput}
                    value={state.email}
                  />
                  <span className="red-color">{state.error.email}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleInput}
                    value={state.password}
                  />
                  <span className="red-color">{state.error.password}</span>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;