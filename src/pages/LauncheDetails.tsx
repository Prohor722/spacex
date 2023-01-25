import { useState } from "react";
import {useParams} from 'react-router-dom';


const LauncheDetails = () => {
    const [ flight_number, setFlightNumber ] = useState(1)
    const { id } = useParams();
  return (
    <div>Flight number : {id}</div>
  )
}

export default LauncheDetails