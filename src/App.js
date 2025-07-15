import Book from './components/Book.js';
import './App.css';
import Student from './components/Student.js';
import Author from './components/Author.js';
import Category from './components/Category.js';
import BookCategory from './components/BookCategory.js';
import BorrowRecord from './components/BorrowRecord.js';

function App() {
  return (
    <div className="App">
    <Book/>
    <Student/>
    <Author/>
    <Category/>
    <BookCategory/> 
    <BorrowRecord/>
    </div>
  );
}

export default App;
