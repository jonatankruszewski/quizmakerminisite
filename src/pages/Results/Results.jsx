import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import QuizQuestions from '../../components/QuizQuestions/QuizQuestions.jsx';
import ScoreAlert from '../../components/ScoreAlert/ScoreAlert.jsx';

const Results = () => {
  const navigate = useNavigate();

  const {hasSubmitted} = useContext(AnswersContext);


  useEffect(() => {
    if (!hasSubmitted) {
      navigate('/quizmakerminisite/');
    }
  }, [hasSubmitted, navigate]);

  return (
    <>
      <QuizQuestions/>
      <ScoreAlert/>
    </>
  );
};
export default Results;
