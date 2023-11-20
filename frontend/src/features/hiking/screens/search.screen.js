import React, { useContext, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatList } from "react-native";
import { HikingContext } from "../../../services/hikings/hiking.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { HikingInfoCard } from "../components/hiking-info-card.component";
import styled from "styled-components";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Modal } from "react-native-paper";
import { UpSert } from "../components/upSert.component";

const SearchScreen = ({navigation}) => {
  const { hikings } = useContext(HikingContext);

  const showModal = () => setVisible(true);

  const onUpdate = (hiking) => {
    setUpdateHiking(hiking);
    showModal();
  }

  return (
    <SafeArea>
      <Search />
      <FlatList
        data={hikings}
        renderItem={({ item }) => (

          <Spacer position="bottom" size="medium">
            <HikingInfoCard onUpdate={onUpdate} hiking={item} />
          </Spacer>
          
          
        )}
        keyExtractor={(item) => item.id}
      />
     
      
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "green",
    borderRadius: 50,
    width: 65,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SearchScreen;
