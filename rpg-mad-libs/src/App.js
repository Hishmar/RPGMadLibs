import './App.css';
import {useEffect, useState, useCallback} from 'react';
import {getListOfLists, getList, putList} from './s3connector.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container'

function App() {
  const [fullList, setFullList] = useState({names:['1']})
  const [usedList, setUsedList] = useState("")
  const [pulledName, setPulledName] = useState("")
  //default list in the S3 pulls names telling you to input a list, better in the long run to create some sort of unhappy path to disallow input but works for now
  const [currentList, setCurrentList] = useState("default")
  const [listOfLists, setListOfLists] = useState(['Select Name List'])
  const fetchList = async () => setFullList(await getList(currentList))
  
  useEffect(()=>{async function fetchLists() {
    setListOfLists(await getListOfLists())
  }
  fetchLists();
    },[])
  useEffect(()=>{fetchList()},[currentList])
  const getRandomName = () => {return fullList.names[Math.floor(Math.random()*fullList.names.length)]}
  const listOptions = listOfLists.map((list)=>
  <option value={list} key={list}>{list}</option>
  )
  return (
    <div className="App">
      <Container>
      <Form.Select onChange={(e)=>{setCurrentList(e.target.value);}}>
        <option>Select Name List</option>
        {listOptions}
      </Form.Select>
      <div>
      <Button onClick={()=>setPulledName(getRandomName())}>Get Name</Button>
      <h3>{pulledName}</h3>
      </div>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        if(currentList=="default"){setPulledName(getRandomName())}
        const additionObject = {listName:currentList,names:[e.target.elements.new_addition.value]}
        putList(additionObject);
        
      }}>
      <InputGroup >
        <Button type="submit">Add Name</Button>
        <Form.Control
          name="new_addition"
          placeholder = "Guy Fierri"/>
      </InputGroup>
      </Form>
      </Container>
    </div>
  );
}

export default App;

//TODO add a footer so that css color options continue down the page, or figure out how to apply color to all children of container so they don't get hit by * in the css file
//TODO add ability to save names so they don't get pulled multiple times
//TODO add ability to create new list
//TODO add ability to add multiple names simultaneously
//TODO clean up formatting, probably using Stack, since everything on the page will be vertical
//TODO Add a switch to allow or disallow duplicate names