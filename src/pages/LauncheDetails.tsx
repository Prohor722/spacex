import {useParams} from 'react-router-dom';
import { Image, Space, Spin } from 'antd';
import { useGetLauncherQuery } from "../services/launchers";


const LauncheDetails = () => {

  const { id } = useParams();
  const { data, error, isLoading } = useGetLauncherQuery(`${id}`);

  const date = new Date();
  console.log(date);

    const check = (d:any) =>{
        const test = <img src={d} />;
        console.log( test);
    }

    if (isLoading) {
        return <Spin />;
      }
    
  return (
    <>
    {(error)?
        <p>SomeThing wen worng</p>
        :
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
        
    }

    </>
  )
}

export default LauncheDetails