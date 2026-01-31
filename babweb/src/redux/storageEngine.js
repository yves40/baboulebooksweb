"use client";

// https://medium.com/@bari.ab06/fixing-the-redux-persist-failed-to-create-sync-storage-error-in-next-js-9d7a00bc4abf

import storage from 'redux-persist/lib/storage';

const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const storageEngine = typeof window !== 'undefined' ? storage : createNoopStorage();

export default storageEngine;
