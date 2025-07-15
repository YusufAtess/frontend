import axios from 'axios';
import { useEffect,useState } from 'react';

function BorrowRecord() {
  const [borrowrecords, setBorrowRecords] = useState([]);
  const [borrowrecord, setBorrowRecord] = useState(null);
  const [showall,setshowall]= useState(false);
  const [formdata,setformdata]=useState({
    book_id: '',
    student_id: '',
    borrowDate: '',
    returnDate: '',
    
  });
    const [formdataid,setformdataid]=useState({
    id: '',
    book_id: '',
    student_id: '',
    borrowDate: '',
    returnDate: '',    
   
  });
  const [del_id,setdel_id]=useState(' ');
  const [get_id,setget_id]=useState(' ');
  const fetchData=()=>{axios.get('/api/borrowrecord')
      .then(res => setBorrowRecords(res.data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleAddBorrowRecord = (borrowrecord) => {
    axios.post('/api/borrowrecord', borrowrecord)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleDeleteBorrowRecord = (id) => {
    axios.delete(`/api/borrowrecord/${id}`)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleUpdateBorrowRecord= (id, updatedBorrowRecord) => {
    axios.put(`/api/borrowrecord/${id}`, updatedBorrowRecord)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };
  const handleGetById = (id)=>{
    axios.get(`/api/borrowrecord/${id}`)
      .then(res => setBorrowRecord(res.data))
      .catch(err => console.error(err));
  }
 
function handleSubmit(e) {
    e.preventDefault();
    handleAddBorrowRecord(formdata);
    setformdata({ book_id: '', student_id: '', borrowDate: '', returnDate: '' });
    }
function handleSubmitupdate(e) {
    e.preventDefault();
    handleUpdateBorrowRecord(formdataid.id, formdataid);
    setformdataid({ id:' ',book_id: '', student_id: '', borrowDate: '', returnDate: '' });
    }
function handleSubmitdelete(e) {
    e.preventDefault();
    handleDeleteBorrowRecord(del_id);
    setdel_id('');
}

function handleGetByIdSubmit(e) {
    e.preventDefault();
    handleGetById(get_id);
    setget_id('');
    setBorrowRecord(null); 
}
  return (
    <div>
      <label>
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      {showall ? 'Hide BorrowRecords' : 'Show BorrowRecords'}
      <GetAllBorrowRecords borrowrecords={borrowrecords}  showall={showall} />
      </label>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Book_id" name="book_id" value={formdata.book_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="Student_id" name="student_id" value={formdata.student_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          student_id: e.target.value
        }))}}/>
        <input type="date" placeholder="BorrowDate" name="borrowDate" value={formdata.borrowDate} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          borrowDate: e.target.value
        }))}} />
        <input type="date" placeholder="ReturnDate" name="returnDate" value={formdata.returnDate} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          returnDate: e.target.value
        }))}} />
        
        <button type="submit">Add BorrowRecord</button>
        
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
        <input type="text" placeholder="student_id" name='student_id' value={formdataid.student_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          student_id: e.target.value
        }))}}/>
           <input type="date" placeholder="BorrowDate" name="borrowDate" value={formdataid.borrowDate} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          borrowDate: e.target.value
        }))}} />
        <input type="date" placeholder="ReturnDate" name="returnDate" value={formdataid.returnDate} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          returnDate: e.target.value
        }))}} />
        <button type="submit">Update BorrowRecord</button>
        
      </form>
      <form onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button type="submit">Delete BorrowRecord</button> 
      </form>
      <form onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button type="submit">Get this BorrowRecord</button>
        

        {borrowrecord&&( 
        <div>
          <h2>BorrowRecord Details</h2>
          
            <div>
              <p>Book title: {borrowrecord.book?.title}</p>
              <p>Book isbn: {borrowrecord.book?.isbn}</p>
              <p>Book stock: {borrowrecord.book?.stock}</p>   
              <p>Book author name: {borrowrecord.book?.author?.name}</p> 
              <p>Book author nationality: {borrowrecord.book?.author?.nationality}</p>
              <p>Student name: {borrowrecord.student?.name}</p>
              <p>Student email: {borrowrecord.student?.email}</p>
              <p>Borrow Date: {borrowrecord.borrowDate}</p>
              <p>Return Date: {borrowrecord.returnDate}</p>  
            </div>
          </div>)}
       
      </form>
   

      
    </div>
  );
}
 function GetAllBorrowRecords({borrowrecords,showall}) {
    return (
      showall &&(
      <div>
        
        <h1>BorrowRecords</h1>
        <ul>
          {borrowrecords.map(borrowrecord => (
            <li key={borrowrecord.id}>
             <p>Book title: {borrowrecord.book?.title}</p>
              <p>Book isbn: {borrowrecord.book?.isbn}</p>
              <p>Book stock: {borrowrecord.book?.stock}</p>   
              <p>Book author name: {borrowrecord.book?.author?.name}</p> 
              <p>Book author nationality: {borrowrecord.book?.author?.nationality}</p>
              <p>Student name: {borrowrecord.student?.name}</p>
              <p>Student email: {borrowrecord.student?.email}</p>
              <p>Borrow Date: {borrowrecord.borrowDate}</p>
              <p>Return Date: {borrowrecord.returnDate}</p> 
            </li>
          ))}
        </ul>
      </div>)
  );
}
export default BorrowRecord;
