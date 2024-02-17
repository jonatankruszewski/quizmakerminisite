import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Navigate} from 'react-router';
import Home from './pages/Home/Home.jsx';
import Layout from './components/Layout/Layout.jsx';

const App = () => {

  return (
    <Routes>
      {/* <Route path='/quizmakerminisite'>*/}
      {/*  <Redirect/>*/}
      {/* </Route>*/}
      <Route path='/quizmakerminisite/' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/quizmakerminisite/" replace/>}/>
    </Routes>
  );
};

export default App;
