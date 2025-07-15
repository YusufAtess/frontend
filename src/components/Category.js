import axios from 'axios';
import { useEffect,useState } from 'react';

function Category() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
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
  const fetchData=()=>{axios.get('/api/category')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddCategory = (category) => {
    axios.post('/api/category', category)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteCategory = (id) => {
    axios.delete(`/api/category/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateCategory= (id, updatedCategory) => {
    axios.put(`/api/category/${id}`, updatedCategory)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/category/${id}`)
      .then(res => setCategory(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddCategory(formdata);
    setformdata({ name: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateCategory(formdataid.id, formdataid);
    setformdataid({ id:' ',name: ''});
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteCategory(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setCategory(null); 
}
  return (
    <div>
      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide Categories' : 'Show Categories'}
      <GetAllCategories categories={categories}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formdata.name} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <button type="submit">Add Category</button>
        
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
        <button type="submit">Update Category</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete Category</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this Category</button>
        

        {category&&( 
        <div>
          <h2>Category Details</h2>
          
            <div>
              <p>Name: {category.name}</p>
              
            </div>
          </div>)}
       
      </form>
   

      
    </div>
  );
}
 function GetAllCategories({categories,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              category name:{category.name},
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default Category;
