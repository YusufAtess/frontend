import axios from 'axios';
import { useEffect,useState } from 'react';

function BookCategory() {
  const [bookcategorys, setBookCategorys] = useState([]);
  const [bookcategory, setBookCategory] = useState(null);
  const [showall,setshowall]= useState(false);
  const [formdata,setformdata]=useState({
    book_id: '',
    category_id: '',
    
  });
    const [formdataid,setformdataid]=useState({
    id: '',
    book_id: '',
    category_id: '',
   
  });
  const [del_id,setdel_id]=useState(' ');
  const [get_id,setget_id]=useState(' ');
  const fetchData=()=>{axios.get('/api/bookcategory')
      .then(res => setBookCategorys(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddBookCategory = (bookcategory) => {
    axios.post('/api/bookcategory', bookcategory)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteBookCategory = (id) => {
    axios.delete(`/api/bookcategory/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateBookCategory= (id, updatedBookCategory) => {
    axios.put(`/api/bookcategory/${id}`, updatedBookCategory)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/bookcategory/${id}`)
      .then(res => setBookCategory(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddBookCategory(formdata);
    setformdata({ book_id: '', category_id: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateBookCategory(formdataid.id, formdataid);
    setformdataid({ id:' ',book_id: '', category_id: ''});
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteBookCategory(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setBookCategory(null); 
}
  return (
    <div>
      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide BookCategorys' : 'Show BookCategorys'}
      <GetAllBookCategorys bookcategorys={bookcategorys}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book_id" name="book_id" value={formdata.book_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="Category_id" name="category_id" value={formdata.category_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          category_id: e.target.value
        }))}}/>
        
        <button type="submit">Add BookCategory</button>
        
      </form>
      <form onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" name="id" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Book_id" name="book_id" value={formdataid.book_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="category_id" name='category_id' value={formdataid.category_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          category_id: e.target.value
        }))}}/>
        <button type="submit">Update BookCategory</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete BookCategory</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this BookCategory</button>
        

        {bookcategory&&( 
        <div>
          <h2>BookCategory Details</h2>
          
            <div>
              <p>Book title: {bookcategory.book?.title}</p>
              <p>Book isbn: {bookcategory.book?.isbn}</p>
              <p>Book stock: {bookcategory.book?.stock}</p>   
              <p>Book author name: {bookcategory.book?.author?.name}</p> 
              <p>Book author nationality: {bookcategory.book?.author?.nationality}</p>
              <p>Category name: {bookcategory.category?.name}</p>  
            </div>
          </div>)}
       
      </form>
   

      
    </div>
  );
}
 function GetAllBookCategorys({bookcategorys,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>BookCategorys</h1>
        <ul>
          {bookcategorys.map(bookcategory => (
            <li key={bookcategory.id}>
             <p>Book title: {bookcategory.book?.title}</p>
              <p>Book isbn: {bookcategory.book?.isbn}</p>
              <p>Book stock: {bookcategory.book?.stock}</p>   
              <p>Book author name: {bookcategory.book?.author?.name}</p> 
              <p>Book author nationality: {bookcategory.book?.author?.nationality}</p>
              <p>Category name: {bookcategory.category?.name}</p> 
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default BookCategory;
