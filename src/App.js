import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App ()  {

  const [data, setData]= useState([])
  const [name , setName]= useState('')
  const [author , setAuthor]= useState('')
  const [status , setStatus]= useState(false)


  // axios.get('http://localhost:3000/books')
  // .then((res) => setData(res.data))
  useEffect(() => {
    async function getBookData() {
      try {
        const response = await axios.get("http://localhost:3000/books");
      setData(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getBookData()
  },[])


  const postBook= () => {
    axios.post('http://localhost:3000/books',{
    "name":name,
    "author":author,
    "status": status
    })
  }

const changeStatus = (id) => {
  // axios.patch('http://localhost:3000/books')

}

const deleteBook = (id) => {
  axios.delete(`http://localhost:3000/books/${id}`)
  .then(() => {
    const newBooks = data.filter(book => book.id !== id)
    setData(newBooks)
  })
}



  return (
    <div>
          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Название</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Автор</Form.Label>
        <Form.Control value={author} onChange={(e) => setAuthor(e.target.value)} type="text"  />
      </Form.Group>

      <Button onClick={postBook}  variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
{data.map((book) =>(
<tr key={book.id}>
  <td>{book.id}</td>
  <td>{book.name}</td>
  <td>{book.author}</td>
  <td>{book.status ? 'Прочитано': "Не прочитано"}</td>
  <td><button onClick={deleteBook(book.id)}>Удалить</button>
  <button onClick={changeStatus(book.id)}>{book.status ? "Не прочитано" : 'Прочитано'}</button></td>
</tr>)
)}</tbody>
</Table>

    </div>

  );
}

export default App;