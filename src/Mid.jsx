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

  // Helper function to generate unique localStorage keys based on the week
  const getLocalStorageKey = (week, day) => `midTasksState_${week}_${day}`;

  const initializeTaskStates = (tasks) =>
    tasks.map(() => false);

  const loadInitialTaskStates = () => {
    // Load task states for the specific week and day
    return tasksByWeek.map(({ title }) => {
      const key = getLocalStorageKey(
        selectedWeek === "Weeks 1 & 3" ? "weekA" : "weekB",
        title
      );
      const savedStates = JSON.parse(localStorage.getItem(key));
      return savedStates || initializeTaskStates(tasksByWeek.find(({ title: t }) => t === title).tasks);
    });
  };

  const [taskStates, setTaskStates] = useState(() => loadInitialTaskStates());

  // Save the state for a specific day to localStorage whenever taskStates change
  useEffect(() => {
    taskStates.forEach((dayState, dayIndex) => {
      const { title } = tasksByWeek[dayIndex];
      const key = getLocalStorageKey(
        selectedWeek === "Weeks 1 & 3" ? "weekA" : "weekB",
        title
      );
      localStorage.setItem(key, JSON.stringify(dayState));
    });
  }, [taskStates, tasksByWeek, selectedWeek]);

  // Reset all states and clear relevant localStorage keys on `resetFlag`
  useEffect(() => {
    if (resetFlag) {
      const freshStates = tasksByWeek.map(({ tasks }) =>
        initializeTaskStates(tasks)
      );
      setTaskStates(freshStates);
      tasksByWeek.forEach(({ title }) => {
        const key = getLocalStorageKey(
          selectedWeek === "Weeks 1 & 3" ? "weekA" : "weekB",
          title
        );
        localStorage.removeItem(key);
      });
    }
  }, [resetFlag, tasksByWeek, selectedWeek]);

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
          allChecked={taskStates[dayIndex]?.every((state) => state) ?? false}
          onToggleAll={() =>
            toggleAll(dayIndex, !taskStates[dayIndex]?.every((state) => state))
          }
          taskStates={taskStates[dayIndex] ?? []} // Fallback to empty array
          onToggleTask={(taskIndex) => toggleTask(dayIndex, taskIndex)}
        />
      ))}
    </>
  );
};

export default Mid;
