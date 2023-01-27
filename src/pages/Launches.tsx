import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import SingleCard from '../components/SingleCard';
import { useGetAllLauncherQuery } from '../services/launchers'
import { Input } from 'antd';


type Launchers ={
    flight_number: number;
    rocket: {
        rocket_name: string;
    };
    mission_name: string;
    launch_year: string;
    launch_success: boolean;
    links: {
        mission_patch_small: string;
        mission_name: string;
    };
  };
type singleLauncher = {
    links:{
        mission_patch:string,
        mission_patch_small:string
        }
}

const Launches = () => {
  const [launches, setLaunches] = useState<Launchers[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error, isLoading } = useGetAllLauncherQuery([]);
  const { Search } = Input;

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

  const onSearch = (value: string) => setSearchData(value);


  return (
    <div className='ml-10 mt-10'>
      <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}/>

    <div className='grid grid-cols-3 gap-4 mt-10'>
      {
        (searchData)? 
            launches.filter(items=>
            items.rocket.rocket_name.toLowerCase().includes(searchData.toLowerCase())).map((item,index)=>
            <SingleCard data={item} key={index}/>
            )
        :
          
        data && data.map((launch,index:number)=>
          {return <div key={index}>
                <SingleCard data={launch} />
            </div>}
          )
      }

    </div>
        
    </div>
  )
}

export default Launches