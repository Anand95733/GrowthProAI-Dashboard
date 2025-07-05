// frontend/src/hooks/useBusinessData.js

import { useContext } from 'react';
import { BusinessDataContext } from '../context/BusinessDataContext';

export const useBusinessData = () => {
  return useContext(BusinessDataContext);
};