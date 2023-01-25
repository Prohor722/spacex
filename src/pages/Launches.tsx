import React, { useState, useEffect } from 'react';
import { Card, Spin, Button } from 'antd';
import axios from 'axios';

interface Launch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_success: boolean;
  links : {mission_patch_small:string}
}

const Launches = () => {
    const [launches, setLaunches] = useState<Launch[]>([]);
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
    <div className='grid grid-cols-3 gap-12 mt-10'>
      {launches.map((launch) => (
        <Card title="Default size card" extra={<img src={launch.links.mission_patch_small} alt="logo"/>} style={{ width: 300 }}>
          <p>Launch Year: {launch.launch_year}</p>
          <p>
            Launch Success:
            {launch.launch_success ? 'Yes' : 'No'}
          </p>
          <Button>See Details</Button>
      </Card>
      ))}
    </div>
  )
}

export default Launches