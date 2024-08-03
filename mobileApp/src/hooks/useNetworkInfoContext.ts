import {useContext} from 'react';
import {
  NetworkInfoContext,
  NetworkInfoContextType,
} from '../context/NetworkInfoProvider';

export const useNetworkInfoContext = (): NetworkInfoContextType => {
  return useContext(NetworkInfoContext);
};
