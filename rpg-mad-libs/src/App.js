import './App.css';
import {useEffect, useState, useCallback} from 'react';
import {getListOfLists, getList, putList} from './s3connector.js'

function App() {
  const [fullList, setFullList] = useState({names:['1']})
  const [usedList, setUsedList] = useState("")
  const [currentList, setCurentList] = useState("dBNames")
  const [listOfLists, setListOfLists] = useState(['list0'])
  const fetchList = async () => setFullList(await getList(currentList))
  
  useEffect(()=>{async function fetchLists() {
    setListOfLists(await getListOfLists())
  }
  fetchLists();
    },[])
  return (
    <div className="App">
      <p>{listOfLists[0]}</p>
      <button onClick={fetchList}>getStuff</button>
      <p>{fullList.names}</p>
      <button onClick={()=>putList({listName:"dBNames",names:["ralph","ralph2"]})}>Add Ralph</button>
    </div>
  );
}

export default App;
