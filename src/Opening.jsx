import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";
import ClearTasksButton from "./ClearTasks";
import { Container } from "react-bootstrap";
const Opening = ({ resetFlag }) => {
  // Use `useMemo` to memoize tasksData
  const tasksData = useMemo(
    () => [
      {
        title: "Opening Tasks",
        tasks: [
          "Turn on music: Open Pandora/Sonos and pick a station.",
          "Ensure that the outside and inside speakers are on at an acceptable volume.",
          "Fill the sanitizer sink.",
          "Use test strips to ensure accurate pH levels of 200ppm; It should be a bright cyan color.",
          "Make sure all LB iPads are plugged in and charging!",
          "Warm up the Walk Up & Drive Espresso Bars: pull 2 dubs on each head, down drain.",
          "Open windows and let it rip!",
        ],
      },
      {
        title: "End of Opening Tasks",
        tasks: [
          "Enter deposit into Loomis by 9am at Owens and end of shift at University.",
          "Count & distribute tips.",
        ],
      },
    ],
    []
  );

  const initializeTaskStates = (tasks) => tasks.map(() => false);

  const loadInitialTaskStates = () => {
    const savedStates = JSON.parse(localStorage.getItem("openingTasksState"));
    if (savedStates) {
      return tasksData.reduce((acc, section) => {
        // Ensure savedStates has a key for this section title
        acc[section.title] =
          savedStates[section.title] || initializeTaskStates(section.tasks);
        return acc;
      }, {});
    }
    // If no savedStates, initialize fresh states for all sections
    return tasksData.reduce((acc, section) => {
      acc[section.title] = initializeTaskStates(section.tasks);
      return acc;
    }, {});
  };

  const [taskStates, setTaskStates] = useState(loadInitialTaskStates);

  // Save state to localStorage whenever taskStates change
  useEffect(() => {
    localStorage.setItem("openingTasksState", JSON.stringify(taskStates));
  }, [taskStates]);

  // Reset task states and clear localStorage on resetFlag
  useEffect(() => {
    if (resetFlag) {
      const freshStates = tasksData.reduce((acc, section) => {
        acc[section.title] = initializeTaskStates(section.tasks);
        return acc;
      }, {});
      setTaskStates(freshStates);
      localStorage.removeItem("openingTasksState");
    }
  }, [resetFlag, tasksData]);

  // Utility functions
  const toggleAll = (title, value) => {
    setTaskStates((prev) => ({
      ...prev,
      [title]: prev[title].map(() => value),
    }));
  };

  const toggleTask = (title, index) => {
    setTaskStates((prev) => {
      const updatedStates = [...prev[title]];
      updatedStates[index] = !updatedStates[index];
      return { ...prev, [title]: updatedStates };
    });
  };

  return (
    <>
      <h2>Opening Tasks</h2>
      <p>Daily tasks for opening the shop.</p>
      <ClearTasksButton taskStates={taskStates} setTaskStates={setTaskStates} />

      {tasksData.map(({ title, tasks }) => (
        <TaskSection
          key={title}
          title={title}
          tasks={tasks}
          allChecked={taskStates[title].every((state) => state)}
          onToggleAll={() =>
            toggleAll(title, !taskStates[title].every((state) => state))
          }
          taskStates={taskStates[title]}
          onToggleTask={(index) => toggleTask(title, index)}
        />
      ))}
    </>
  );
};

export default Opening;
