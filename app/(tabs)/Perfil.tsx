import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PerfilOption from "../../Components/BoxPerfil";
import LogoutButton from "../../Components/LogoutButton";
import PerfilHeader from "../../Components/PerfilHeader";
import { useApp } from "../../Contexts/UserApp";
import { useAuth } from "../../Contexts/AuthContext";

const Perfil = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useApp();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <PerfilHeader name={user?.nome} email={user?.email} />

      <View style={styles.optionsContainer}>
        <PerfilOption
          title="Informação Pessoal"
          icon="person"
          onPress={() => router.push("/Cadastro")}
        />
      </View>

      <LogoutButton onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101422",
    padding: 24,
  },
  optionsContainer: {
    marginTop: 30,
  },
});

export default Perfil;
