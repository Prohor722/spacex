import './App.css';
import { Button } from 'antd';
import Launches from './pages/Launches';

function App() {
  return (
    <div>
      <p className='bg-orange-200'>Hello there!</p>
      <Launches />
      <Button>Conda</Button>
    </div>
  );
}

export default App;
