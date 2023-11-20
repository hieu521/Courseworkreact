import React, { useState, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Text} from "../../../components/typography/text.components"
import { Spacer } from "../../../components/spacer/spacer.component";
import { getObservation,getObservationById,updateObservation as updateApi, deleteObservation,createObservation} from "../../../services/observations/observation.services";
// Ví dụ về dữ liệu observation

export const UpSert = ({ onClose, updateObservation,hiking, loadObservation }) =>{
  let initalValue = updateObservation !== undefined ?{
    name : updateObservation.name,
    time: new Date(updateObservation.time),
    comment: updateObservation.comment,
    hikeId: hiking.id,

  }:{
    name : "",
    time: new Date(),
    comment: "",
    hikeId: hiking.id,

  }
  const [formData, setFormData] = useState(initalValue);
  const [errors,setErrors]=useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleInputChange = (field ,value)=>{
    setFormData ({...formData, [field]:value});
  };
  const handleDateChange = (event,selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate ){
      setFormData({...formData, time: selectedDate})
    }
  };
  const handleSubmit = ()=>{
    //perform data validation here
    const validationErrors = {};

    //
    if(!formData.name){
      validation.name = "Name is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0){
      if(updateObservation == undefined){
        createObservation(formData).then(()=>{
          loadObservation();
        });
      }else{
        updateApi(updateObservation.id,formData).then(()=>{
          loadObservation();

        });
      }
      alert ("Form submitted successfully");
      onClose();
    }
  };
  return (
    <ScrollView>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) =>handleInputChange("name",text)}
        error={!!errors.name}
        style={styles.textInput}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <Spacer position="bottom" size="medium" />
      <TextInput
        label="Time"
        value={formData.time.toLocaleDateString()}
        onFocus={()=>setShowDatePicker(true)}
        style={styles.textInput}
      />
      {showDatePicker && (
      <DateTimePicker
        value={formData.time}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
      )}
      <Spacer position="bottom" size="medium" />
    <TextInput
      label="Comment"
      onChangeText={(text) =>handleInputChange("comment",text)}
      value={formData.comment}
      error={!!errors.comment}
      style={styles.textInput}
    />
    {errors.comment && <Text style={styles.error}>{errors.comment}</Text>}
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
    