import axios from 'axios';
import { useEffect,useState } from 'react';

function Author() {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState(null);
  const [showall,setshowall]= useState(false);
  const [formdata,setformdata]=useState({
    name: '',
    nationality: '',
    
  });
    const [formdataid,setformdataid]=useState({
    id: '',
    name: '',
    nationality: '',
   
  });
  const [del_id,setdel_id]=useState(' ');
  const [get_id,setget_id]=useState(' ');
  const fetchData=()=>{axios.get('/api/author')
      .then(res => setAuthors(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddAuthor = (author) => {
    axios.post('/api/author', author)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteAuthor = (id) => {
    axios.delete(`/api/author/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateAuthor= (id, updatedAuthor) => {
    axios.put(`/api/author/${id}`, updatedAuthor)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/author/${id}`)
      .then(res => setAuthor(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddAuthor(formdata);
    setformdata({ name: '', nationality: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateAuthor(formdataid.id, formdataid);
    setformdataid({ id:' ',name: '', nationality: ''});
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteAuthor(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setAuthor(null); 
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <label className="flex gap-6 items-center justify-center min-h-screen">
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      <span className="text-blue-500 hover:text-red-500">{showall ? 'Hide Authors' : 'Show Authors'}</span>
      <GetAllAuthors authors={authors}  showall={showall} />
      </label>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="name" value={formdata.name} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="nationality" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name='nationality' value={formdata.nationality} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          nationality: e.target.value
        }))}}/>
        
        <button className="text-blue-500 hover:text-red-500" type="submit">Add Author</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="id" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Name" name="name" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.name} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="nationality" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name='nationality' value={formdataid.nationality} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          nationality: e.target.value
        }))}}/>
        <button className="text-blue-500 hover:text-red-500" type="submit">Update Author</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name="id" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Delete Author</button> 
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" name='id' value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Get this Author</button>
        

        {author&&( 
        <div>
          <h2 className='text-blue-500'>Author Details</h2>
          
            <div>
              <p className='text-red-500'>Name: {author.name}</p>
              <p className='text-green-500'>Nationality: {author.nationality}</p>
            </div>
          </div>)}
       
      </form>
   

      
    </div>
  );
}
 function GetAllAuthors({authors,showall}) {
    return (
      showall &&(
      <div>
        
        <h1 className='text-blue-500'>Authors</h1>
        <ul>
          {authors.map(author => (
            <li key={author.id}>
             <p className='text-red-500'>Name: {author.name}</p>
              <p className='text-green-500'>Nationality: {author.nationality}</p>
               
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default Author;