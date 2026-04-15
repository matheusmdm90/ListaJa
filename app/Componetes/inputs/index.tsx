import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface inputs {
  nomeInput?: string;
  placeholder: string;
  IconName?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Inputs = ({
  placeholder,
  IconName,
  nomeInput,
  value,
  onChangeText,
}: inputs) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const isPasswordField =
    nomeInput === "Senha" ||
    nomeInput === "Confirme sua senha" ||
    nomeInput === "Passwold" ||
    nomeInput === "Confirme seu Passwold";

  return (
    <View>
      <Text style={styles.inputText}>{nomeInput}</Text>

      <View style={styles.boxInput}>
        {IconName && (
          <MaterialIcons name={IconName} size={20} color={"#FFFFFF30"} />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#FFFFFF30"}
          style={styles.input}
          secureTextEntry={isPasswordField && !mostrarSenha}
          value={value}
          onChangeText={onChangeText}
        />
        {isPasswordField && (
          <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
            <MaterialIcons
              name={mostrarSenha ? "visibility" : "visibility-off"}
              size={20}
              color={"#FFFFFF30"}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    width: 350,
    height: 56,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "#FFFFFF40",
    backgroundColor: "#FFFFFF20",
    paddingHorizontal: 10,
    color: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  input: {
    width: 260,
    fontSize: 16,
    color: "#ffff",
  },

  inputText: {
    color: "#FFFFFF70",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default Inputs;
