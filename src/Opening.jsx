import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";
import ClearTasksButton from "./ClearTasks";

const Opening = ({ selectedWeek, resetFlag }) => {
  // Memoized daily task data
  const tasksData = useMemo(
    () => [
      {
        title: "Lineup Tasks",
        tasks: [
          "Lineup is completed on dry erase board.",
          "Lineup is submitted on Band.",
        ],
      },
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

  // Memoized weekly task data
  const weeklyTaskData = useMemo(
    () => ({
      weekA: [
        {
          title: "Monday",
          tasks: [
            "Detail runner, backdoor, window, handles, silver floor plate, etc.",
          ],
        },
        {
          title: "Tuesday",
          tasks: [
            "Deep clean under Walk Up bar.",
            "Wipe walls.",
            "Get the nitty gritty on the floor.",
            "Dust the pipes and legs.",
            "Get in the corners.",
            "Sweep and mop.",
          ],
        },
        {
          title: "Wednesday",
          tasks: [
            "Deep clean under Drive bar.",
            "Wipe walls.",
            "Get the nitty gritty on the floor.",
            "Dust the pipes and legs.",
            "Get in the corners.",
            "Sweep and mop.",
          ],
        },
        {
          title: "Thursday",
          tasks: [
            "Clean all window tracks.",
            "Dust and deep clean both tills inside and out.",
          ],
        },
        {
          title: "Friday",
          tasks: ["Detail and clean inside and underneath Drive rapid rinser."],
        },
        {
          title: "Saturday",
          tasks: [
            "Detail runner & backdoor, window, handles, silver floorplate, etc.",
          ],
        },
        {
          title: "Sunday",
          tasks: [
            "Deep clean bathroom, toilet, sink, walls...",
            "Sweep and mop.",
          ],
        },
      ],
      weekB: [
        {
          title: "Monday",
          tasks: [
            "Detail mop sink, bucket, and faucet.",
            "Wipe down all handwashing sinks.",
          ],
        },
        {
          title: "Tuesday",
          tasks: ["Clean interior windows & back of the espresso bar."],
        },
        { title: "Wednesday", tasks: ["Wipe down all pit syrup racks."] },
        {
          title: "Thursday",
          tasks: [
            "Take everything off the top of Drive side machine and clean it.",
            "Clean the lid holders.",
          ],
        },
        {
          title: "Friday",
          tasks: [
            "Dust the top of lockers, safe, IT cabinets, air curtains.",
            "Organize and wipe down iPad areas.",
          ],
        },
        { title: "Saturday", tasks: ["Clean all exterior windows/menus."] },
        {
          title: "Sunday",
          tasks: [
            "Pull down all syrups from Walk & Drive bars.",
            "Clean racks.",
          ],
        },
      ],
    }),
    []
  );

  // Initialize task states for daily tasks
  const initializeTaskStates = (tasks) => tasks.map(() => false);

  const loadInitialTaskStates = () => {
    const savedStates = JSON.parse(localStorage.getItem("openingTasksState"));
    if (savedStates) {
      return tasksData.reduce((acc, section) => {
        acc[section.title] =
          savedStates[section.title] || initializeTaskStates(section.tasks);
        return acc;
      }, {});
    }
    return tasksData.reduce((acc, section) => {
      acc[section.title] = initializeTaskStates(section.tasks);
      return acc;
    }, {});
  };

  const [taskStates, setTaskStates] = useState(loadInitialTaskStates);

  useEffect(() => {
    localStorage.setItem("openingTasksState", JSON.stringify(taskStates));
  }, [taskStates]);

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

  // Weekly tasks visibility state
  const [weeklyVisibility, setWeeklyVisibility] = useState({});

  const initializeVisibility = (tasksByWeek) =>
    tasksByWeek.reduce((acc, { title }) => {
      acc[title] = false; // Initially hide all weekly sections
      return acc;
    }, {});

  useEffect(() => {
    const initialVisibility =
      selectedWeek === "Weeks 1 & 3"
        ? initializeVisibility(weeklyTaskData.weekA)
        : initializeVisibility(weeklyTaskData.weekB);

    setWeeklyVisibility(initialVisibility);
  }, [selectedWeek, weeklyTaskData]);

  const toggleVisibility = (title) => {
    setWeeklyVisibility((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

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

  const tasksByWeek = useMemo(() => {
    return selectedWeek === "Weeks 1 & 3"
      ? weeklyTaskData.weekA
      : weeklyTaskData.weekB;
  }, [selectedWeek, weeklyTaskData]);

  return (
    <>
      <h2>Opening Tasks</h2>
      <ClearTasksButton taskStates={taskStates} setTaskStates={setTaskStates} />

      {tasksData.map(({ title, tasks }) => (
        <TaskSection
          key={title}
          title={title}
          tasks={tasks}
          allChecked={taskStates[title]?.every((state) => state)}
          onToggleAll={() =>
            toggleAll(title, !taskStates[title]?.every((state) => state))
          }
          taskStates={taskStates[title]}
          onToggleTask={(index) => toggleTask(title, index)}
        />
      ))}

      <h2>Weekly Tasks</h2>
      {tasksByWeek.map(({ title, tasks }) => (
        <div key={title}>
          <button onClick={() => toggleVisibility(title)}>
            {weeklyVisibility[title] ? "Hide" : "Show"} {title}
          </button>
          {weeklyVisibility[title] && (
            <TaskSection
              key={title}
              title={title}
              tasks={tasks}
              allChecked={taskStates[title]?.every((state) => state)}
              onToggleAll={() =>
                toggleAll(title, !taskStates[title]?.every((state) => state))
              }
              taskStates={taskStates[title] || initializeTaskStates(tasks)}
              onToggleTask={(index) => toggleTask(title, index)}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Opening;
