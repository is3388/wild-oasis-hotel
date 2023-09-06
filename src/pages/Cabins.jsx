import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { useEffect } from 'react';

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
      <p>TEST</p>
      <img
        src='https://gtgrzfuqtpxirkvcvxrn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg'
        alt='cabin-1'
      />
    </Row>
  );
}

export default Cabins;
