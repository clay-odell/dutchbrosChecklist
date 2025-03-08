import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";

const Opening = ({ resetFlag }) => {
  // Use `useMemo` to memoize tasksData
  const tasksData = useMemo(
    () => ({
      openingTasks: [
        "Turn on music: Open Pandora/Sonos and pick a station.",
        "Ensure that the outside and inside speakers are on at an acceptable volume.",
        "Fill the sanitizer sink.",
        "Use test strips to ensure accurate pH levels of 200ppm; It should be a bright cyan color.",
        "Make sure all LB iPads are plugged in and charging!",
        "Warm up the Walk Up & Drive Espresso Bars: pull 2 dubs on each head, down drain.",
        "Open windows and let it rip!",
      ],
      endOfOpeningTasks: [
        "Enter deposit into Loomis by 9am at Owens and end of shift at University.",
        "Count & distribute tips.",
      ],
    }),
    []
  );

  const initializeTaskStates = (tasks) => tasks.map(() => false);

  // Load state from localStorage or initialize it
  const loadInitialTaskStates = (key, tasks) => {
    const savedStates = JSON.parse(localStorage.getItem(key));
    if (savedStates) {
      return savedStates;
    }
    return initializeTaskStates(tasks);
  };

  // State management for each task group with localStorage persistence
  const [openingTaskStates, setOpeningTaskStates] = useState(
    loadInitialTaskStates("openingTasksState", tasksData.openingTasks)
  );

  const [endOfOpeningTaskStates, setEndOfOpeningTaskStates] = useState(
    loadInitialTaskStates(
      "endOfOpeningTasksState",
      tasksData.endOfOpeningTasks
    )
  );

  // Save state to localStorage whenever task states change
  useEffect(() => {
    localStorage.setItem("openingTasksState", JSON.stringify(openingTaskStates));
  }, [openingTaskStates]);

  useEffect(() => {
    localStorage.setItem(
      "endOfOpeningTasksState",
      JSON.stringify(endOfOpeningTaskStates)
    );
  }, [endOfOpeningTaskStates]);

  // Reset task states and clear localStorage on resetFlag
  useEffect(() => {
    if (resetFlag) {
      setOpeningTaskStates(initializeTaskStates(tasksData.openingTasks));
      setEndOfOpeningTaskStates(
        initializeTaskStates(tasksData.endOfOpeningTasks)
      );
      localStorage.removeItem("openingTasksState");
      localStorage.removeItem("endOfOpeningTasksState");
    }
  }, [resetFlag, tasksData]);

  // Utility functions
  const toggleAll = (taskStates, setTaskStates, value) => {
    setTaskStates(taskStates.map(() => value));
  };

  const toggleTask = (index, taskStates, setTaskStates) => {
    const updatedStates = [...taskStates];
    updatedStates[index] = !taskStates[index];
    setTaskStates(updatedStates);
  };

  return (
    <>
      <h2>Opening Tasks</h2>
      <p>Daily tasks for opening the shop.</p>

      {/* Opening Tasks Section */}
      <TaskSection
        title="Opening Tasks"
        tasks={tasksData.openingTasks}
        allChecked={openingTaskStates.every((state) => state)}
        onToggleAll={() =>
          toggleAll(
            openingTaskStates,
            setOpeningTaskStates,
            !openingTaskStates.every((state) => state)
          )
        }
        taskStates={openingTaskStates}
        onToggleTask={(index) =>
          toggleTask(index, openingTaskStates, setOpeningTaskStates)
        }
      />

      {/* End of Shift Tasks Section */}
      <TaskSection
        title="End of Shift Tasks"
        tasks={tasksData.endOfOpeningTasks}
        allChecked={endOfOpeningTaskStates.every((state) => state)}
        onToggleAll={() =>
          toggleAll(
            endOfOpeningTaskStates,
            setEndOfOpeningTaskStates,
            !endOfOpeningTaskStates.every((state) => state)
          )
        }
        taskStates={endOfOpeningTaskStates}
        onToggleTask={(index) =>
          toggleTask(index, endOfOpeningTaskStates, setEndOfOpeningTaskStates)
        }
      />
    </>
  );
};

export default Opening;
