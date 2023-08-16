import './App.css';
import PirateNew from './views/PirateNew';
import PirateView from './views/PirateView';
import PirateCrew from './views/PirateCrew';
import {Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/pirates"/>}/>
        <Route path="/pirates" element={<PirateCrew/>}/>
        <Route path="/pirate/new" element={<PirateNew/>}/>
        <Route path="/pirate/:_id" element={<PirateView/>}/>
      </Routes>
    </div>
  );
}

export default App;
