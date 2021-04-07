import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import {useState} from "react";
import Axios from 'axios'




function App() {
  const [name, setName] = useState("");
  const [Employee_id, setEmpployee_id] = useState("");
  const [Department, setDepartment] = useState("");
  const [Course_taken, setCourse_taken] = useState("");


  const [newCourse,setNewcourse]= useState()
  const [employeelist,setemployeelist]=useState([]);
  
 
  
 const addEmployee = () => {
  Axios.post("http://localhost:3001/create", {
    name: name,
    Employee_id: Employee_id,
    Department: Department,
    Course_taken: Course_taken
  }).then(() => {
    console.log("sucess");
  });
};

  const getEmployees= () =>{
    Axios.get("http://localhost:3001/employees").then((response)=> {
      setemployeelist(response.data);
  
  })
  
  }

  const updateEmployee = (id) => {
    Axios.put("http://localhost:3001/update", { Course_taken: newCourse, Employee_id:id }).then(
      (response) => {
        alert("Data has been updated")
          }
        );
      }

  
  return (
    <div className="App">
     
      <div className="information">
      <label>Name: </label><input type="text" onChange={(event) =>setName(event.target.value)}></input>
      <label>Employee ID: </label><input type="text" onChange={(event) =>setEmpployee_id(event.target.value)}></input>
      <label>Department: </label><input type="text" onChange={(event) =>setDepartment(event.target.value)}></input>
      <label>Course taken: </label><input type="text" onChange={(event) =>setCourse_taken(event.target.value)}></input>
     

      <button onClick={addEmployee}>Add Employee</button>
      </div> 
    
    <div className="employees">
    <button onClick={getEmployees}>Show Employees List</button>

   
    {employeelist.map((val, key)=> {
      return <div className="list_of_employee">
        <div>
        <h3>Name: {val.Name} </h3>
        <h3>Employee ID: {val.Employee_id} </h3>
        <h3>Department: {val.Department} </h3>
        <h3>Course Taken: {val.Course_taken} </h3>
        </div>

        <div className='update_button'>
          
          <input type="text" placeholder="Enter text here..." onChange={(event) =>setNewcourse(event.target.value)}/>
          <button onClick={()=>{updateEmployee(val.Employee_id)}}>Update Course</button>
        
        </div>
        </div>
    })}
    </div>
    </div>

    
  );
}

export default App;
