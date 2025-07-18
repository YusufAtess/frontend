import axios from 'axios';
import { useEffect,useState } from 'react';

function Book() {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [book, setBook] = useState(null);
  const [book_id, setBookId] = useState('');
  const [showall,setshowall]= useState(false);
  const [formdata,setformdata]=useState({
    title: '',
    isbn: '',
    stock: '',
    author_id: '',
  });
    const [formdataid,setformdataid]=useState({
    id: '',
    title: '',
    isbn: '',
    stock: '',
    author_id: '',
  });
  const [del_id,setdel_id]=useState(' ');
  const [get_id,setget_id]=useState(' ');
  const fetchData=()=>{axios.get('/api/book')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddBook = (book) => {
    axios.post('/api/book', book)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteBook = (id) => {
    axios.delete(`/api/book/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateBook = (id, updatedBook) => {
    axios.put(`/api/book/${id}`, updatedBook)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/book/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddBook(formdata);
    setformdata({ title: '', isbn: '', stock: '', author_id: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateBook(formdataid.id, formdataid);
    setformdataid({ id:' ',title: '', isbn: '', stock: '', author_id: '' });
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteBook(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setBook(null); 
}
function handleBookStudents(e) {
    e.preventDefault();
    axios.get(`/api/borrowrecord/search_bookstudent/${book_id}`)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
    setBookId('0');
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-pink-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-md w-full max-w-md">

      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide Books' : 'Show Books'}
      <GetAllBooks books={books}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" name="title" value={formdata.title} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          title: e.target.value
        }))}} />
        <input type="text" placeholder="ISBN" name='isbn' value={formdata.isbn} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          isbn: e.target.value
        }))}}/>
        <input type="text" placeholder="Stock" name='stock' value={formdata.stock} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          stock: e.target.value
        }))}}/>
        <input type="text" placeholder="Author_id" name='author_id' value={formdata.author_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          author_id: e.target.value
        }))}}/>
        <button type="submit">Add Book</button>
      </form> 
      <form onSubmit={handleBookStudents}>
        <input type="text" placeholder="Id" name="book_id" value={book_id} onChange={(e)=>{setBookId(e.target.value)}} />
        <button type="submit">Get Book's Students</button>
        
        <div>
          <ol>
          {students.map(student => (
            <li key={student.id}>
             <p>Student Name: {student.name}</p>
              <p>Student Email: {student.email}</p>
              
            </li>
          ))}
        </ol>
          </div>
        </form>
        
      
      <form onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" name="id" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Title" name="title" value={formdataid.title} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          title: e.target.value
        }))}} />
        <input type="text" placeholder="ISBN" name='isbn' value={formdataid.isbn} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          isbn: e.target.value
        }))}}/>
        <input type="text" placeholder="Stock" name='stock' value={formdataid.stock} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          stock: e.target.value
        }))}}/>
        <input type="text" placeholder="Author_id" name='author_id' value={formdataid.author_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          author_id: e.target.value
        }))}}/>
        <button type="submit">Update Book</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete Book</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id"  value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this Book</button>
        

        {book&&( 
        <div>
          <h2>Book Details</h2>
          
            <div>
              <p>Title: {book.title}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Stock: {book.stock}</p>
              <p>Author name : {book.author?.name}</p>
              <p>Author nationality: {book.author?.nationality}</p>
            </div>
          </div>)}
       
      </form>
   

    
    </div>
  </div>
  );
}
 function GetAllBooks({books,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>Books</h1>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              book title:{book.title},
              book stock_number:{book.stock},
              book isbn:{book.isbn}  
              book author_name:{book.author?.name},
              book author_nationality:{book.author?.nationality},
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default Book;
