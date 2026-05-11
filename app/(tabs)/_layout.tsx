import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useApp } from "../../Contexts/UserApp";

const TabsLayout = () => {
  const { user } = useApp();

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55, // altura da barra de tabs (diminuir)
          paddingBottom: 5, // ajuste do padding inferior
          marginBottom: 5, // ajuste do padding superior
        },
        tabBarLabelStyle: {
          fontSize: 12, // diminui o tamanho do texto do label
        },
        tabBarIconStyle: {
          marginTop: 2, // ajusta a posição do ícone
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Concluidos"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="check-circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
