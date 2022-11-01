import { useState, useRef } from 'react';
import { useNavigation } from '../../Providers/Navigation/NavigationProvider';
import { useFetch } from '../../Providers/Fetch/FetchProvider';

import './ListCar.scss';

export default function ListCar() {
  let { currentPage, selectPage } = useNavigation();
  const [carDescription, setCarDescription] = useState('');

  const [currentError, setCurrentError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const carModelRef = useRef<HTMLInputElement>(null!);
  const carYearRef = useRef<HTMLInputElement>(null!);
  const imageURLRef = useRef<HTMLInputElement>(null!);
  const carPriceRef = useRef<HTMLInputElement>(null!);

  let { doPost } = useFetch();

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCarDescription(event.target.value);
  }

  async function listCar() {
    if (!carModelRef.current.value)
      return throwError('You must specify a car model');
    if (!carYearRef.current.value)
      return throwError('You must specify a car year');
    if (!imageURLRef.current.value)
      return throwError('You must specify an image URL');
    if (!carPriceRef.current.value)
      return throwError('You must specify a car price');
    if (!carDescription)
      return throwError('You must specify a car description');

    let result = await doPost('http://127.0.0.1:3000/api/v1/cars/', {
      model: carModelRef.current.value,
      year: carYearRef.current.value,
      description: carDescription,
      image: imageURLRef.current.value,
      price: carPriceRef.current.value,
      hired: false,
      hired_by: null,
    });

    console.log(result);

    if (result.message.includes('successfully')) {
      alert('Car listing created successfully');
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
    <div className='listCarContainer'>
      <div className='listCarContent'>
        <div className='pageHeader'>
          List your Car
          <button
            onClick={() => {
              selectPage('');
            }}
          >
            Go Back
          </button>
        </div>
        <div className='listCarView'>
          <div className='form'>
            <div className='formRow'>
              <div className='formRowHeader'>Car Model</div>
              <div className='formRowForm'>
                <input type='text' ref={carModelRef} />
              </div>
            </div>

            <div className='formRow'>
              <div className='formRowHeader'>Car Year</div>
              <div className='formRowForm'>
                <input type='number' placeholder='e.g. 2002' ref={carYearRef} />
              </div>
            </div>

            <div className='formRow'>
              <div className='formRowHeader'>Image URL</div>
              <div className='formRowForm'>
                <input
                  type='text'
                  placeholder='URL to an image'
                  ref={imageURLRef}
                />
              </div>
            </div>

            <div className='formRow'>
              <div className='formRowHeader'>Car Price per day</div>
              <div className='formRowForm'>
                <input type='number' placeholder='e.g. 33' ref={carPriceRef} />
              </div>
            </div>

            <div className='formRow'>
              <div className='formRowHeader'>Car Description</div>
              <div className='formRowForm'>
                <textarea onChange={handleTextareaChange}></textarea>
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
                <button onClick={() => listCar()}>Save Car</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
