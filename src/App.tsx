
import './App.css';
import Launches from './pages/Launches';
import {Routes, Route} from 'react-router-dom'
import LauncheDetails from './pages/LauncheDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Launches/>} />
        <Route path='/launches/:id' element={<LauncheDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
