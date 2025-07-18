import Book from './components/Book.js';
import './App.css';
import Student from './components/Student.js';
import Author from './components/Author.js';
import Category from './components/Category.js';
import BookCategory from './components/BookCategory.js';
import BorrowRecord from './components/BorrowRecord.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LibraryHomepage from './components/LibraryHomePage.js';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LibraryHomepage/>} />
      <Route path="/book" element={<Book/>} />
      <Route path="/student" element={<Student/>} />
      <Route path="/author" element={<Author/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/bookcategory" element={<BookCategory/>} />
      <Route path="/borrowrecord" element={<BorrowRecord/>} />
      </Routes>
      </Router>
  );
}

export default App;
