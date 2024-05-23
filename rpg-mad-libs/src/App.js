import './App.css';
import {useEffect, useState} from 'react';
import {getListOfLists, getList, putList} from './s3connector.js'

function App() {
  const [fullList, setFullList] = useState({})
  const [usedList, setUsedList] = useState("")
  const [currentList, setCurentList] = useState("")
  const [listOfLists, setListOfLists] = useState(['list0'])
  useEffect(()=>setListOfLists(getListOfLists()), [])
  return (
    <div className="App">
      <p>{listOfLists[0]}
      </p>
    </div>
  );
}

export default App;
