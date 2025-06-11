import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useTodoStore, TodoPriority } from "../store/taskStore";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const PriorityScreen = () => {
  const { todos, checkAsyncStorage } = useTodoStore();

  useEffect(() => {
    checkAsyncStorage();
  }, []);

  const getTodosByPriority = (priority: TodoPriority) =>
    todos.filter((todo) => todo.priority === priority);

  const renderPriorityBlock = (
    title: string,
    priorityColor: string,
    priorityType: TodoPriority
  ) => {
    const priorityTodos = getTodosByPriority(priorityType);
    return (
      <View className="mb-6">
        <View className="flex-row items-center justify-center gap-2 px-5 py-3">
          <Text className="text-gray-200 text-2xl font-mono tracking-[1px]">
            {title}
          </Text>
        </View>
        {priorityTodos.length === 0 ? (
          <View className="items-center justify-center px-5 py-3 gap-2">
            {priorityType === TodoPriority.HIGH ? (
              <FontAwesome name="exclamation-triangle" size={50} color="red" />
            ) : priorityType === TodoPriority.MEDIUM ? (
              <View className="bg-yellow-500 rounded-full p-3 py-2">
                <FontAwesome name="minus" size={40} color="black" />
              </View>
            ) : (
              <FontAwesome name="check-circle" size={50} color="green" />
            )}
            <Text className="text-gray-400 text-md font-thin text-center mt-3 tracking-[1px]">
              No {title.toLowerCase()} tasks found.
            </Text>
          </View>
        ) : (
          priorityTodos.map(({ title, createdAt, id, isFinished }) => (
            <View
              key={id}
              className={`py-5 px-5 flex items-center justify-between bg-gray-800 rounded-2xl mx-3 mb-3 shadow-xl shadow-black flex-row border-l-8 ${priorityColor}`}
            >
              <View className="flex-1">
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
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-[#1b2129] w-screen h-full">
      <ScrollView>
        {renderPriorityBlock(
          "High Priority",
          "border-green-500",
          TodoPriority.HIGH
        )}
        {renderPriorityBlock(
          "Medium Priority",
          "border-yellow-500",
          TodoPriority.MEDIUM
        )}
        {renderPriorityBlock(
          "Low Priority",
          "border-orange-600",
          TodoPriority.LOW
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriorityScreen;
