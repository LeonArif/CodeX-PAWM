import React from 'react';
import Home from './components/Home';
import PythonHome from './components/PythonHome';

function App() {
  if (window.location.pathname === "/pyHome") {
    return <PythonHome />;
  }
  // Default: Home
  return <Home />;
}


export default App;