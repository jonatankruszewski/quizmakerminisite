import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SearchQuiz from './components/SearchQuiz.jsx';
import {Navigate} from 'react-router';

const App = () => {

  return (
    <Routes>
      {/* <Route path='/quizmakerminisite'>*/}
      {/*  <Redirect/>*/}
      {/* </Route>*/}
      <Route path='/quizmakerminisite/'>
        <Route index element={<SearchQuiz/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/quizmakerminisite/" replace/>}/>
    </Routes>
  );
};

export default App;
