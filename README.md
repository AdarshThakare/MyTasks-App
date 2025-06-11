# Welcome to MyTasks app 👋
**Developer:** Adarsh Thakare  

## 📝 Description
**MyTasks App** is a modern task management app built with **React Native (Expo)** and **Zustand** for state management. It allows users to create, track, and manage todos with assigned priorities (Low, Medium, High). Each task automatically triggers a local notification as a reminder. Tasks are categorized based on their **status** (Pending/Completed) and **priority** (High/Medium/Low), providing a focused, organized interface.

## 🚀 Features
- Add tasks with customizable priority levels.
- Automatically schedule push notifications based on priority.
- Cancel notifications when tasks are marked as complete (bonus).
- Visually clean UI with separate views:
  - **StatusScreen**: Shows Pending and Completed tasks.
  - **PriorityScreen**: Sorts tasks by Priority inside a horizontal carousel.
- Persistent storage using AsyncStorage.

## 🎨 Design Decisions:
- For UI, I took inspiration from Dribbble and complied it with my own creativity.
- I chose a dark themed UI to be less strainful on eye and providing a wholesome vibe.
- Visually clean UI with separate screens:
  - **TodoScreen**: Allows user to add, delete and set priority for tasks and view them in a Vertical Flatlist
  - **StatusScreen**: Shows Pending and Completed tasks.
  - **PriorityScreen**: Sorts tasks by Priority inside a horizontal carousel.

## 🧠 Overall Architecture of the App
- Used `Zustand` for scalable, lightweight state management.
- Used `AsyncStorage` for data persistence sessions without needing a backend.
- Implemented `Swipeable` from `react-native Gesture Handler` for enhanced user experience.
    - Swipe Left to delete
    - Swipe Right to set Priority Level
- Chose `expo-notifications` for easier setup of local alerts without external services.
- Added minor animations for Splash screen using `react-native-reanimated`

## ⚠️ Challenges Faced:
- Swipeable was not working smoothly but I added `overshootLeft={false}`  and `overshootRight={false}` which fixed the problem.
- Storing data and accessing them from the Async Storage each time was making the app slower. So I used states to manage operations and used AsyncStorage only on screen mounting.
- Testing expo-notifications required me to build a development build of the app which took a lot of time(6+ hrs).
- Cancellation of Notifications upon task completion added a layer of complexity, but in the end , it provided a smoother UX.

## Detailed Setup Process

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
