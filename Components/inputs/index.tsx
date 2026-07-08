import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface inputsPropsType {
  nomeInput?: string;
  placeholder: string;
  IconName?: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
}

const Inputs = ({
  placeholder,
  IconName,
  nomeInput,
  value,
  keyboardType,
  onChangeText,
}: inputsPropsType) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const PASSWORD_FIELD_NAMES = [
    "senha",
    "confirme sua senha",
    "password",
    "confirme seu password",
  ];

  const isPasswordField = PASSWORD_FIELD_NAMES.includes(
    nomeInput?.toLowerCase() ?? "",
  );

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
          keyboardType={keyboardType}
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
