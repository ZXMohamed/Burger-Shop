import { useEffect, useRef } from 'react';

const useUpdateEffect = (callback, dependencies) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return callback();
    } else {
      isMounted.current = true;
    }
  }, dependencies);
};

export default useUpdateEffect;