import axios from 'axios';
import { useEffect,useState } from 'react';

function Student() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [student_id, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [showall,setshowall]= useState(false);
  const [formdata,setformdata]=useState({
    name: '',
    email: '',
});
    const [formdataid,setformdataid]=useState({
    id: '',
    name: '',
    email: '',
});
  const [del_id,setdel_id]=useState(' ');
  const [get_id,setget_id]=useState(' ');
  const fetchData=()=>{axios.get('/api/student')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddStudent = (student) => {
    axios.post('/api/student', student)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteStudent = (id) => {
    axios.delete(`/api/student/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateStudent = (id, updatedStudent) => {
    axios.put(`/api/student/${id}`, updatedStudent)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/student/${id}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddStudent(formdata);
    setformdata({ name: '', email: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateStudent(formdataid.id, formdataid);
    setformdataid({ id:' ',name: '', email: '' });
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteStudent(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setStudent(null); 
}
function handleStudentBooks(e) {
    e.preventDefault();
    axios.get(`/api/borrowrecord/search_studentbook/${student_id}`)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
    setStudentId('0');
}
  return (
    <div>
      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide Students' : 'Show Students'}
      <GetAllStudents students={students}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formdata.name} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="email" name='email' value={formdata.email} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          email: e.target.value
        }))}}/>
        <button type="submit">Add Student</button>
        </form>
       <form onSubmit={handleStudentBooks}>
        <input type="text" placeholder="Id" name="student_id" value={student_id} onChange={(e)=>{setStudentId(e.target.value)}} />
        <button type="submit">Get Student's Books</button>
        
        <div>
          <ol>
          {books.map(book => (
            <li key={book.id}>
             <p>Book title: {book.title}</p>
              <p>Book isbn: {book.isbn}</p>
              <p>Book stock: {book.stock}</p>
              <p>Book author name: {book.author?.name}</p> 
              <p>Book author nationality: {book.author?.nationality}</p>
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
        <input type="text" placeholder="Name" name="name" value={formdataid.name} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          name: e.target.value
        }))}} />
        <input type="text" placeholder="email" name='email' value={formdataid.email} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          email: e.target.value
        }))}}/>
       <button type="submit">Update Student</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete Student</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id"  value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this Student</button>
        

        {student&&( 
        <div>
          <h2>Student Details</h2>
          
            <div>
              <p>Name: {student.name}</p>
              <p>email: {student.email}</p>
            </div>
          </div>)}
       
      </form>
   

      
    </div>
  );
}
 function GetAllStudents({students,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>Students</h1>
        <ul>
          {students.map(student => (
            <li key={student.id}>
              student name:{student.name},
              student email:{student.email},
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default Student;

