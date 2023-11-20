import React, { useState, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Text} from "../../../components/typography/text.components"

import { Spacer } from "../../../components/spacer/spacer.component";
import { HikingContext } from "../../../services/hikings/hiking.context";
import { Picker } from "@react-native-picker/picker";

export const UpSert = ({ onClose, updateHiking }) => {
  const { createHiking, update } = useContext(HikingContext);
  let intialValue =
    updateHiking !== undefined
      ? {
          name: updateHiking.name,
          location: updateHiking.location,
          date: new Date(updateHiking.date),
          parkingAvailable: updateHiking.parkingAvailable,
          lengthOfHike: String(updateHiking.lengthOfHike),
          level: updateHiking.level,
          description: updateHiking.description,
        }
      : {
          name: "",
          location: "",
          date: new Date(),
          parkingAvailable: false,
          lengthOfHike: "0",
          level: "Hard",
          description: "",
        };
  const [formData, setFormData] = useState(intialValue);

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };
  const pickerPackingRef = useRef();
  function openParking() {
    pickerPackingRef.current.focus();
  }
  function closeParking() {
    pickerPackingRef.current.blur();
  }
  const pickerDifficultRef = useRef();

  function openDifficult() {
    pickerDifficultRef.current.focus();
  }

  function closeDifficult() {
    pickerDifficultRef.current.blur();
  }
  const handleSubmit = () => {
    // Perform data validation here
    const validationErrors = {};
    // ...
    if (!formData.name) {
      validationErrors.name = "Name is required";
    }
    if (!formData.location) {
      validationErrors.location = "Location is required";
    }
    if (typeof formData.parkingAvailable !== "boolean") {
      validationErrors.parkingAvailable = "Parking Available is required";
    }
    if (
      !formData.lengthOfHike ||
      formData.lengthOfHike < 0 ||
      typeof formData.lengthOfHike !== "number"
    ) {
      validationErrors.lengthOfHike =
        "Length of hike are a number and required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (updateHiking == undefined) {
        createHiking(formData);
      } else {
        update(updateHiking.id, formData);
      }
      alert("Form submitted successfully");
      onClose();
    }
  };

  return (
    <ScrollView>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        error={!!errors.name}
        style={styles.textInput}
      />
      {errors.name && <Text variant="error">{errors.name}</Text>}
      <Spacer position="bottom" size="medium" />
      <TextInput
        label="Location"
        value={formData.location}
        onChangeText={(text) => handleInputChange("location", text)}
        error={!!errors.location}
        style={styles.textInput}
      />
      {errors.location && <Text variant="error">{errors.location}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* Date input */}
      <TextInput
        label="Date"
        value={formData.date.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.textInput}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Spacer position="bottom" size="medium" />
      {/* ParkingAvailable input */}
      <TextInput
        label="Parking Available "
        value={formData.parkingAvailable ? "YES" : "No"}
        error={!!errors.parkingAvailable}
        onFocus={() => openParking()}
        onBlur={() => closeParking()}
        style={styles.textInput}
      />
      <View style={{ display: "none" }}>
        <Picker
          ref={pickerPackingRef}
          selectedValue={formData.parkingAvailable}
          onValueChange={(itemValue, itemIndex) =>
            setFormData({ ...formData, parkingAvailable: itemValue === "true" })
          }
        >
          <Picker.Item label="Please Choose Option" value="" />
          <Picker.Item label="Yes" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

      {errors.parkingAvailable  && <Text variant="error">{errors.parkingAvailable}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* LengthOfHike input */}
      <TextInput
        label="Length Of Hike "
        value={formData.lengthOfHike}
        onChangeText={(text) => handleInputChange("lengthOfHike", Number(text))}
        error={!!errors.lengthOfHike}
        style={styles.textInput}
      />
      {errors.lengthOfHike &&  <Text variant="error">{errors.lengthOfHike}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* LengthOfHike input */}
      <TextInput
        label="Difficult Level"
        value={formData.level}
        onFocus={() => openDifficult()}
        onBlur={() => closeDifficult()}
        error={!!errors.level}
        style={styles.textInput}
      />
      {errors.difficultLevel && (
        <Text variant="error">{errors.level}</Text>
      )}
      <Spacer position="bottom" size="medium" />
      {/* Description input */}
      <View style={{ display: "none" }}>
        <Picker
          ref={pickerDifficultRef}
          selectedValue={formData.level}
          onValueChange={(itemValue, itemIndex) =>
            setFormData({ ...formData, level: itemValue })
          }
        >
          <Picker.Item label="Hard" value="Hard" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>
      <Spacer position="bottom" size="medium" />
      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        error={!!errors.description}
        style={styles.textInput}
      />
      {errors.description && <Text>{errors.description}</Text>}
      <Spacer position="bottom" size="medium" />
      <Button
        style={styles.buttonSubmit}
        mode="contained"
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
  },
  buttonSubmit: {
    backgroundColor: "blue",
  },
});
