import React, {useContext} from 'react';
import SearchQuiz from '../../components/SearchQuiz/SearchQuiz.jsx';
import ShowResults from '../../components/ShowResults/ShowResults.jsx';
import SubmitAnswersButton from '../../components/SubmitAnswersButton/SubmitAnswersButton.jsx';
import AnswersProvider from '../../context/AnswersContext.jsx';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const Home = () => {
  const {questionsMap} = useContext(QuestionsContext);

  return (
    <AnswersProvider questionsMap={questionsMap}>
      <SearchQuiz/>
      <ShowResults/>
      <SubmitAnswersButton/>
    </AnswersProvider>
  );
};

export default Home;
