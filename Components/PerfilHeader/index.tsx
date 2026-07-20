import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

type PerfilHeaderProps = {
  name?: string;
  email?: string;
  avatarSource?: ImageSourcePropType;
  onEditPress?: () => void;
};

const PerfilHeader = ({
  name = "Matheus Abraão",
  email = "mdm.matheusswat@gmail.com",
  avatarSource = require("../../assets/images/avatar.png"),
  onEditPress,
}: PerfilHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.boxImg}>
        <Image style={styles.img} source={avatarSource} />
      </View>

      <Pressable style={styles.boxEdit} onPress={onEditPress} hitSlop={8}>
        <MaterialIcons name="edit" size={14} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.textName}>{name}</Text>
      <Text style={styles.textEmail}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxImg: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "#3B82F620",
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 100,
  },
  boxEdit: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#111420",
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "55%",
    bottom: "40%",
  },
  textName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  textEmail: {
    fontSize: 14,
    color: "#94A3B8",
  },
});

export default PerfilHeader;
