import React, {createContext, useEffect, useState} from 'react';
import useNamedState from '../hooks/useNamedState.jsx';
import useFetch from '../hooks/useFetch.jsx';
import _ from 'lodash';
import {v4 as uuid} from 'uuid';

const initialValues = {
  query: '',
  setQuery: () => { },
  data: {},
  isLoading: false,
  isError: false,
};

export const QuestionsContext = createContext(initialValues);

const QuestionsProvider = ({children}) => {
  const [query, setQuery] = useNamedState('', 'query');
  const [triggerID, setTriggerId] = useNamedState('', 'triggerID');
  const {data, isLoading, error} = useFetch(`${query}`, {}, 500, [triggerID]);
  const [questionsMap, setQuestionsMap] = useState(data);

  useEffect(() => {
    if (!data) {
      setQuestionsMap(null);
    }

    const newQuestionsMap = _.chain(data)
      .get('results', [])
      .map(question => ({
          ...question,
          id: uuid(),
          randomizedAnswers: _.shuffle([...question.incorrect_answers, question.correct_answer]),
          selectedAnswer: null,
        }
      ))
      .keyBy('id')
      .value();

    setQuestionsMap(newQuestionsMap);
  }, [data]);

  const questions = _.get(data, 'results', []);
  const totalQuestions = _.size(questionsMap);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasAnsweredAll = !_.isEmpty(questionsMap) && _.chain(questionsMap).every(({selectedAnswer}) => selectedAnswer).value();

  const amountOfRightAnswers = _.chain(questionsMap)
    .map(question => question.selectedAnswer === question.correct_answer)
    .filter(Boolean)
    .size()
    .value();

  const updateSelectedAnswer = (id, selectedAnswer) => {
    if (!(id in questionsMap)) {
      return;
    }

    const newQuestionsMap = _.cloneDeep(questionsMap);
    newQuestionsMap[id].selectedAnswer = selectedAnswer;
    setQuestionsMap(newQuestionsMap);
  };

  return (
    <QuestionsContext.Provider value={{
      query,
      setQuery,
      questions,
      isLoading,
      error,
      setTriggerId,
      questionsMap,
      totalQuestions,
      hasSubmitted,
      setHasSubmitted,
      hasAnsweredAll,
      amountOfRightAnswers,
      updateSelectedAnswer,
    }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
