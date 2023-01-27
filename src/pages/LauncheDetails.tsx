import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { Image, Space } from 'antd';

type Data = {
    links:{
        mission_patch:string,
        mission_patch_small:string
        }
}

const LauncheDetails = () => {
    const [ data, setData ] = useState<Data>();
    const { id } = useParams();

    useEffect(()=>{
        fetch(`https://api.spacexdata.com/v3/launches/2${id}`)
        .then(res=>res.json())
        .then(d=>setData(d))
    },[]);

    const check = (d:any) =>{
        const test = <img src={d} />;
        console.log( test);
    }
  return (
    <div>
        <Space size={12}>
      <Image
        width={200}
        src={data?.links?.mission_patch_small}
        placeholder={
          <Image
            preview={false}
            src={data?.links?.mission_patch}
            width={200}
          />
        }
      />
    </Space>

        <button onClick={()=>check(data?.links?.mission_patch_small)}>Click to check</button>
    </div>
  )
}

export default LauncheDetails