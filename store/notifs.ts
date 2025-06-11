import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

export async function configureNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Notification permissions not granted!");
  }

  // Android: Create notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("todo-reminders", {
      name: "Todo Reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

// Schedule a local notification
export async function scheduleTodoNotification(
  taskId: string,
  taskTitle: string,
  delaySeconds: number
) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder 🕒",
      body: `Time to complete: ${taskTitle}`,
      sound: true,
    },
    trigger: {
      seconds: delaySeconds,
      channelId: "default",
    },
  });

  return identifier; // Save this to cancel later
}

// Cancel a scheduled notification (bonus)
export async function cancelNotification(identifier: string) {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}
