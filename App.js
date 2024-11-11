import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification recived !!!");
        console.log(notification.request.content.data.msg);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);
  const setNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
        data: { msg: "Hello", age: 11 },
      },
      trigger: { seconds: 3 },
    });
    console.log("Notification send !!!");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={setNotificationHandler}>
        <Text style={styles.btnTxt}>Send Notif</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  btnTxt: {
    color: "white",
    fontSize: 24,
  },
});
