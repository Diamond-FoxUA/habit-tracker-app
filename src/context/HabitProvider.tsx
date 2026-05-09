import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import { HabitContext } from "./useHabits";
import useLocalStorage from "../hooks/useLocalStorage";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitProviderProps = {
  children: ReactNode;
};

export default function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

  function addHabit(name: string) {
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const isAlreadyDone = habit.completions.some((c) => isSameDay(c, date));
        const completions = isAlreadyDone
          ? habit.completions.filter((c) => !isSameDay(c, date))
          : [...habit.completions, date];

        return { ...habit, completions };
      }),
    );
  }

  return (
    <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
  );
}
