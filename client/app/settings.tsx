import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  Button,
  Platform,
  Linking,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Function to open notification settings for the app
  const openNotificationSettings = () => {
    if (Platform.OS === "android") {
      Linking.openSettings();
    } else {
      Alert.alert("Notification settings are not accessible on this platform.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Notification Settings
      </Text>

      {/* In-app toggle for enabling or disabling notifications */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => {
            setNotificationsEnabled(value);
            // Here you can also store this preference to send or mute notifications
            console.log("Notification preference changed:", value);
          }}
        />
      </View>

      {/* Button to open system notification settings */}
      <Button
        title="Manage System Notifications"
        onPress={openNotificationSettings}
      />
    </View>
  );
}
