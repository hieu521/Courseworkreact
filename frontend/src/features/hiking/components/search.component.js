import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { HikingContext } from "../../../services/hikings/hiking.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { onSearch, keyword } = useContext(HikingContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  //   useEffect(() => {
  //     console.log(searchKeyword);
  //   }, [searchKeyword]);

  useEffect(() => { 
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon="book-search"
        placeholder="Search for hikings"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
        onSubmitEditing={() => onSearch(searchKeyword)}
      />
    </SearchContainer>
  );
};
