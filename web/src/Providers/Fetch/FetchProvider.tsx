import React, { createContext, useContext, useState } from 'react';

interface FetchContextProps {
  doGet(url: string): any;
  doPost(url: string, data: any): any;
}

type Props = {
  children?: React.ReactNode;
};

export const FetchContext = createContext<FetchContextProps>({
  doGet(url: string) {},
  doPost(url: string, data: any) {},
});

export const useFetch = () => {
  const context = useContext(FetchContext);

  if (context === undefined) {
    throw new Error('useFetch must be used within FetchContext');
  }

  return context;
};

export default function FetchProvider({ children }: Props) {
  function doGet(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  function doPost(url: string, data: any) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  return (
    <FetchContext.Provider value={{ doGet, doPost }}>
      {children}
    </FetchContext.Provider>
  );
}
