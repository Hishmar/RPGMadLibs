

export const getListOfLists = async () => {
    let response = await fetch("http://dndmadlibs.s3.amazonaws.com/?list-type=2");
    let responseBody = await response.text();
    let XMLParser = require('react-xml-parser');
    let xml = new XMLParser().parseFromString(responseBody);
    console.log(xml.getElementsByTagName('Key'));
    return ['list1', 'list2']
    
}

export const getList = () => {

}

export const putList = () => {

}