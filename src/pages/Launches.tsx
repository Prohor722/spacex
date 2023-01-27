import { useState } from 'react';
import { Spin } from 'antd';
import SingleCard from '../components/SingleCard';
import { useGetAllLauncherQuery } from '../services/launchers'
import { Input } from 'antd';

const Launches = () => {
  const [searchData, setSearchData] = useState<string>("");
  const [ filterBy, setFilterBy ] = useState<string>("");
  const { data, error, isLoading } = useGetAllLauncherQuery([]);
  const { Search } = Input;

  if (isLoading) {
    return <Spin />;
  }

  const onSearch = (value: string) => setSearchData(value);

  const checkLastYear = (year:string):boolean =>{
    const thisYear:number =  new Date().getFullYear();
    return (thisYear-parseInt(year)===1);
  }

  const checkLastMonth = (data:{launch_date_local:string,launch_year:string}):boolean => {
    
    let thisMonth:number = new Date().getMonth()+1;
    const date =  new Date(data.launch_date_local);
    const dataMonth = date.getMonth()+1;

    return checkLastYear(data.launch_year) && ((thisMonth-dataMonth===1)? true : (thisMonth===1 && dataMonth===12))

  };


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
                <button onClick={()=>checkLastMonth(launch)}>Check Month</button>
                <SingleCard data={launch} />
            </div>}
          )
      }

    </div>
        
    </div>
  )
}

export default Launches