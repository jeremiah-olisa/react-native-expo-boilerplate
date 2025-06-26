import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DevAuthState = {
  users: User[];
  register: (name: string, email: string, password: string) => User;
  authenticate: (email: string, password: string) => User;
};

const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "alice1234",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    password: "bobSecure!",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: "charlie_pass99",
  },
];

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  //   isEmailVerified: boolean;
  //   isPhoneVerified: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
  logIn: (userData: User) => void;
  logOut: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateUser: (userData: Partial<User>) => void;
};

export const useAuthStore = create(
  persist<AuthState & DevAuthState>(
    (set, get) => ({
      users,
      authenticate: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error("Incorrect email or password");
        }

        return user;
      },
      register: (name: string, email: string, password: string): User => {
        const users = get().users;
        // Check if the email already exists
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
          throw new Error("Email is already registered");
        }

        // Create new user and add to the list
        const newUser: User = {
          id: (users.length + 1).toString(), // Incremental ID for demo purposes
          name,
          email,
          password,
        };

        users.push(newUser);

        set({
          users,
          hasCompletedOnboarding: true,
        });
        return newUser; // Return the new user object
      },
      isLoggedIn: false,
      shouldCreateAccount: true,
      hasCompletedOnboarding: false,
      user: null,
      logIn: (userData) => {
        set({
          hasCompletedOnboarding: true,
          isLoggedIn: true,
          user: userData,
        });
      },
      logOut: () => {
        set({
          isLoggedIn: false,
          user: null,
        });
      },
      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },
      resetOnboarding: () => {
        set({ hasCompletedOnboarding: false });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
