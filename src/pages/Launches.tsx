import { useState } from 'react';
import { Spin } from 'antd';
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
  launch_date_local: string;
  launch_success: boolean;
  links: {
      mission_patch_small: string;
      mission_name: string;
  };
};

const Launches = () => {
  const [searchData, setSearchData] = useState<string>("");
  const [ filterData, setFilterData] = useState({status:false, type:""})
  const { data, error, isLoading } = useGetAllLauncherQuery([]);
  const { Search } = Input;

  if (isLoading) {
    return <Spin />;
  }

  const onSearch = (value: string) => {
    setSearchData(value);
    setFilterData({status:false, type:""})
  };

  const checkLastYear = (year:string):boolean =>{
    const thisYear:number =  new Date().getFullYear();
    return (thisYear-parseInt(year)===1);
  }

  const checkLastMonth = (data:{launch_date_local:string,launch_year:string}):boolean => {
    
    let thisMonth:number = new Date().getMonth()+1;
    const date =  new Date(data.launch_date_local);
    const dataMonth = date.getMonth()+1;

    return  ((thisMonth-dataMonth===1)? true : (thisMonth===1 && dataMonth===12) && checkLastYear(data.launch_year))

  };

  const filterDataByYear = () =>{
    setSearchData("");
    setFilterData({status:true,type:'byYear'});
  }
  const filterDataByMonth = () =>{
    setSearchData("");
    setFilterData({status:true,type:"byMonth"});
  }
  const filterLaunchStatus = () =>{
    setSearchData("");
    setFilterData({status:true,type:"byLaunchStatus"});
  }

  const filteredData = ():any =>{
    
    if(filterData.type==="byYear"){
      const values = data?.filter(d=>checkLastYear(d.launch_year));
      return values;
    }
    else if(filterData.type==="byMonth"){
      const values = data?.filter(d=>checkLastMonth(d));
      return values;
    }
    else if(filterData.type==="byLaunchStatus"){
      const values = data?.filter(d=>d.launch_success);
      return values;
    }

  }


  return (
    <div className='ml-10 mt-10'>
      <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}/>
      <button className='bg-yellow-200 mt-20' onClick={filterDataByYear}>Last Year</button>
      <button className='bg-yellow-200 mt-20' onClick={filterDataByMonth}>Last Month</button>
      <button className='bg-green-400 mt-20' onClick={filterLaunchStatus}>Launch Successfull</button>



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

        (filterData.status===true)?
          (filteredData() && filteredData()[0] && filteredData()[0].flight_number)? 
          filteredData().map((launch:Launchers,index:number)=><SingleCard data={launch} key={index}/>)
          :
          <p>No Data Found!!</p>
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