import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import './assets/util.css';
// import './assets/style.css';
// import './assets/style3.css';
// import './assets/style4.css';
// import './assets/main.css';

// import Header from './pages/layout/Header/Header'
import Header from './pages/layout/Header/Header';
import Footer from './pages/layout/Footer/Footer';
import Router from './Router';

// import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <Router />
      <Footer />
    </div>
  );
};

export default App;
