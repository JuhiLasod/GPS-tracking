// import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
