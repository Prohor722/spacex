import {useParams, Link} from 'react-router-dom';
import { Button, Col, Image, Row, Space, Spin, Tag } from 'antd';
import { useGetLauncherQuery } from "../services/launchers";
import {
    GoogleOutlined,
    GlobalOutlined,
    PlayCircleOutlined,
  } from '@ant-design/icons';

const LauncheDetails = () => {

  const { id } = useParams();
  const { data, error, isLoading } = useGetLauncherQuery(`${id}`);

  console.log(data);

    if (isLoading) {
        return <Spin className='mt-80'/>;
      }
    
  return (
    <>
    {(error)?
        <p>SomeThing wen worng</p>
        :

        <Row className="mt-36">
            <Col span={5}>
            </Col>
            <Col span={6} className="mt-10">
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
            </Col>
            <Col span={8}>
                <div>
                    <p className='text-xl font-semibold'>Mission Name: {data?.mission_name}</p>
                    <p>Flight Number: {data?.flight_number}</p>
                    <p>Rocket ID: {data?.rocket.rocket_id}</p>
                    <p>Rocket Name: {data?.rocket.rocket_name}</p>
                    <p>Rocket Type: {data?.rocket.rocket_type}</p>
                    <p>Launch Date (local): {data?.launch_date_local}</p>
                    <p>Launch Failure Reason: {data?.launch_failure_details.reason}</p>
                    <p>Launch Site:
                        <ul>
                            <li>ID: {data?.launch_site.site_id}</li>
                            <li>Name: {data?.launch_site.site_name}</li>
                            <li>Full Name: {data?.launch_site.site_name_long}</li>
                        </ul>                     
                    </p>
                    <p>Launch Success: {data?.launch_success? "Successful" : "Failed"}</p>
                    <div>
                        <a className='mr-6' href={`${data?.links.article_link}` } rel="noreferrer" target="_blank"><GlobalOutlined /> Blog</a>
                        <a className='mr-6' href={`${data?.links.video_link}` } rel="noreferrer" target="_blank"><PlayCircleOutlined /> Video</a>
                        <a href={`${data?.links.wikipedia}` } rel="noreferrer" target="_blank"><GoogleOutlined /> Wikipedia</a>
                    </div>
                    
                    <Button className='mt-6 px-10'>
                        <Link to="/">Back</Link>
                    </Button>
                </div>
            </Col>
        </Row>
        // <div className='grid grid-cols-2 m-10'>
        //     <div className='mt-20'>
        //         <Space size={12}>
        //             <Image
        //                 width={200}
        //                 src={data?.links?.mission_patch_small}
        //                 placeholder={
        //                 <Image
        //                     preview={false}
        //                     src={data?.links?.mission_patch}
        //                     width={200}
        //                 />
        //                 }
        //             />
        //         </Space>
        //     </div>

        //     <div className='mt-20'>
        //         <p>Flight Number: {data?.flight_number}</p>
        //         <p>Mission Name: {data?.mission_name}</p>
        //         <p>Rocket ID: {data?.rocket.rocket_id}</p>
        //         <p>Rocket Name: {data?.rocket.rocket_name}</p>
        //         <p>Rocket Type: {data?.rocket.rocket_type}</p>
        //         <p>Launch Date (local): {data?.launch_date_local}</p>
        //         <p>Launch Failure Reason: {data?.launch_failure_details.reason}</p>
        //         <p>Launch Site:
        //             <ul>
        //                 <li>ID: {data?.launch_site.site_id}</li>
        //                 <li>Name: {data?.launch_site.site_name}</li>
        //                 <li>Full Name: {data?.launch_site.site_name_long}</li>
        //             </ul>                     
        //         </p>
        //         <p>Launch Success: {data?.launch_success? "Successful" : "Failed"}</p>
        //         <div>
        //             <a className='mr-6' href={`${data?.links.article_link}` } rel="noreferrer" target="_blank"><GlobalOutlined /> Blog</a>
        //             <a className='mr-6' href={`${data?.links.video_link}` } rel="noreferrer" target="_blank"><PlayCircleOutlined /> Video</a>
        //             <a href={`${data?.links.wikipedia}` } rel="noreferrer" target="_blank"><GoogleOutlined /> Wikipedia</a>
        //         </div>
        //     </div>
        //     {/* <button onClick={()=>check(data?.links?.mission_patch_small)}>Click to check</button> */}
        // </div>
        
    }

    </>
  )
}

export default LauncheDetails