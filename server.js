const express= require('express')
const app= express()
const mysql= require('mysql')
const cors= require('cors')

app.use(cors())
app.use(express.json())


const db= mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "password",
    database: "employee_db"
})


app.post('/create', (req, res) =>{
    const name= req.body.name
    const Employee_id= req.body.Employee_id
    const Department= req.body.Department
    const Course_taken= req.body.Course_taken

    db.query('INSERT INTO new_table (name,Employee_id,Department,Course_taken) VALUES(?,?,?,?)',
    [name,Employee_id,Department,Course_taken],
    
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    });



app.get('/employees', (req, res)=> {
  db.query("SELECT * FROM new_table",(err, result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result);
    
    }

  })
})


app.put('/update',(req, res)=> {
  const id= req.body.Employee_id;
  const Course_taken= req.body.Course_taken;
  db.query("UPDATE new_table SET Course_taken= ? WHERE Employee_id= ?",[Course_taken, id],(err, result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result);
    } 
    
    }

  )

})





app.listen(3001,() => {
    console.log("server is running")
});