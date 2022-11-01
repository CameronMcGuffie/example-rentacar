import { useNavigation } from '../../Providers/Navigation/NavigationProvider';

import './CarDisplay.scss';

type CarProps = {
  id: number;
  model: string;
  year: number;
  description: string;
  image: string;
  price: number;
  hired: boolean;
  hired_by: any;
  created_by: number;
};

export default function CarDisplay({
  id,
  model,
  year,
  description,
  image,
  price,
  hired,
  hired_by,
  created_by,
}: CarProps) {
  let { currentPage, selectPage } = useNavigation();

  function openCar(id: number) {
    localStorage.setItem('car_id', id.toString());
    selectPage('car_info');
  }

  return (
    <div className='carDisplayContainer' onClick={() => openCar(id)}>
      <div className='carDisplayImage'>
        <img src={image} />
      </div>
      <div className='carDisplayModel'>{model}</div>
      <div className='carDisplayPrice'>${price} p/d</div>
    </div>
  );
}
