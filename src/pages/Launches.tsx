import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import SingleCard from '../components/SingleCard';


const Launches = () => {
    const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('https://api.spacexdata.com/v3/launches');
        setLaunches(result.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }
  return (
    <div className='grid grid-cols-3 ml-10 gap-4 mt-10'>
      {launches.map((launch, index) => (
        <div key={index}>
            <SingleCard data={launch} />
        </div>
      ))}
    </div>
  )
}

export default Launches