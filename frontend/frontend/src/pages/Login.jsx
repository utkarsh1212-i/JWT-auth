import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useState, useEffect } from "react";
// import { FaUser } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../Components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      //if user is already loggedin(user check)
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { 
      email,  
      password
    }

    dispatch(login(userData))
  };
  if(isLoading){
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start setting Goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group my-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Your password"
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-block ">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
