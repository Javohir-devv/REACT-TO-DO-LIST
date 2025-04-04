import { useState, ChangeEvent } from 'react'
import './App.css'



interface Task {
  id: number
  name: string
}


function App() {
  const [Data, setData] = useState<Task[]>([])

  const [Task, setTask] = useState<string>('')

  const [editId, setEditId] = useState<number |null>(null)





  const addTask = () => {

    if(Task == ""){
      alert("Input bo'sh")
    }else{

   
    if(editId !== null){
      const updated = Data.map((t) => t.id === editId ? { ...t, name: Task } : t);

      setData(updated)
      setEditId(null)
    }else{

      setData([...Data, { id: Date.now(), name: Task }])
    }
    setTask('')
  }
  }
  const delTask = (id: number) => {
    const filtered = Data.filter((t) => t.id !== id)
    setData(filtered);
  }
  const editTask = (id: number) => {
    const toEdit = Data.find((t)=>t.id === id)
    if(toEdit){
      setTask(toEdit.name)
      setEditId(id)
    }
  }



  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }
  return (
    <>
      <div className="container">

        <h1 className='logo'>To-Do List</h1>

        <div className="input-wrapper">
          <input type="text" id='text' value={Task} onChange={handleInputChange} placeholder='enter a task' />
          <button onClick={addTask}>{editId ? "Update" : "Add"}</button>
        </div>
        <ul>
  {Data.length === 0 ? (
    <p style={{ textAlign: 'center',  }} className='notFound'>Task yo‘q</p>
  ) : (
    Data.map((t) => (
      <li key={t.id}>
        <p>
        
          {t.name}
        </p>

        <div className="manage-btns">
          <button className='edit' onClick={() => editTask(t.id)}>Edit</button>
          <button className='del' onClick={() => delTask(t.id)}>Delete</button>
        </div>
      </li>
    ))
  )}
</ul>


      </div>
    </>
  )
}

export default App
