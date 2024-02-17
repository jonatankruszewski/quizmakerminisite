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
  const {data, isLoading, isError} = useFetch(query);
  const questions = _.get(data, 'results', []);

  console.log('questions', questions);
  
  return (
    <QuestionsContext.Provider value={{query, setQuery, questions, isLoading, isError}}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
