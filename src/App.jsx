import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Layout from './components/Layout/Layout.jsx';
import Results from './pages/Results/Results.jsx';

const App = () => {

  return (
    <Routes>
      <Route path='/quizmakerminisite/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='results' element={<Results/>}/>
      </Route>
       <Route path="*" element={<Navigate to="/quizmakerminisite/" replace/>}/>
    </Routes>
  );
};

export default App;
