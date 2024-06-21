import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import { asynStorageService } from "@/services/AsyncStorage";
import { useAppStore } from "@/stores/appStore";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const setUser = useAppStore((state) => state.setUser);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await asynStorageService.getItem("user"));
      if (user) {
        setUser(user);
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <Toast />
    </QueryClientProvider>
  );
}
