/* Functions for using s3 for storage, forces names to be unique on a list*/
import xMLParser from 'react-xml-parser'
export const getListOfLists = async () => {
    let response = await fetch("http://dndmadlibs.s3.amazonaws.com/?list-type=2",{cache: "no-store"});
    let responseBody = await response.text();
    let xml = new xMLParser().parseFromString(responseBody);
    let listOfLists = [];
    xml.getElementsByTagName('Key').forEach((res)=>{
        let trimmedName = res.value.replace(".json","");
        listOfLists.push(trimmedName)}
    )
    console.log(listOfLists)
    return listOfLists
}

export const getList = async (listName) => {
    let response = await fetch("http://dndmadlibs.s3.amazonaws.com/" + listName + ".json",{cache: "no-store"});
    return await response.json();
}

export const putList = async (localList) => {
    let s3List  = await getList(localList.listName);
    let fullArray = localList.names.concat(...s3List.names)
    let combinedNames = [...new Set(fullArray)]
    s3List.names = combinedNames
    return await fetch("http://dndmadlibs.s3.amazonaws.com/"+ localList.listName + ".json",{method: "PUT", body:JSON.stringify(s3List)});
}