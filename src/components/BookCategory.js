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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <label className="flex gap-6 items-center justify-center min-h-screen">
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      <span className="text-blue-500 hover:text-red-500">{showall ? 'Hide BookCategorys' : 'Show BookCategorys'}</span>
      <GetAllBookCategorys bookcategorys={bookcategorys}  showall={showall} />
      </label>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmit}>
        <input type="text" placeholder="Book_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="book_id" value={formdata.book_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="Category_id" name="category_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.category_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          category_id: e.target.value
        }))}}/>
        
        <button className="text-blue-500 hover:text-red-500" type="submit">Add BookCategory</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" name="id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Book_id" name="book_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.book_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="category_id" name='category_id' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.category_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          category_id: e.target.value
        }))}}/>
        <button className="text-blue-500 hover:text-red-500" type="submit">Update BookCategory</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Delete BookCategory</button> 
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Get this BookCategory</button>
        

        {bookcategory&&( 
        <div>
          <h2 className='text-blue-500'>BookCategory Details</h2>
          
            <div>
              <p className='text-red-500'>Book title: {bookcategory.book?.title}</p>
              <p className='text-green-500'>Book isbn: {bookcategory.book?.isbn}</p>
              <p className='text-gray-500'>Book stock: {bookcategory.book?.stock}</p>   
              <p className='text-yellow-500'>Book author name: {bookcategory.book?.author?.name}</p> 
              <p className='text-purple-500'>Book author nationality: {bookcategory.book?.author?.nationality}</p>
              <p className='text-pink-500'>Category name: {bookcategory.category?.name}</p>  
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
              <p className='text-red-500'>Book title: {bookcategory.book?.title}</p>
              <p className='text-green-500'>Book isbn: {bookcategory.book?.isbn}</p>
              <p className='text-gray-500'>Book stock: {bookcategory.book?.stock}</p>   
              <p className='text-yellow-500'>Book author name: {bookcategory.book?.author?.name}</p> 
              <p className='text-purple-500'>Book author nationality: {bookcategory.book?.author?.nationality}</p>
              <p className='text-pink-500'>Category name: {bookcategory.category?.name}</p>  
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default BookCategory;
