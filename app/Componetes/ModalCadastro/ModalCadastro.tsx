import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

const ModalCadastro = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.container}>
          <Text>coe Matheus </Text>
        </View>
      </Modal>

      <Text style={styles.texbtn} onPress={() => setShowModal(!showModal)}>
        Cadastre
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "70%",
    backgroundColor: "#1A1F2E",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },

  texbtn: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2559F4",
  },
});

export default ModalCadastro;
