import { useRef, useState } from 'react';
import { useFetch } from '../../Providers/Fetch/FetchProvider';

import './Login.scss';

type LoginProps = {
  checkLogin: () => void;
};

export default function Login({ checkLogin }: LoginProps) {
  const [errorVisible, setErrorVisible] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  let { doPost } = useFetch();

  async function doLogin() {
    let result = await doPost('http://127.0.0.1:3000/api/v1/auth/login', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (result && result.token) {
      localStorage.setItem('token', result.token);
    } else {
      localStorage.removeItem('token');

      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 2000);
    }

    checkLogin();
  }

  return (
    <div className='loginContainer'>
      <div className='loginBox'>
        <div className='loginHeader'>Login</div>
        <div className='form'>
          <div className='formRow'>
            <div className='formRowHeader'>Email</div>
            <div className='formRowForm'>
              <input type='email' ref={emailRef} />
            </div>
          </div>

          <div className='formRow'>
            <div className='formRowHeader'>Password</div>
            <div className='formRowForm'>
              <input type='password' ref={passwordRef} />
            </div>
          </div>

          {errorVisible ? (
            <div className='formRow'>
              <div className='formError'>Incorrect username or password</div>
            </div>
          ) : (
            ''
          )}

          <div className='formRow'>
            <div className='formRowButton'>
              <button onClick={() => doLogin()}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
