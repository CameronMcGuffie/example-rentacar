import { useRef, useState } from 'react';

import { useNavigation } from '../../Providers/Navigation/NavigationProvider';
import { useFetch } from '../../Providers/Fetch/FetchProvider';

import './Register.scss';

export default function Register() {
  let { selectPage } = useNavigation();

  const [currentError, setCurrentError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordConfirmRef = useRef<HTMLInputElement>(null!);

  let { doPost } = useFetch();

  async function registerUser() {
    if (!nameRef.current.value) return throwError('You must specify a name');
    if (!emailRef.current.value) return throwError('You must specify an email');
    if (!passwordRef.current.value)
      return throwError('You must specify a password');
    if (passwordRef.current.value != passwordConfirmRef.current.value)
      return throwError('Passwords do not match');

    let result = await doPost(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/register`,
      {
        name: nameRef.current.value,
        email: emailRef.current.value,
        username: emailRef.current.value,
        password: passwordRef.current.value,
      }
    );

    if (result.message.includes('exists')) {
      return throwError('A user with that email already exists');
    } else if (result.message.includes('successfully')) {
      alert('User created successfully, please login now');
      localStorage.removeItem('token');
      selectPage('');
    } else {
      return throwError('An unknown error occured');
    }
  }

  function throwError(error: string) {
    setCurrentError(error);
    setErrorVisible(true);
    setTimeout(() => setErrorVisible(false), 2000);
    return null;
  }

  return (
    <div className='registerContainer'>
      <div className='registerContent'>
        <div className='registerHeader'>Register to use RentACar</div>
        <div className='registerBox'>
          <div className='form'>
            <div className='formRow'>
              <div className='formRowHeader'>Your Name</div>
              <div className='formRowForm'>
                <input type='text' ref={nameRef} />
              </div>
            </div>
            <div className='formRow'>
              <div className='formRowHeader'>Your Email</div>
              <div className='formRowForm'>
                <input type='email' ref={emailRef} />
              </div>
            </div>

            <br />

            <div className='formRow'>
              <div className='formRowHeader'>Choose a Password</div>
              <div className='formRowForm'>
                <input type='password' ref={passwordRef} />
              </div>
            </div>

            <div className='formRow'>
              <div className='formRowHeader'>Repeat the Password</div>
              <div className='formRowForm'>
                <input type='password' ref={passwordConfirmRef} />
              </div>
            </div>

            {errorVisible ? (
              <div className='formRow'>
                <div className='formError'>{currentError}</div>
              </div>
            ) : (
              ''
            )}

            <div className='formRow'>
              <div className='formRowButton'>
                <button onClick={() => registerUser()}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
