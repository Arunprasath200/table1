import { useState } from "react";

import "./Form.css";

export const Modal = ({closeModal,onSubmit,defualtValue})=>
{
  const[formState,setFormState]=useState(
    defualtValue||{
    TaskName:"",
    AssignedName:"",
    StartDate: "",
    EndDate:"",
    Tags:"Live",
    Followers:"",
    Description:"",
  })
  const [error,setError]=useState("")
  const validateForm=()=>{
     if(formState.TaskName&& formState.AssignedName && formState.Description && formState.EndDate && formState.Followers && formState.Tags)
     {
     setError("")
     return true;
     }
    else{
      let errorFields=[];
      for(const[key,value]of Object.entries(formState))
      {
        if(!value){
          errorFields.push(key)
        }
      }
      setError(errorFields.join(","))
      return false;
    }
  }
  const handelChange=(e)=>{
    setFormState({
      ...formState,[e.target.name]:e.target.value,
    });
  }
  const handelSubmit=(e)=>{
    e.preventDefault()
    if(!validateForm()) return;
    onSubmit(formState)
    closeModal();
  }
  return(
  <div 
  className="modal-container" 
  onClick={(e)=>{
    if(e.target.className==="modal-container")
    closeModal();
  }}
  >
    <div className="modal">
      <h1>Add Data</h1>
    <form>
      <div className="form-group">
        <label htmlFor="TaskName">TaskName</label>
        <input type="text" value={formState.TaskName} name="TaskName" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="AssignedName">AssignedName</label>
        <input type="text" value={formState.AssignedName} name="AssignedName" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="StartDate">StartDate</label>
        <input type="date" value={formState.StartDate} name="StartDate" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="EndDate">EndDate</label>
        <input type="date" value={formState.EndDate} name="EndDate" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="Followers">Followers</label>
        <input type="text" value={formState.Followers} name="Followers" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="Description">Description</label>
        <textarea value={formState.Description} name="Description" onChange={handelChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="Tags">Tags</label>
        <select name="status" value={formState.Tags} onChange={handelChange}>
          <option value="Live">Live</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {error && <div className="error">{`Errors in:${error}`}</div>}
      <button type="submit" className="btn" onClick={handelSubmit}>SUBMIT</button>
    </form>
    </div>
  </div>
  );
}
   