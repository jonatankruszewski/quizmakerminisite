import React from 'react';
import SearchQuiz from '../../components/SearchQuiz/SearchQuiz.jsx';
import QuizQuestions from '../../components/QuizQuestions/QuizQuestions.jsx';
import SubmitAnswersButton from '../../components/SubmitAnswersButton/SubmitAnswersButton.jsx';

const Home = () => {
  const buttonRef = React.useRef(null);

  return (
    <>
      <SearchQuiz/>
      <QuizQuestions buttonRef={buttonRef}/>
      <SubmitAnswersButton ref={buttonRef}/>
    </>
  );
};

export default Home;
