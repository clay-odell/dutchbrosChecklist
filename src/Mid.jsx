import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";

const Mid = ({ selectedWeek, resetFlag }) => {
  const tasksData = useMemo(
    () => ({
      weekA: [
        {
          title: "Monday",
          tasks: [
            "Pull out Pit Taylor machine, and wipe down wall behind it.",
            "Wipe the machine down.",
            "Clean the air vents.",
            "Sweep and mop.",
          ],
        },
        {
          title: "Tuesday",
          tasks: ["Wipe down ceiling splatters."],
        },
        {
          title: "Wednesday",
          tasks: [
            "Pick up trash outside in the lot by the dumpster.",
            "Pick up trash inside the dumpster area, and throughout the parking lot.",
          ],
        },
        {
          title: "Thursday",
          tasks: [
            "Clean drink carts at walkup and drive bar.",
            "Disinfect and wipe down all three shelves.",
          ],
        },
        {
          title: "Friday",
          tasks: [
            "Wipe down syrups and sauces.",
            "Wipe down/backstock syrup racks.",
          ],
        },
        {
          title: "Saturday",
          tasks: ["Wipe down and Windex big ice machine."],
        },
        {
          title: "Sunday",
          tasks: [
            "Give the iPads & cases a good detailed cleaning, including the XKMS.",
          ],
        },
      ],
      weekB: [
        {
          title: "Monday",
          tasks: ["Detail and clean inside and underneath Pit rapid rinser."],
        },
        {
          title: "Tuesday",
          tasks: ["Wipe down open signs, windows above open signs."],
        },
        {
          title: "Wednesday",
          tasks: [
            "Take everything off the top of walkup machine and clean it.",
            "Clean the lid holders.",
          ],
        },
        {
          title: "Thursday",
          tasks: [
            "Starting from ceiling: 360° wall wipedown for the front half of the shop.",
          ],
        },
        {
          title: "Friday",
          tasks: [
            "Starting from the ceiling: 360° wall wipedown for the front half of the shop.",
            "Wipe down underneath drive window and behind drive drink cart.",
          ],
        },
        {
          title: "Saturday",
          tasks: ["Sweep & mop under big ice machine & 3 sink area."],
        },
        {
          title: "Sunday",
          tasks: [
            "Starting from ceiling: 360° wall wipedown for the back half of the shop.",
          ],
        },
      ],
    }),
    []
  );

  // Memoize `tasksByWeek` for stability
  const tasksByWeek = useMemo(() => {
    return selectedWeek === "Weeks 1 & 3" ? tasksData.weekA : tasksData.weekB;
  }, [selectedWeek, tasksData]);

  const initializeTaskStates = (tasks) =>
    tasks.map((day) => day.tasks.map(() => false));

  const loadInitialTaskStates = (tasksByWeek) => {
    const savedStates = JSON.parse(localStorage.getItem("midTasksState"));
    if (savedStates) {
      return savedStates;
    }
    return initializeTaskStates(tasksByWeek);
  };

  const [taskStates, setTaskStates] = useState(() =>
    loadInitialTaskStates(tasksByWeek)
  );

  // Save state to localStorage whenever taskStates change
  useEffect(() => {
    localStorage.setItem("midTasksState", JSON.stringify(taskStates));
  }, [taskStates]);

  // Reset state and clear localStorage on `resetFlag` or `selectedWeek` change
  useEffect(() => {
    if (resetFlag || selectedWeek) {
      const freshStates = initializeTaskStates(tasksByWeek);
      setTaskStates(freshStates);
      localStorage.removeItem("midTasksState"); // Clear local storage on reset
    }
  }, [resetFlag, tasksByWeek]);

  // Utility functions
  const toggleAll = (dayIndex, value) => {
    const updatedStates = [...taskStates];
    updatedStates[dayIndex] = updatedStates[dayIndex].map(() => value);
    setTaskStates(updatedStates);
  };

  const toggleTask = (dayIndex, taskIndex) => {
    const updatedStates = [...taskStates];
    updatedStates[dayIndex][taskIndex] = !updatedStates[dayIndex][taskIndex];
    setTaskStates(updatedStates);
  };

  return (
    <>
      <h2>Mid Tasks</h2>
      <p>Tasks for {selectedWeek}</p>

      {tasksByWeek.map(({ title, tasks }, dayIndex) => (
        <TaskSection
          key={dayIndex}
          title={title}
          tasks={tasks}
          allChecked={taskStates[dayIndex]?.every((state) => state) || false}
          onToggleAll={() =>
            toggleAll(dayIndex, !taskStates[dayIndex]?.every((state) => state))
          }
          taskStates={taskStates[dayIndex] || []}
          onToggleTask={(taskIndex) => toggleTask(dayIndex, taskIndex)}
        />
      ))}
    </>
  );
};

export default Mid;
