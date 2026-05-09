import Button from "./Button";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

export default function HabitList() {
  const habits = [
    { id: "1", name: "Hi" },
    { id: "2", name: "Bye" },
  ];

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
        <HabitItem habit={habit} />
      ))}
    </ul>
  );
}

type HabitItemsProps = {
  habit: {
    id: string;
    name: string;
  };
};

function HabitItem({ habit }: HabitItemsProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <li className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">🔥 500</span>
        </div>
        <Button variant="ghost-destructive" className="text-sm">
          Delete
        </Button>
      </div>

      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </li>
  );
}
