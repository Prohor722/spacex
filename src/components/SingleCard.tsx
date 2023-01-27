import { Card,Button, } from 'antd';
import {Link} from 'react-router-dom';
import notFoundImage from '../assets/images/notfound.png';

type SingleCardProps = {
  data: {
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
}
}

const SingleCard = ({data}:SingleCardProps) => {

    const { Meta } = Card;
    
    const checkImg = (img:string):string =>{
        return img? checkValidImageLink(img) : notFoundImage ;
    }

    const checkValidImageLink = (link:string):string =>{
        const test = <img src={link} />;
        console.log(test.props.src);
        return test.props.src?  link : notFoundImage;
    }

    return (
        <Card title="Default size card" extra={<img src={checkImg(data.links.mission_patch_small)} alt="logo"/>} style={{ width: 300 }}>
            <Meta title={'Mission Name: '+data.mission_name}/>
            <p>Rocket Name: {data.rocket.rocket_name}</p>
            <p>Launch Year: {data.launch_year}</p>
            <p>
                Launch Success:
                {data.launch_success ? 'Yes' : 'No'}
            </p>
            
            <Button>
                <Link to={'/launches/'+data.flight_number}>See Details</Link>
            </Button>
        </Card>
  )
}

export default SingleCard