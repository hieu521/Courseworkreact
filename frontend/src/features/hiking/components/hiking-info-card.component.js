import React, { useContext } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { Text,StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Ionicons,FontAwesome5 } from "@expo/vector-icons";

import images from "./images";

import {
  HikingCard,
  HikingCardCover,
  Info,
  Rating,
  Section,
  HikingTitle,
  HikingDifficultLevel,
  HikingDate,
  DeleteBtn,
} from "./hiking-info-card.styles";

import { HikingContext } from "../../../services/hikings/hiking.context";


export const HikingInfoCard = ({ onUpdate,hiking = {} }) => {
  const ratingArray = Array.from(new Array(Math.floor(5)));
  let randomNumber = Math.floor(Math.random() * 4);

  const { deleteHiking } = useContext(HikingContext);

  const onDelete = () =>{
    Alert.alert('Confirm', 'Do You Want To Delete This?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteHiking(hiking.id)},
    ]);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + "-" + day + "-" + year;
  };

  return (
    <HikingCard elevation={5}>
      <View>
        <HikingCardCover source={{ uri: images[randomNumber] }} />
      </View>
      <Info>
        <HikingTitle varient="label">{hiking.name}</HikingTitle>
        <Section>
          <HikingDate varient="body">
            Packing Available: {hiking.parkingAvailable ? "YES" : "NO"}
          </HikingDate>
        </Section>
        <Section>
          <HikingDate varient="body">
            Date: {formatDate(hiking.date)}
          </HikingDate>
          <HikingDifficultLevel varient="hint">
            Difficult Level: {hiking.level}
          </HikingDifficultLevel>
        </Section>
        <Section>
          <HikingDate varient="body">
            Length Of Hike: {hiking.lengthOfHike}
          </HikingDate>
          <HikingDifficultLevel varient="hint">
            Location: {hiking.location}
          </HikingDifficultLevel>
        </Section>
        <Section>
          <HikingDate varient="body">
            Description: {hiking.description}
          </HikingDate>
        </Section>
        <View style={styles.container}>
        <TouchableOpacity 
      onPress={() => onUpdate(hiking)}
      style={styles.buttonUpdate}
    >
      <Ionicons name="md-create" size={24} color="white" />
      <Text style={styles.buttonText}> Update</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      onPress={onDelete} 
      style={styles.buttonDelete}
    >
      <Ionicons name="md-trash" size={24} color="white" />
      <Text style={styles.buttonText}> Delete</Text>
    </TouchableOpacity>
          {/* <DeleteBtn
          onPress={onDelete}
          title="Delete"
          color="#fc0303"
        ></DeleteBtn> */}
        </View>
       
      </Info>
    </HikingCard>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Space evenly between children
    paddingHorizontal: 10, // Add some padding for spacing
  },
  buttonUpdate: {
    flex: 1, // Each button takes an equal share of the available space
    backgroundColor: "aquamarine", // Change the background color as needed
    padding: 10,
    margin: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDelete: {
    flex: 1, // Each button takes an equal share of the available space
    backgroundColor: "red", // Change the background color as needed
    padding: 10,
    margin: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Change the text color as needed
    fontWeight: "bold",
  },
})