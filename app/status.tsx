import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTodoStore, Todo, TodoPriority } from "../store/taskStore";
import TodoCard from "@/components/Todo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import priority from "./priority";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";

const StatusScreen = () => {
  const { getCompletedTodos, getPendingTodos, checkAsyncStorage } =
    useTodoStore();

  useEffect(() => {
    checkAsyncStorage();
  }, []);

  const completedTodos = getCompletedTodos();
  const pendingTodos = getPendingTodos();

  return (
    <SafeAreaView className="bg-[#1b2129] w-screen h-full">
      <ScrollView>
        <View className="flex-row items-center justify-center px-5 py-3 gap-2">
          <Text className="text-gray-200 text-2xl font-mono text-center my-3 tracking-[1px]">
            Pending Tasks{" "}
          </Text>
          <MaterialIcons name="radio-button-unchecked" size={22} color="grey" />
        </View>
        {pendingTodos.length === 0 ? (
          <View className="flex items-center justify-center px-5 py-3 gap-2">
            <Image
              source={require("../assets/images/completed.png")}
              className="w-48 h-48 rounded-full bg-slate-200"
              resizeMode="contain"
            />
            <Text className="text-gray-400 text-md font-thin  text-center mt-3 tracking-[1px]">
              All tasks are completed!{" "}
            </Text>
            <Text className="text-gray-400 text-md font-thin  text-center -mt-2 mb-3 tracking-[1px]">
              No pending tasks left.
            </Text>
          </View>
        ) : (
          pendingTodos.map(({ priority, title, createdAt, id, isFinished }) => (
            <View
              key={id}
              className={` py-5 px-5 flex items-center justify-between bg-gray-800 rounded-2xl mx-3 mb-3 shadow-xl shadow-black flex-row border-l-8 ${
                priority === TodoPriority.HIGH
                  ? "border-green-500"
                  : priority === TodoPriority.MEDIUM
                  ? "border-yellow-500"
                  : priority === TodoPriority.LOW
                  ? "border-orange-600"
                  : "border-gray-800"
              } `}
            >
              <View className="flex-1 ">
                <Text
                  className={` ${
                    isFinished ? "text-gray-500" : "text-sky-300"
                  } text-sm font-light tracking-[1px] ps-2 pb-1`}
                >
                  {format(createdAt, "do MMM yyyy, HH:mm")}
                </Text>
                <Text
                  className="text-white text-lg tracking-[1px] ps-2"
                  style={{
                    textDecorationLine: isFinished ? "line-through" : "none",
                    color: isFinished ? "grey" : "white",
                  }}
                >
                  {title}
                </Text>
              </View>
            </View>
          ))
        )}
        <View className="flex-row items-center justify-center px-5 py-3 gap-2">
          <Text className="text-gray-200 text-2xl font-mono text-center my-3 tracking-[1px]">
            Completed Tasks{" "}
          </Text>
          <AntDesign name="checkcircle" size={22} color="#00cc00" />
        </View>
        {completedTodos.length === 0 ? (
          <View className="flex items-center justify-center px-5 py-3 gap-2">
            <Image
              source={require("../assets/images/pending.png")}
              className="w-48 h-48 rounded-full bg-slate-200"
              resizeMode="contain"
            />
            <Text className="text-gray-400 text-md font-thin  text-center mt-3 tracking-[1px]">
              No tasks completed yet!
            </Text>
            <Text className="text-gray-400 text-md font-thin  text-center -mt-2 mb-3 tracking-[1px]">
              Start doing them now.
            </Text>
          </View>
        ) : (
          completedTodos.map(
            ({ priority, title, createdAt, id, isFinished }) => (
              <View
                key={id}
                className={` py-5 px-5 flex items-center justify-between bg-gray-800 rounded-2xl mx-3 mb-3 shadow-xl shadow-black flex-row border-l-8 ${
                  priority === TodoPriority.HIGH
                    ? "border-green-500"
                    : priority === TodoPriority.MEDIUM
                    ? "border-yellow-500"
                    : priority === TodoPriority.LOW
                    ? "border-orange-600"
                    : "border-gray-800"
                } `}
              >
                <View className="flex-1 ">
                  <Text
                    className={` ${
                      isFinished ? "text-gray-500" : "text-sky-300"
                    } text-sm font-light tracking-[1px] ps-2 pb-1`}
                  >
                    {format(createdAt, "do MMM yyyy, HH:mm")}
                  </Text>
                  <Text
                    className="text-white text-lg tracking-[1px] ps-2"
                    style={{
                      textDecorationLine: isFinished ? "line-through" : "none",
                      color: isFinished ? "grey" : "white",
                    }}
                  >
                    {title}
                  </Text>
                </View>
              </View>
            )
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatusScreen;
