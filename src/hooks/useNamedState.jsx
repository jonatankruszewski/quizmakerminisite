import {useDebugValue, useState} from "react";

const useNamedState = (initialState, label) => {
  const [state, setState] = useState(initialState);
  useDebugValue(label);
  return [state, setState];
};

export default import.meta.env.PROD ? useState : useNamedState
