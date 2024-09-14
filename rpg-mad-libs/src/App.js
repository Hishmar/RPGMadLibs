import './App.css';
import {useEffect, useState, useCallback} from 'react';
import {getListOfLists, getList, putList} from './s3connector.js';
import Form from 'react-bootstrap/Form';

function App() {
  const [fullList, setFullList] = useState({names:['1']})
  const [usedList, setUsedList] = useState("")
  const [currentList, setCurrentList] = useState("dBNames")
  const [listOfLists, setListOfLists] = useState(['list0'])
  const fetchList = async () => setFullList(await getList(currentList))
  
  useEffect(()=>{async function fetchLists() {
    setListOfLists(await getListOfLists())
  }
  fetchLists();
    },[])

  const listOptions = listOfLists.map((list)=>
  <option value={list} key={list}>{list}</option>
  )
  return (
    <div className="App">
      <Form.Select onChange={(e)=>setCurrentList(e.target.value)}>
        {listOptions}
      </Form.Select>
      <button onClick={()=>fetchList}>Get Name</button>
      <button onClick={()=>putList({listName:{currentList},names:["ralph","ralph2"]})}>Add Ralph</button>
    </div>
  );
}

export default App;
