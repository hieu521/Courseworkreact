import React, { useState, createContext, useEffect } from "react";
import {
  getHikings,
  getHikingById,
  createHiking as create,
  updateHiking as update,
  deleteHiking as deleteApi,
  searchHiking as searchApi,
} from "./hiking.service";

export const HikingContext = createContext();

export const HikingContextProvider = ({ children }) => {
  const [hikings, setHikings] = useState([]);
  const [hiking, setHiking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadHikings();
  }, []);

  const loadHikings = () => {
    setIsLoading(true);
    getHikings()
      .then((hikings) => {
        setIsLoading(false);
        console.log(hikings);
        setHikings(hikings.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const loadHiking = (id) => {
    setIsLoading(true);
    getHikingById(id)
      .then((hikings) => {
        setIsLoading(false);
        setHiking(hikings.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const createHiking = (hiking) => {
    setIsLoading(true);
    create(hiking)
      .then((res) => {
        setIsLoading(false);
        loadHikings();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const updateHiking = (id, hiking) => {
    setIsLoading(true);
    update(id, hiking)
      .then((res) => {
        setIsLoading(false);
        loadHikings();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const deleteHiking = (id) => {
    setIsLoading(true);
    deleteApi(id)
      .then((res) => {
        setIsLoading(false);
        loadHikings();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (keyword.length === 0) {
      loadHikings();
      return;
    }

    if (!keyword.length) {
      return;
    }

    setTimeout(() => {
      searchApi(keyword)
        .then((res) => {
          setHikings(res.data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [keyword]);

  return (
    <HikingContext.Provider
      value={{
        loadHikings,
        loadHiking,
        createHiking,
        update:updateHiking,
        deleteHiking,
        hikings,
        hiking,
        isLoading,
        error,
        keyword,
        onSearch,
      }}
    >
      {children}
    </HikingContext.Provider>
  );
};
