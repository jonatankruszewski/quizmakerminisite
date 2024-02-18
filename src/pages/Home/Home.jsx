import React, {useContext} from 'react';
import SearchQuiz from '../../components/SearchQuiz/SearchQuiz.jsx';
import QuizQuestions from '../../components/QuizQuestions/QuizQuestions.jsx';
import SubmitAnswersButton from '../../components/SubmitAnswersButton/SubmitAnswersButton.jsx';
import ScoreAlert from '../../components/ScoreAlert/ScoreAlert.jsx';
import AnswersProvider from '../../context/AnswersContext.jsx';

import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const Home = () => {
  const {questionsMap} = useContext(QuestionsContext);

  return (
    <AnswersProvider questionsMap={questionsMap}>
      <SearchQuiz/>
      <QuizQuestions/>
      <SubmitAnswersButton/>
      <ScoreAlert/>
    </AnswersProvider>
  );
};

export default Home;
