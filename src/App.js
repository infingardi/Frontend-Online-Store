import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import './App.css';
import { getCategories } from './services/api';

function App() {
  getCategories();
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
