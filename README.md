# React Native Expo Boilerplate 🚀

A feature-rich starter template with authentication, onboarding, dark mode, and web support built with Expo and React Native.

## Features ✨

- **Authentication Flow** 🔐  
  - Complete login/signup screens
  - Zustand state management
  - Secure token storage

- **Onboarding Experience** 👋  
  - 3-step animated onboarding
  - Swipeable carousel
  - Skip/Get Started options

- **Dark Mode** 🌙  
  - System-aware theme switching
  - Smooth transitions
  - NativeWind integration

- **Cross-Platform** 🌐  
  - iOS, Android & Web support
  - Responsive layouts
  - Universal navigation

## Getting Started 🏁

1. Install dependencies  
   ```bash
   npm install
   ```

2. Start the development server  
   ```bash
   npx expo start
   ```

## Usage Examples 📖

### Authentication
```typescript
// Login example
const { login } = useAuthStore();
await login({ email: 'user@example.com', password: 'securepassword' });

// Protected route
if (!isLoggedIn) router.replace('/login');
```

### Theme Switching
```typescript
// Toggle between light/dark/system
const { theme, setTheme } = useTheme();
setTheme('dark'); // 'light' | 'dark' | 'system'

// Theme-aware styling
<View className="bg-white dark:bg-gray-900">
  <Text className="text-black dark:text-white">
    Adapts to current theme
  </Text>
</View>
```

### Onboarding Customization
Edit `app/onboarding.tsx` to modify slides:
```typescript
const slides = [
  {
    emoji: '🌟',
    title: 'New Feature',
    description: 'Discover what\'s new in our app'
  },
  // Add more slides as needed
];
```

## Project Structure 🗂️
```
app/
├── components/       # Reusable components
├── constants/        # App constants
├── hooks/           # Custom hooks
├── navigation/      # Routing setup
├── screens/         # Main app screens
├── stores/          # Zustand stores
├── styles/          # Global styles
├── utils/           # Utility functions
└── _layout.tsx      # Root layout
```

## Advanced Setup ⚙️

### Web Configuration
For optimal web experience:
```bash
npx expo install @expo/webpack-config
```

### Environment Variables
Create `.env` file:
```
API_URL=https://yourapi.com
```

Access variables:
```typescript
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.API_URL;
```

## Community 💬

- [Report Issues](https://github.com/your-repo/issues)
- [Expo Discord](https://chat.expo.dev)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

---
