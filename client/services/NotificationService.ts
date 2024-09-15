// client/services/NotificationService.ts
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for notifications!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function schedulePushNotification() {
  console.log("Scheduling notification");
  if (Platform.OS === "web") {
    console.log("Push notifications are not supported on web");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification 📬",
      body: "This is a test notification!",
      data: { data: "goes here" },
    },
    trigger: { seconds: 5 },
  });
}
