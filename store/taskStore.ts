import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleTodoNotification, cancelNotification } from "./notifs";

export type Todo = {
  id: string;
  title: string;
  isFinished: boolean;
  createdAt: Date;
  priority: TodoPriority;
  notificationId?: string;
};

export enum TodoPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const PRIORITY_CONFIG = {
  [TodoPriority.HIGH]: {
    label: "High",
    color: "#ff4757",
    emoji: "🔥",
    order: 1,
  },
  [TodoPriority.MEDIUM]: {
    label: "Medium",
    color: "#ffa502",
    emoji: "⚡",
    order: 2,
  },
  [TodoPriority.LOW]: {
    label: "Low",
    color: "#2ed573",
    emoji: "🌱",
    order: 3,
  },
};

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodoPriority: (id: string, priority: TodoPriority) => void;

  getTodoById: (id: string) => Todo | undefined;
  getCompletedTodos: () => Todo[];
  getPendingTodos: () => Todo[];
  getHighPriorityTodos: () => Todo[];
  getMediumPriorityTodos: () => Todo[];
  getLowPriorityTodos: () => Todo[];
  checkAsyncStorage: () => Promise<void>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  addTodo: async (
    title: string,
    priority: TodoPriority = TodoPriority.MEDIUM
  ) => {
    if (!title.trim()) {
      set({ error: "Todo title cannot be empty" });
      return;
    }

    const id = title.trim().toLowerCase().replace(/\s+/g, "-");
    const delayMap = {
      [TodoPriority.HIGH]: 10,
      [TodoPriority.MEDIUM]: 30,
      [TodoPriority.LOW]: 60,
    };
    const delay = delayMap[priority];
    const notificationId = await scheduleTodoNotification(title, id, delay);

    const newTodo: Todo = {
      id: id,
      title: title.trim(),
      isFinished: false,
      priority: priority,
      createdAt: new Date(),
      notificationId,
    };

    set((item) => ({
      todos: [...item.todos, newTodo],
      error: null,
    }));

    console.log("todos after adding", get().todos);

    await AsyncStorage.setItem("Todos", JSON.stringify([...get().todos]));
  },

  deleteTodo: async (id: string) => {
    set((item) => ({
      todos: item.todos.filter((todo) => todo.id !== id),
      error: null,
    }));

    console.log("todos after deleting", get().todos);

    await AsyncStorage.setItem("Todos", JSON.stringify([...get().todos]));
  },

  toggleTodo: async (id: string) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo?.isFinished === false && todo.notificationId) {
      await cancelNotification(todo.notificationId);
    }

    set((item) => ({
      todos: item.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isFinished: !todo.isFinished,
            }
          : todo
      ),
      error: null,
    }));

    console.log("todos after toggling", get().todos);

    await AsyncStorage.setItem("Todos", JSON.stringify([...get().todos]));
  },

  updateTodoPriority: async (id: string, priority: TodoPriority) => {
    set((item) => ({
      todos: item.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              priority: priority,
            }
          : todo
      ),
      error: null,
    }));

    console.log("todos after priority update", get().todos);

    await AsyncStorage.setItem("Todos", JSON.stringify(get().todos));
  },

  getTodoById: (id: string) => {
    return get().todos.find((todo) => todo.id === id);
  },

  getCompletedTodos: () => {
    console.log(
      "getCompletedTodos called",
      get().todos.filter((todo) => todo.isFinished)
    );
    return get().todos.filter((todo) => todo.isFinished);
  },

  getPendingTodos: () => {
    return get().todos.filter((todo) => !todo.isFinished);
  },

  getHighPriorityTodos: () => {
    return get().todos.filter((todo) => todo.priority === TodoPriority.HIGH);
  },

  getMediumPriorityTodos: () => {
    return get().todos.filter((todo) => todo.priority === TodoPriority.MEDIUM);
  },

  getLowPriorityTodos: () => {
    return get().todos.filter((todo) => todo.priority === TodoPriority.LOW);
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  checkAsyncStorage: async () => {
    const storedTodos = await AsyncStorage.getItem("Todos");
    if (storedTodos) {
      set({ todos: JSON.parse(storedTodos) });
    } else {
      set({ todos: [] });
    }
  },
}));

// export const useTodoSelectors = () => {
//   const {
//     todos,
//     getTodoById,
//     getCompletedTodos,
//     getPendingTodos,
//     isLoading,
//     error,
//   } = useTodoStore();

//   return {
//     todos,
//     getTodoById,
//     completedTodos: getCompletedTodos(),
//     pendingTodos: getPendingTodos(),
//     totalTodos: todos.length,
//     completedCount: getCompletedTodos().length,
//     pendingCount: getPendingTodos().length,
//     isLoading,
//     error,
//   };
// };
