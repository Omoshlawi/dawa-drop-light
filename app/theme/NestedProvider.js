import { useTheme, PaperProvider, DefaultTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NestedProvider = ({ children }) => {
  const theme = useTheme();
  return (
    <PaperProvider
      settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, ...theme.colors },
        roundness: theme.roundness,
        dark: theme.dark,
        fonts: { ...DefaultTheme.fonts, ...theme.fonts },
        mode: theme.mode,
        version: theme.version,
      }}
    >
      {children}
    </PaperProvider>
  );
};

export default NestedProvider;
