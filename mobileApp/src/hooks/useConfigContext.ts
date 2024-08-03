import {useContext} from 'react';
import {ConfigContext, ConfigContextType} from '../context/ConfigProvider';

export const useConfigContext = (): ConfigContextType => {
  return useContext(ConfigContext);
};
