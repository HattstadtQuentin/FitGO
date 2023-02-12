import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      id: null,
      email: null,
      setUser: (id, email) =>
        set(() => ({
          id: id,
          email: email,
        })),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;