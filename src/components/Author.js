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
    <div>
      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide Authors' : 'Show Authors'}
      <GetAllAuthors authors={authors}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formdata.name} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="nationality" name='nationality' value={formdata.nationality} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          nationality: e.target.value
        }))}}/>
        
        <button type="submit">Add Author</button>
        
      </form>
      <form onSubmit={handleSubmitupdate}>
        <input type="text" placeholder="Id" name="id" value={formdataid.id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          id: e.target.value
        }))}} />
        <input type="text" placeholder="Name" name="name" value={formdataid.name} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="nationality" name='nationality' value={formdataid.nationality} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          nationality: e.target.value
        }))}}/>
        <button type="submit">Update Author</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete Author</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this Author</button>
        

        {author&&( 
        <div>
          <h2>Author Details</h2>
          
            <div>
              <p>Name: {author.name}</p>
              <p>Nationality: {author.nationality}</p>
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
        
        <h1>Authors</h1>
        <ul>
          {authors.map(author => (
            <li key={author.id}>
              author name:{author.name},
              author nationality:{author.nationality},
               
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default Author;
