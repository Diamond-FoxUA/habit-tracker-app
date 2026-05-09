import Button from "./Button";
import { format, isSameDay, isFuture, subDays } from "date-fns";
import { type Habit } from "../context/HabitProvider";
import { useHabits } from "../context/useHabits";

type HabitListProps = {
  visibleDates: Date[];
};

export default function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet. Add one above to get started!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem visibleDates={visibleDates} habit={habit} />
      ))}
    </ul>
  );
}

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
};

function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits();

  const streak = getStreak(habit.completions);

  return (
    <li className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥 {streak}</span>
          )}
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="ghost-destructive"
          className="text-sm"
        >
          Delete
        </Button>
      </div>

      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </li>
  );
}

function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some((c) => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}
