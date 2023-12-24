import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [fullList, setFullList] = useState({})
  const [usedList, setUsedList] = useState("")
  const [currentList, setCurentList] = useState("")
  useEffect(()=> {}, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;
