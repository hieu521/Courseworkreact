import React, { useContext, useState } from "react";
import { View, Alert } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { deleteObservation } from "../../../services/observations/observation.services";

import {
  ObservationCard,
  Info,
  Section,
  ObservationName,
  ObservationComment,
  ObservationDate,
} from "./observation-info-card.styles";

export const ObservationInfoCard = ({ loadObservation, onUpdate, observation = {} }) => {
  const onDelete = () => {
    Alert.alert("Confirm", "Do You Want To Delete This?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          deleteObservation(observation.id).then((res) => {
            loadObservation();
          }),
      },
    ]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + "-" + day + "-" + year;
  };

  return (
    <>
      <ObservationCard elevation={5}>
        <Info>
          <Section>
            <ObservationName varient="body">
              Name: {observation.name}
            </ObservationName>
            <ObservationDate varient="body">
              Date: {formatDate(observation.time)}
            </ObservationDate>
          </Section>
          <Section>
            <ObservationComment varient="body">
              Comment: {observation.comment}
            </ObservationComment>
          </Section>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => onUpdate(observation)}
              style={styles.buttonUpdate}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.buttonDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Info>
      </ObservationCard>
    </>
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
    backgroundColor: "orange", // Change the background color as needed
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
});
