import React, {createContext, useState} from 'react';
import _ from 'lodash';

const initialValues = {
  query: '',
  setQuery: () => { },
  data: {},
  isLoading: false,
  isError: false,
};

export const AnswersContext = createContext(initialValues);

const AnswersProvider = ({children, questionsMap}) => {
  const totalAnswers = _.size(questionsMap);
  const [answersMap, setAnswersMap] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasAnsweredAll = !_.isEmpty(questionsMap) && _.size(answersMap) === totalAnswers;

  return (
    <AnswersContext.Provider value={{totalAnswers, answersMap, setAnswersMap, hasSubmitted, hasAnsweredAll}}>
      {children}
    </AnswersContext.Provider>
  );
};

export default AnswersProvider;
