import axios from 'axios';
import { useEffect,useState } from 'react';

function BorrowRecord() {
  const [borrowrecords, setBorrowRecords] = useState([]);
  const [overdueborrowrecords, setoverdueborrowRecords] = useState([]);
  const [borrowrecord, setBorrowRecord] = useState(null);
  const [showall,setshowall]= useState(false);
  const [showoverdue,setshowoverdue]= useState(false);
  const [numOfMostBorrowedBooks, setNumOfMostBorrowedBooks] = useState(0);
  const [mostborrowedbooks, setmostborrowedbooks] = useState([]);
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
  const handleGetOverdueBorrowRecords = (e) => {
    axios.get('/api/borrowrecord/overdue')
      .then(res => setoverdueborrowRecords(res.data))
      .catch(err => console.error(err));
      setshowoverdue(e.target.checked);
  };
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
function handleMostBorrowedBooks(e) {
    e.preventDefault();
    axios.get(`/api/borrowrecord/mostborrowed/${numOfMostBorrowedBooks}`)
      .then(res => {setmostborrowedbooks(res.data); })
      .catch(err => console.error(err));
    
    setNumOfMostBorrowedBooks(0);
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <label className="flex gap-6 items-center justify-center min-h-screen">
      <input
        type="checkbox"
        value={showall}
        onChange={(e) => setshowall(e.target.checked)}
      />
      <span className="text-blue-500 hover:text-red-500">{showall ? 'Hide BorrowRecords' : 'Show BorrowRecords'}</span>
      <GetAllBorrowRecords borrowrecords={borrowrecords}  showall={showall} />
      </label>
       <label className="flex gap-6 items-center justify-center min-h-screen">
      <input
        type="checkbox"
        value={showoverdue}
        onChange={(e) => handleGetOverdueBorrowRecords(e)}
      />
      <span className="text-blue-500 hover:text-red-500">{showoverdue ? 'Hide  overdue BorrowRecords' : 'Show  overdue BorrowRecords'}</span>
      <GetOverDueBorrowRecords overdueborrowrecords={overdueborrowrecords}  showoverdue={showoverdue} />
      </label>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmit}>
        <input type="text" placeholder="Book_id" name="book_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.book_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          book_id: e.target.value
        }))}} />
        <input type="text" placeholder="Student_id" name="student_id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.student_id} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          student_id: e.target.value
        }))}}/>
        <input type="date" placeholder="BorrowDate" name="borrowDate" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.borrowDate} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          borrowDate: e.target.value
        }))}} />
        <input type="date" placeholder="ReturnDate" name="returnDate" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdata.returnDate} onChange={(e)=>{setformdata(prev=>({
          ...prev,
          returnDate: e.target.value
        }))}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Add BorrowRecord</button>
       </form> 
        
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleMostBorrowedBooks}>
        <input type="number" placeholder="number"  className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={numOfMostBorrowedBooks} onChange={(e)=>{setNumOfMostBorrowedBooks(e.target.value)}} />
      <button className="text-blue-500 hover:text-red-500" type="submit">Get Most Borrowed Books</button>
        
        <div>
          <ol>
          {mostborrowedbooks.map(borrowedbook => (
            <li key={borrowedbook.id}>
             <p className='text-blue-500'>Book title: {borrowedbook.title}</p>
              <p className='text-red-500'>Book isbn: {borrowedbook.isbn}</p>
              <p className='text-green-500'>Book stock: {borrowedbook.stock}</p>
              <p className='text-yellow-500'>Book number of borrowed: {borrowedbook.num}</p>   
              <p className='text-gray-500'>Book author name: {borrowedbook.author?.name}</p> 
              <p className='text-purple-500'>Book author nationality: {borrowedbook.author?.nationality}</p>
            </li>
          ))}
        </ol>
          </div>
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
        <input type="text" placeholder="student_id" name='student_id' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.student_id} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          student_id: e.target.value
        }))}}/>
           <input type="date" placeholder="BorrowDate" name="borrowDate" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.borrowDate} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          borrowDate: e.target.value
        }))}} />
        <input type="date" placeholder="ReturnDate" name="returnDate" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={formdataid.returnDate} onChange={(e)=>{setformdataid(prev=>({
          ...prev,
          returnDate: e.target.value
        }))}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Update BorrowRecord</button>
        
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmitdelete}>
        <input type="text" placeholder="Id"  name="id" className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={del_id} onChange={(e)=>{setdel_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Delete BorrowRecord</button> 
      </form>
      <form className="flex items-center justify-center min-h-screen" onSubmit={handleGetByIdSubmit}>
        <input type="text" placeholder="Id" name='id' className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" value={get_id} onChange={(e)=>{setget_id(e.target.value)}} />
        <button className="text-blue-500 hover:text-red-500" type="submit">Get this BorrowRecord</button>
        

        {borrowrecord&&( 
        <div>
          <h2>BorrowRecord Details</h2>
          
            <div>
              <p className='text-blue-500'>Book title: {borrowrecord.book?.title}</p>
              <p className='text-red-500'>Book isbn: {borrowrecord.book?.isbn}</p>
              <p className='text-yellow-500'>Book stock: {borrowrecord.book?.stock}</p>   
              <p className='text-green-500'>Book author name: {borrowrecord.book?.author?.name}</p> 
              <p className='text-gray-500'>Book author nationality: {borrowrecord.book?.author?.nationality}</p>
              <p className='text-purple-500'>Student name: {borrowrecord.student?.name}</p>
              <p className='text-pink-500'>Student email: {borrowrecord.student?.email}</p>
              <p className='text-blue-300'>Borrow Date: {borrowrecord.borrowDate}</p>
              <p className='text-blue-900'>Return Date: {borrowrecord.returnDate}</p>  
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
        
        <h1 >BorrowRecords</h1>
        <ul>
          {borrowrecords.map(borrowrecord => (
            <li key={borrowrecord.id}>
              <p className='text-blue-500'>Book title: {borrowrecord.book?.title}</p>
              <p className='text-red-500'>Book isbn: {borrowrecord.book?.isbn}</p>
              <p className='text-yellow-500'>Book stock: {borrowrecord.book?.stock}</p>   
              <p className='text-green-500'>Book author name: {borrowrecord.book?.author?.name}</p> 
              <p className='text-gray-500'>Book author nationality: {borrowrecord.book?.author?.nationality}</p>
              <p className='text-purple-500'>Student name: {borrowrecord.student?.name}</p>
              <p className='text-pink-500'>Student email: {borrowrecord.student?.email}</p>
              <p className='text-blue-300'>Borrow Date: {borrowrecord.borrowDate}</p>
              <p className='text-blue-900'>Return Date: {borrowrecord.returnDate}</p>  
            </li>
          ))}
        </ul>
      </div>)
  );
}
function GetOverDueBorrowRecords({overdueborrowrecords,showoverdue}) {
    return (
      showoverdue &&(
      <div>
        
        <h1>Overdue BorrowRecords</h1>
        <ul>
          {overdueborrowrecords.map(borrowrecord => (
            <li key={borrowrecord.id}>
              <p className='text-blue-500'>Book title: {borrowrecord.book?.title}</p>
              <p className='text-red-500'>Book isbn: {borrowrecord.book?.isbn}</p>
              <p className='text-yellow-500'>Book stock: {borrowrecord.book?.stock}</p>   
              <p className='text-green-500'>Book author name: {borrowrecord.book?.author?.name}</p> 
              <p className='text-gray-500'>Book author nationality: {borrowrecord.book?.author?.nationality}</p>
              <p className='text-purple-500'>Student name: {borrowrecord.student?.name}</p>
              <p className='text-pink-500'>Student email: {borrowrecord.student?.email}</p>
              <p className='text-blue-300'>Borrow Date: {borrowrecord.borrowDate}</p>
              <p className='text-blue-900'>Return Date: {borrowrecord.returnDate}</p>  
            </li>
          ))}
        </ul>
      </div>)
  );}
export default BorrowRecord;
