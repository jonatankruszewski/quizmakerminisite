import {createContext} from 'react';
import useNamedState from '../hooks/useNamedState.jsx';
import useFetch from '../hooks/useFetch.jsx';
import _ from 'lodash';

const initialValues = {
  query: '',
  setQuery: () => {
  },
  data: {},
  isLoading: false,
  isError: false,
};

export const QuestionsContext = createContext(initialValues);

const QuestionsProvider = ({children}) => {
  const [query, setQuery] = useNamedState('', 'query');
  const [triggerID, setTriggerId] = useNamedState('', 'triggerID');
  const {data, isLoading, error} = useFetch(`${query}`, {}, 500, [triggerID]);
  const questions = _.get(data, 'results', []);

  console.log('questions', questions);

  return (
    <QuestionsContext.Provider value={{query, setQuery, questions, isLoading, error, setTriggerId}}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
