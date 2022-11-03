import { useEffect, useState } from 'react';
import { useNavigation } from '../../Providers/Navigation/NavigationProvider';
import { useFetch } from '../../Providers/Fetch/FetchProvider';

import './CarInfo.scss';

export default function CarInfo() {
  const [carInfo, setCarInfo] = useState({
    id: 0,
    model: '',
    year: 0,
    description: '',
    image: '',
    price: 0,
    hired: false,
    hired_by: 0,
    created_by: 0,
  });
  let { currentPage, selectPage } = useNavigation();
  let { doGet } = useFetch();

  async function getCar() {
    let result = await doGet(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/cars/${localStorage.getItem(
        'car_id'
      )}`
    );

    setCarInfo(result);
  }

  useEffect(() => {
    getCar();
  }, []);

  return (
    <div className='carInfoContainer'>
      <div className='carInfoContent'>
        <div className='pageHeader'>
          Car Info
          <button
            onClick={() => {
              selectPage('');
            }}
          >
            Go Back
          </button>
        </div>

        <div className='carInfo'>
          <div className='carInfoImage'>
            <img src={carInfo.image} />
          </div>
          <div className='carInfoModel'>{carInfo.model}</div>
          <div className='carInfoPrice'>${carInfo.price} p/d</div>
          <div className='carInfoDescription'>{carInfo.description}</div>
        </div>
      </div>
    </div>
  );
}
