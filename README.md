# GameLoot 🎮

A React Native mobile application that helps gamers discover and claim free game giveaways from various platforms. Built with modern React Native architecture, Redux Toolkit for state management, and Expo for cross-platform development.

## ✨ Features

- **Free Game Discovery**: Browse through a curated list of free game giveaways
- **Advanced Filtering**: Filter games by platform, type, and other criteria
- **Save Favorites**: Bookmark games you're interested in for later
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Real-time Updates**: Get the latest giveaway information
- **Cross-platform**: Works on both iOS and Android devices

## 🚀 Tech Stack

- **Frontend**: React Native 0.79.5
- **State Management**: Redux Toolkit + React Redux
- **Navigation**: React Navigation v7
- **Development**: Expo SDK 53
- **Icons**: React Native Vector Icons
- **Architecture**: Modern React Native with new architecture enabled

## 📱 Screens

- **Home**: Welcome screen with featured giveaways
- **Giveaways**: Main browsing interface with filters
- **Saved**: Your bookmarked games
- **Detail**: Detailed view of individual giveaways
- **Settings**: App preferences and theme toggle

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd game-loot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## 📁 Project Structure

```
src/
├── api/           # API integration (GamerPower)
├── components/    # Reusable UI components
├── context/       # React Context providers
├── modals/        # Modal components
├── navigation/    # Navigation configuration
├── screens/       # Screen components
└── store/         # Redux store and slices
```

## 🔧 Configuration

The app uses several configuration files:

- `app.json`: Expo configuration
- `package.json`: Dependencies and scripts
- `src/store/configureStore.js`: Redux store setup

## 🎨 Customization

### Themes
The app supports both light and dark themes. Theme switching is handled through the `ThemeContext` and can be toggled in the Settings screen.

### Styling
Components use a consistent design system with:
- Responsive layouts
- Platform-specific styling
- Accessible color schemes

## 📊 State Management

The app uses Redux Toolkit for state management with the following slices:
- `giveawaysSlice`: Manages giveaway data and filtering
- `savedSlice`: Handles saved/favorite games
- `filtersSlice`: Manages filter state
- `themeSlice`: Handles theme preferences

## 🚀 Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Game data powered by [GamerPower API](https://www.gamerpower.com/api)
- Icons from [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)


**Developed by Harry. Happy Gaming! 🎮✨**
