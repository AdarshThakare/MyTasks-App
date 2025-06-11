import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { format } from "date-fns";
import { Todo, TodoPriority, useTodoStore } from "@/store/taskStore";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TodoCard = ({ title, isFinished, createdAt, id }: Todo) => {
  const { toggleTodo, deleteTodo, updateTodoPriority } = useTodoStore();
  const [selectedPriority, setSelectedPriority] = useState<TodoPriority>();

  const handleDeleteTodo = (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTodo(id) },
    ]);
  };
  const leftActions = (progress: any, dragX: any) => {
    return (
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => {
            selectedPriority !== TodoPriority.HIGH &&
              setSelectedPriority(TodoPriority.HIGH);
            updateTodoPriority(id, TodoPriority.HIGH);
          }}
          className="bg-green-500 mb-6 ml-3 mt-2 mx-0 h-24 rounded-l-xl justify-center items-center w-10"
        >
          <Text className="text-md tracking-wider font-bold">T</Text>
          <Text className="text-md tracking-wider font-bold">O</Text>
          <Text className="text-md tracking-wider font-bold">P</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectedPriority !== TodoPriority.MEDIUM &&
              setSelectedPriority(TodoPriority.MEDIUM);
            updateTodoPriority(id, TodoPriority.MEDIUM);
          }}
          className="bg-yellow-500 mb-6 mt-2 mx-0 h-24 justify-center items-center w-10"
        >
          <Text className="text-md tracking-wider font-bold">M</Text>
          <Text className="text-md tracking-wider font-bold">E</Text>
          <Text className="text-md tracking-wider font-bold">D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectedPriority !== TodoPriority.LOW &&
              setSelectedPriority(TodoPriority.LOW);
            updateTodoPriority(id, TodoPriority.LOW);
          }}
          className="bg-orange-600 mb-6 mt-2 mx-0 rounded-r-xl h-24 justify-center items-center w-10 "
        >
          <Text className="text-md tracking-wider font-bold">L</Text>
          <Text className="text-md tracking-wider font-bold">O</Text>
          <Text className="text-md tracking-wider font-bold">W</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const rightActions = (progress: any, dragX: any) => {
    return (
      <TouchableOpacity
        onPress={handleDeleteTodo.bind(null, id)}
        className="bg-red-500 mb-4 mr-2 mx-0 rounded-lg justify-center items-center w-20"
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderLeftActions={leftActions}
      renderRightActions={rightActions}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={20}
      rightThreshold={30}
    >
      <View
        className={` py-5 px-5 flex items-center justify-between bg-gray-800 rounded-2xl mx-3 mb-3 shadow-xl shadow-black flex-row border-l-8 ${
          selectedPriority === TodoPriority.HIGH
            ? "border-green-500"
            : selectedPriority === TodoPriority.MEDIUM
            ? "border-yellow-500"
            : selectedPriority === TodoPriority.LOW
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
        <TouchableOpacity
          onPress={() => {
            toggleTodo(id);
          }}
        >
          {isFinished ? (
            <AntDesign name="checkcircle" size={28} color="#00cc00" />
          ) : (
            <MaterialIcons
              name="radio-button-unchecked"
              size={28}
              color="grey"
            />
          )}
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default TodoCard;
