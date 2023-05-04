import {useEffect, useState} from "react"

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState({});

  const handlerForm = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch('http://localhost:8080/demo', {
        method:'POST',
        body: JSON.stringify(form),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data);
    }
  //get users
  const getUsers = async () =>{
    const response = await fetch('http://localhost:8080/demo',{
      method:'GET',
            headers:{
              'Content-Type': 'application/json'
            }
    })
    const data = await response.json()
    setUsers(data)
  }  

  useEffect(()=>{
    getUsers();
  },[])
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(form)}</p>
        <span>Username:</span>
        <input name="username" type="text" onChange={handlerForm}></input>
        <span>Password:</span>
        <input name="password" type="text" onChange={handlerForm}></input>
        <input type="submit"></input>
      </form>
      <ul>
        {users.map(user => (
          <li >Username: {user.username}, Password : {user.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
