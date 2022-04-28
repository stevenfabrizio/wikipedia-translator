import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stateFalse, stateTrue } from '../features/auth/authSlice';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const authStatus: boolean = useAppSelector(
    (state: { authBoolean: { value: any } }) => state.authBoolean.value
  );

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const ClickedSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      console.log(body);

      localStorage.setItem('enteredEmail', email);
      localStorage.setItem('enteredPassword', password);

      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.LoggedIn) {
        localStorage.setItem('enteredEmail', email);
        localStorage.setItem('enteredPassword', password);
        dispatch(stateTrue());

        // <Navigate to="/" replace />
        navigate('/')
        // <Navigate to="/dashboard" replace />;
        //toast success
      } else {
        dispatch(stateFalse());
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  React.useEffect(() => {
    console.log(authStatus)
    if(localStorage.getItem('LoggedInOrNot') === 'yes'){
      dispatch(stateTrue())
      console.log(authStatus)
      navigate('/');
    }

    // if(authStatus === true){
    //   navigate('/');
    // }
  }, []);

  return (
    <>
      <h1>register</h1>

      <form onSubmit={ClickedSubmit} className="register-form">
        <input
          type="email"
          name="email"
          placeholder="222@aol.com"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="usernamelol"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Login</Link>
      <div></div>
    </>
  );
};

export default Register;
