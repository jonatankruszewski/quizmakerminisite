import useFetch from '../../hooks/useFetch.jsx';
import {fetchQuestionsParams, RESTUrls} from '../../constants/RESTUrls.js';
import useNamedState from '../../hooks/useNamedState.jsx';
import {useContext, useEffect} from 'react';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';
import _ from 'lodash';
import {difficulties} from '../../constants/Difficulties.js';

const useSearchQuiz = () => {
  const {isLoading, data, error} = useFetch(RESTUrls.CATEGORIES);
  const [categoryId, setCategoryId] = useNamedState('', 'category');
  const [difficulty, setDifficulty] = useNamedState('', 'difficulty');
  const {setQuery, setTriggerId} = useContext(QuestionsContext);

  useEffect(() => {
    if (!data) return;
    setCategoryId(_.get(data, ['trivia_categories', 0, 'id']));
    setDifficulty((difficulties[0].value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCategory = event => {
    setQuery('');
    setCategoryId(event.target.value);
  };

  const handleDifficulty = event => {
    setQuery('');
    setDifficulty(event.target.value);
  };

  const onSubmit = () => {
    const params = new URLSearchParams(fetchQuestionsParams);

    if (categoryId) {
      params.set('category', categoryId);
    }

    if (difficulty) {
      params.set('difficulty', difficulty);
    }

    const queryString = `${RESTUrls.FETCH_QUESTIONS}?${params.toString()}`;
    setQuery(queryString);
    setTriggerId(_.uniqueId());
  };


  const categories = _.get(data, 'trivia_categories', []);

  return {
    isLoading,
    handleCategory,
    handleDifficulty,
    onSubmit,
    error,
    categories,
    categoryId,
    difficulty,
  };
};

export default useSearchQuiz;
