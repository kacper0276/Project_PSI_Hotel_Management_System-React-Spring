// NetworkInfoProvider.tsx
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';

interface NetworkInfoContextType {
  ipAddress: string | null;
  macAddress: string | null;
}

export const NetworkInfoContext = createContext<NetworkInfoContextType>({
  ipAddress: null,
  macAddress: null,
});

interface NetworkInfoProviderProps {
  children: ReactNode;
}

export const NetworkInfoProvider: React.FC<NetworkInfoProviderProps> = ({
  children,
}) => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [macAddress, setMacAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      const ip = await NetworkInfo.getIPAddress();
      setIpAddress(ip);

      const mac = await DeviceInfo.getMacAddress();
      setMacAddress(mac);
    };

    fetchNetworkInfo();
  }, []);

  return (
    <NetworkInfoContext.Provider value={{ipAddress, macAddress}}>
      {children}
    </NetworkInfoContext.Provider>
  );
};
