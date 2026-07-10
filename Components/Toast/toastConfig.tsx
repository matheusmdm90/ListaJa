import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

/*
  1. Create the config
*/
export const toastConfig = {
  sucesso2: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        height: 60,
        width: "90%",
        backgroundColor: "#111420",
        borderWidth: 2,
        borderColor: "green",
        borderRadius: 20,
        paddingLeft: 20,
        paddingVertical: 10,
      }}
    >
      <View>
        <MaterialCommunityIcons
          name="check-circle"
          size={24}
          color={"#75FB4C"}
        />
      </View>
      <View>
        <Text style={{ color: "#FFFF", fontWeight: "bold" }}>{text1}</Text>
        <Text style={{ color: "#FFFF" }}>{text2}</Text>
      </View>
    </View>
  ),

  Erros: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        height: 60,
        width: "90%",
        backgroundColor: "#111420",
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 20,
        paddingLeft: 20,
        paddingVertical: 10,
      }}
    >
      <View>
        <MaterialCommunityIcons name="block-helper" size={24} color={"red"} />
      </View>
      <View>
        <Text style={{ color: "#FFFF", fontWeight: "bold" }}>{text1}</Text>
        <Text style={{ color: "#FFFF" }}>{text2}</Text>
      </View>
    </View>
  ),

  info: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        height: 60,
        width: "90%",
        backgroundColor: "#111420",
        borderWidth: 2,
        borderColor: "#3B82F6",
        borderRadius: 20,
        paddingLeft: 20,
        paddingVertical: 10,
      }}
    >
      <View>
        <MaterialCommunityIcons
          name="information-variant-circle"
          size={24}
          color={"#3B82F6"}
        />
      </View>
      <View>
        <Text style={{ color: "#FFFF", fontWeight: "bold" }}>{text1}</Text>
        <Text style={{ color: "#FFFF" }}>{text2}</Text>
      </View>
    </View>
  ),
};
