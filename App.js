import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/configureStore';
import { ThemeProvider } from './src/context/ThemeContext';
import Root from './src/navigation/Root';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
