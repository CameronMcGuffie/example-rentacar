import { useState, useEffect } from 'react';

import CarDisplay from '../../Components/CarDisplay/CarDisplay';
import { useFetch } from '../../Providers/Fetch/FetchProvider';
import { useNavigation } from '../../Providers/Navigation/NavigationProvider';

import './Gallery.scss';

export default function Gallery() {
  let { currentPage, selectPage } = useNavigation();
  const [carData, setCarData] = useState([]);
  let { doGet } = useFetch();

  function parseCar(car: any) {
    if (car) {
      return (
        <CarDisplay
          id={car.id}
          model={car.model}
          year={car.year}
          description={car.description}
          image={car.image}
          price={car.price}
          hired={car.hired}
          hired_by={car.hired_by}
          created_by={car.created_by}
        />
      );
    }
  }

  async function updateCars() {
    let result = await doGet(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/cars/`
    );
    setCarData(result);
  }

  useEffect(() => {
    updateCars();
  }, []);

  return (
    <div className='galleryContainer'>
      <div className='galleryContent'>
        <div className='pageHeader'>
          Car Gallery{' '}
          <button
            onClick={() => {
              selectPage('list_car');
            }}
          >
            List your Car
          </button>
        </div>
        <div className='galleryView'>
          {carData.map((car, index) => {
            return parseCar(car);
          })}
        </div>
      </div>
    </div>
  );
}
