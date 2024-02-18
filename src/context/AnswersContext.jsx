import React, {createContext, useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import {QuestionsContext} from './QuestionsContext.jsx';

const initialValues = {
  query: '',
  setQuery: () => { },
  data: {},
  isLoading: false,
  isError: false,
};

export const AnswersContext = createContext(initialValues);

const AnswersProvider = ({children}) => {
  const {questionsMap} = useContext(QuestionsContext);
  const totalQuestions = _.size(questionsMap);
  const [answersMap, setAnswersMap] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasAnsweredAll = !_.isEmpty(questionsMap) && _.size(answersMap) === totalQuestions;

  const amountOfRightAnswers = _.chain(answersMap)
    .filter(element => element.isCorrect === true)
    .size().value();

  useEffect(() => {
    if (hasSubmitted) {
      const calculatedAnswers = _.chain(answersMap)
        .mapValues(
          ({selectedValue}, key) => {
            return {isCorrect: questionsMap[key].correct_answer === selectedValue, selectedValue};
          })
        .value();
      setAnswersMap(calculatedAnswers);
    }

    if (!hasSubmitted) {
      setAnswersMap({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSubmitted]);


  return (
    <AnswersContext.Provider value={{
      totalQuestions,
      setHasSubmitted,
      answersMap,
      setAnswersMap,
      hasSubmitted,
      hasAnsweredAll,
      amountOfRightAnswers,
    }}>
      {children}
    </AnswersContext.Provider>
  );
};

export default AnswersProvider;
