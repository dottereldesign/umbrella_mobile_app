import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { Button, Alert, Linking, Platform } from "react-native"; // Import the necessary modules

import { useColorScheme } from "@/hooks/useColorScheme";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../services/NotificationService"; // Adjust the path if needed

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Function to open the notification settings
async function openNotificationSettings() {
  if (Platform.OS === "android") {
    await Linking.openSettings(); // Open the app settings where the user can enable notifications
  } else {
    Alert.alert("Notification settings are not accessible on this platform.");
  }
}

// Add the notification permissions check function
async function checkNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Notifications Disabled",
      "Notifications are not enabled for this app. Please enable them in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => openNotificationSettings() },
      ]
    );
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // Check notification permissions
    checkNotificationPermissions();

    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token); // Only set if token is valid
      }
    });

    // Listener for receiving notifications while the app is running
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    // Listener for handling interaction with notifications
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Button
        title="Test Notification"
        onPress={async () => {
          console.log("Button clicked"); // Log when the button is clicked
          await schedulePushNotification();
        }}
      />
    </ThemeProvider>
  );
}
