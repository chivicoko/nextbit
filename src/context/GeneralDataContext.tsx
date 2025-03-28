"use client";

import { usePathname, useRouter } from 'next/navigation';
import { currentUserInfo, INITIAL_GENERAL_DATA } from '../data/base';
import { GeneralDataProps, UserDataProps } from '../types/base';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode';

interface GeneralDataContextType {
  currentData: GeneralDataProps;
  setCurrentData: (data: GeneralDataProps) => void;
  currentUserData: UserDataProps;
  setCurrentUserData: (data: UserDataProps) => void;
  loggedInUser: {email: string, password: string, first_name: string, last_name: string};
  setLoggedInUser: (data: {email: string, password: string, first_name: string, last_name: string}) => void;
  currentTab: string;
  updateGeneralData: (url: string) => void;
  dropLoggedInUserInfo: () => void;
}

const GeneralDataContext = createContext<GeneralDataContextType | undefined>(undefined);

export const GeneralDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<GeneralDataProps>(INITIAL_GENERAL_DATA);
  const [currentUserData, setCurrentUserData] = useState<UserDataProps>(currentUserInfo);
  const [loggedInUser, setLoggedInUser] = useState<{
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }>({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  
  const router = useRouter();
  const pathName = usePathname();  

  useEffect(() => {
    const storedData = localStorage.getItem('currentData');
    if (storedData) {
      setCurrentData(JSON.parse(storedData));
    }

    const currentUserData = localStorage.getItem('userData');
    if (currentUserData) {
      setCurrentUserData(JSON.parse(currentUserData));
    }

    const loggedInUserData = localStorage.getItem('loggedInUserInfo');
    if (loggedInUserData) {
      setLoggedInUser(JSON.parse(loggedInUserData));
    }
    
    // if ((pathName === '/' || pathName === '/api-docs' || pathName === '/contact-support' || pathName === '/whatsapp') && !loggedInUserData) {
    //   router.push('/login');
    // };
    
    // console.log(loggedInUserData);
  }, [pathName, router]);
  
  const updateGeneralData = (url: string) => {
    // setCurrentData({currentTab: url});
    localStorage.setItem('currentData', JSON.stringify({currentTab: url}));
  };
  
  const dropLoggedInUserInfo = () => {
    setLoggedInUser({
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    });

    localStorage.removeItem('loggedInUserInfo');
  };

  // const getCurrentUser = () => {
  //   // Retrieve the token from the cookies (you can use a package like 'cookie' or 'nookies')
  //   const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];

  //   if (!token) return null;

  //   try {
  //     const decoded: DecodedToken = jwtDecode(token);
  //     return decoded; // This will return the decoded token with user details
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // };

  // const currentUser = getCurrentUser();
  // console.log(currentUser);

  return (
    <GeneralDataContext.Provider
      value={{
        currentData,
        setCurrentData,
        currentUserData,
        setCurrentUserData,
        loggedInUser,
        setLoggedInUser,
        currentTab: currentData.currentTab,
        updateGeneralData,
        dropLoggedInUserInfo,
        // currentUser,
      }}
    >
      {children}
    </GeneralDataContext.Provider>
  );
};

export const useGeneralData = () => {
  const context = useContext(GeneralDataContext);
  if (!context) {
    throw new Error('useGeneralData must be used within a GeneralDataProvider');
  }
  return context;
};
