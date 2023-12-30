import { useState } from "react";
import "./App.css";

import { Modal } from "./FormComp";
import { Table } from "./TableCom";


function App() {
  const[modalOpen,setModalOpne]=useState(false)
  const [rows,setRows]=useState([
    {TaskName:"Hari",AssignedName:"Arun",StartDate:"22.3.2023",EndDate:"22.3.1023",Tags:"Live",Followers:"Mr.Arun",Description:"dddddd"},
    {TaskName:"Hari",AssignedName:"Arun",StartDate:"22.3.2023",EndDate:"22.3.1023",Tags:"Completed",Followers:"Mr.Arun",Description:"dddddd"},
    {TaskName:"Hari",AssignedName:"Arun",StartDate:"22.3.2023",EndDate:"22.3.1023",Tags:"Live",Followers:"Mr.Arun",Description:"dddddd"},])
   const [editRow,setEditRow]=useState(null)
    const handelDeleteRow=(targetIndex)=>{
    setRows(rows.filter((_,idx)=>idx!==targetIndex))
  }
  const handelEdit=(idx)=>{
    setEditRow(idx)
    setModalOpne(true)
  }
  const handelSubmit=(newRow)=>{
    editRow===null?
    setRows([...rows,newRow]):
    setRows(rows.map((currRow, idx)=>{
      if(!idx==editRow) return currRow;
      return newRow;
    }))
  }
  return (
    <div className="App">

      <h1> Task Table</h1>
      <button className="btn" onClick={()=>setModalOpne(true)}>Enter New Data</button>
      <Table rows={rows} deleteRow={handelDeleteRow} editRow={handelEdit}/>
      
      {modalOpen&&<Modal closeModal={()=>{
        setModalOpne(false);
        setEditRow(null)}}
        onSubmit={handelSubmit}
        defualtValue={editRow!== null && rows[editRow]}/>}
    </div>
  );
}

export default App;