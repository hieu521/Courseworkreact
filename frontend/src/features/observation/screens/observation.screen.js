import React, { useContext, useState, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FlatList } from "react-native";
import {getObservation} from "../../../services/observations/observation.services"
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {ObservationInfoCard} from "../components/observation-info-card.component"
import { Modal } from "react-native-paper";
import { UpSert, updateObservation} from "../components/upSert.components";



const ObservationScreen = ({ route }) => {
  const { hiking } = route.params;
  const [observation, setObservation] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateObservation, setUpdateObservation] = useState(false);

  useEffect(() => {
    loadObservation();
  }, []);

  const loadObservation = () => {
    getObservation(hiking.id).then((res) => {
      setObservation(res.data);
    });
  };
  const shownModal = ()=>setVisible(true);
  const hideModal = ()=>setVisible(false);

  const onUpdate  =(observation)=>{
    setUpdateObservation(observation);
    shownModal();
  };
  const onCreate = () =>{
    setUpdateObservation(undefined);
    shownModal();
  }

  return (
    <SafeArea>
      <Text
       style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: 30,
        color: "green",
      }}
      >
        {hiking.name}
      </Text>
      <Spacer position="bottom" size="large"></Spacer>
      {observation.length > 0 ? (
        <FlatList
          data={observation}
          renderItem={({ item }) => (
            <Spacer position="bottom " size="medium">
              <ObservationInfoCard
                onUpdate={onUpdate}
                loadObservation={loadObservation}
                observation={item}
              />
            </Spacer>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>No Observation</Text>
      )}
      <TouchableOpacity onPress={onCreate} style = {styles.createButton}>
        <Text style = {styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.containerStyle}
      >
        <UpSert 
          loadObservation={loadObservation}
          updateObservation={updateObservation}
          hiking={hiking}
          onClose={()=> setVisible(false)}

        />
      </Modal>

    </SafeArea>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    width: 300,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
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
    margin: 20,
  },
});
export default ObservationScreen;
