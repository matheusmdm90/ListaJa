import { Tabs } from "expo-router";

const tabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60, // altura da barra de tabs (diminuir)
          paddingBottom: 5, // ajuste do padding inferior
          paddingTop: 2, // ajuste do padding superior
        },
        tabBarLabelStyle: {
          fontSize: 12, // diminui o tamanho do texto do label
        },
        tabBarIconStyle: {
          marginTop: 5, // ajusta a posição do ícone
        },
      }}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Concluidos" />
      <Tabs.Screen name="Perfil" />
    </Tabs>
  );
};
export default tabsLayout;
