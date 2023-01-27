import { useState } from 'react';
import { Spin } from 'antd';
import SingleCard from '../components/SingleCard';
import { useGetAllLauncherQuery } from '../services/launchers'
import { Input } from 'antd';

const Launches = () => {
  const [searchData, setSearchData] = useState<string>("");
  const { data, error, isLoading } = useGetAllLauncherQuery([]);
  const { Search } = Input;

  if (isLoading) {
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
        error?

        <p>Some this went wrong!!</p>
        
        :

        (searchData)? 
            data && data.filter(items=>
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