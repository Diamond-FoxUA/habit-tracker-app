import { useState } from "react";
import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import type { Habit } from "./components/HabitList";
import { isSameDay } from "date-fns";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

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
    setHabits((prev) => (
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const isAlreadyDone = habit.completions.some((c) => isSameDay(c, date));
        const completions = isAlreadyDone
          ? habit.completions.filter((c) => !isSameDay(c, date))
          : [...habit.completions, date];

        return { ...habit, completions };
      })
    ));
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} deleteHabit={deleteHabit} toggleHabit={toggleHabit} />
    </div>
  );
}

export default App;
