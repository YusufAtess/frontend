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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      

      <label className="flex gap-6 items-center justify-center min-h-screen">
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      <span className="text-blue-500 hover:text-red-500">{showall ? 'Hide Books' : 'Show Books'}</span>
      <GetAllBooks books={books}  showall={showall} />
      </label>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="title" value={formdata.title} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          title: e.target.value
        }))}} />
        <input type="text" placeholder="ISBN" name='isbn' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.isbn} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          isbn: e.target.value
        }))}}/>
        <input type="text" placeholder="Stock" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name='stock' value={formdata.stock} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          stock: e.target.value
        }))}}/>
        <input type="text" placeholder="Author_id" name='author_id' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.author_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          author_id: e.target.value
        }))}}/>
        <button className="text-blue-500 hover:text-red-500" type="submit">Add Book</button>
      </form> 
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleBookStudents}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="book_id" value={book_id} onChange={(e)=>{setBookId(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Get Book's Students</button>
        
        <div>
          <ol>
          {students.map(student => (
            <li key={student.id}>
             <p className='text-blue-500'>Student Name: {student.name}</p>
              <p className='text-green-500'>Student Email: {student.email}</p>
              
            </li>
          ))}
        </ol>
          </div>
        </form>
        
      
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="id" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Title" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="title" value={formdataid.title} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          title: e.target.value
        }))}} />
        <input type="text" placeholder="ISBN" name='isbn' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.isbn} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          isbn: e.target.value
        }))}}/>
        <input type="text" placeholder="Stock" name='stock' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.stock} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          stock: e.target.value
        }))}}/>
        <input type="text" placeholder="Author_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name='author_id' value={formdataid.author_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          author_id: e.target.value
        }))}}/>
        <button className="text-blue-500 hover:text-red-500" type="submit">Update Book</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen"  onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Delete Book</button> 
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"  value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Get this Book</button>
        

        {book&&( 
        <div>
          <h2 className='text-blue-500'>Book Details</h2>
          
            <div>
              <p className='text-red-500'>Title: {book.title}</p>
              <p className='text-green-500'>ISBN: {book.isbn}</p>
              <p className='text-gray-500'>Stock: {book.stock}</p>
              <p className='text-purple-500'>Author name : {book.author?.name}</p>
              <p className='text-yellow-500'>Author nationality: {book.author?.nationality}</p>
              <img src={book?.thumbnail} alt={book.title} className="w-32 h-32 object-cover rounded-lg" />
              <p className='text-blue-300'>Publisher: {book?.publisher}</p>
              <p className='text-red-300'>Average Rating: {book?.averageRating}</p>
              <p className='text-green-300'>Number of Ratings: {book?.ratingsCount}</p>
            </div>
          </div>)}
       
      </form>
   

    
    </div>
  
  );
}
 function GetAllBooks({books,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>Books</h1>
        <ol className='space-y-4'>
          {books.map(book => (
            <li key={book.id}>
              <p className='text-red-500'>Title: {book.title}</p>
              <p className='text-green-500'>ISBN: {book.isbn}</p>
              <p className='text-gray-500'>Stock: {book.stock}</p>
              <p className='text-purple-500'>Author name : {book.author?.name}</p>
              <p className='text-yellow-500'>Author nationality: {book.author?.nationality}</p>
              <img src={book?.thumbnail} alt={book.title} className="w-32 h-32 object-cover rounded-lg" />
              <p className='text-blue-300'>Publisher: {book?.publisher}</p>
              {(book?.averageRating &&
              <p className='text-red-300'>Average Rating: {book?.averageRating}</p>)}
              {(book?.ratingsCount&&<p className='text-green-300'>Number of Ratings: {book?.ratingsCount}</p>)}
            </li>
          ))}
        </ol>
      </div>)
  );
}
export default Book;
