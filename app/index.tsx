import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "../global.css";
import TodoCard from "@/components/Todo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useTodoStore, Todo, TodoPriority } from "../store/taskStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureNotifications } from "@/store/notifs";

export default function Index() {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const { addTodo, todos, error, checkAsyncStorage } = useTodoStore();

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  useEffect(() => {
    configureNotifications();
    checkAsyncStorage();
  }, []);

  return (
    <SafeAreaView className="bg-[#1b2129] w-screen h-full">
      <View className="flex-row items-center justify-between px-5 py-3">
        <TextInput
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          placeholder="Enter new todo"
          className="flex-1 bg-gray-700 text-white px-4 py-3.5 rounded-lg placeholder:text-gray-400 text-lg"
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className="bg-sky-500 px-5 py-3 rounded-lg ml-3"
        >
          <Text className="text-white text-xl font-extrabold">+</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-gray-200 text-2xl font-mono text-center my-3 tracking-[1px]">
        - Your Tasks -
      </Text>
      <GestureHandlerRootView>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard
              title={item.title}
              isFinished={item.isFinished}
              createdAt={item.createdAt}
              id={item.id}
              priority={item.priority}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex items-center justify-center px-5 py-3 gap-2 mt-32">
              <Image
                source={require("../assets/images/todolist.png")}
                className="w-64 h-64 rounded-full bg-slate-200"
                resizeMode="contain"
              />
              <Text className="text-gray-400 text-md font-thin text-center mt-3 tracking-[1px]">
                No tasks found. Add your first task!
              </Text>
            </View>
          }
        />
      </GestureHandlerRootView>

      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
    </SafeAreaView>
  );
}
