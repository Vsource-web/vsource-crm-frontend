// crm-frontend-next\app\store\index.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, type LoginDto } from "@/services/auth.service";

export type UserRole = "admin" | "counselor";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const data = await authService.login({ email, password } as LoginDto);
          localStorage.setItem("accessToken", data.accessToken);

          set({
            user: data.user,
            isAuthenticated: true,
          });

          return { ok: true };
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Login failed";
          return { ok: false, error: message };
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "vsource-auth",
    }
  )
);

interface UiState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleDark: () => void;
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
}

export const useUi = create<UiState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      darkMode: false,

      toggleSidebar: () =>
        set({
          sidebarCollapsed: !get().sidebarCollapsed,
        }),

      toggleDark: () => {
        const v = !get().darkMode;

        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", v);
        }

        set({ darkMode: v });
      },

      commandOpen: false,

      setCommandOpen: (v) =>
        set({
          commandOpen: v,
        }),
    }),
    {
      name: "vsource-ui",
    }
  )
);