import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Config {
  apiEndpoint: string;
  featureFlag: boolean;
}

interface ConfigContextType {
  config: Config | null;
  setConfig: (config: Config) => void;
}

export const ConfigContext = createContext<ConfigContextType>({
  config: null,
  setConfig: () => {},
});

interface ConfigProviderProps {
  children: ReactNode;
}

const CONFIG_KEY = 'app_config';

export const ConfigProvider: React.FC<ConfigProviderProps> = ({children}) => {
  const [config, setConfigState] = useState<Config | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const localConfig = await AsyncStorage.getItem(CONFIG_KEY);
        if (localConfig) {
          setConfigState(JSON.parse(localConfig));
        } else {
          const response = await fetch('https://example.com/config');
          const remoteConfig: Config = await response.json();
          await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(remoteConfig));
          setConfigState(remoteConfig);
        }
      } catch (error) {
        console.error('Failed to fetch config:', error);
      }
    };

    fetchConfig();
  }, []);

  const setConfig = async (newConfig: Config) => {
    setConfigState(newConfig);
    await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
  };

  return (
    <ConfigContext.Provider value={{config, setConfig}}>
      {children}
    </ConfigContext.Provider>
  );
};
