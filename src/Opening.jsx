import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";
import ClearTasksButton from "./ClearTasks";

// Static tasks data
const tasksData = [
  {
    title: "Pre-Opening Tasks",
    tasks: [
      "Turn on music (University: Open Sonos App and click music icon) via Pandora.",
      "Ensure outside and inside speakers are at an acceptable volume.",
      "Fill the sanitizer sink.",
      "Use test strips to ensure accurate pH levels (200ppm).",
      "Make sure LB iPads are plugged in and charging.",
      "Check expiry of milks and other perishable items.",
      "Write lineup on dry erase board.",
      "Post lineup to Band (SL).",
      "Retrieve Order Ahead (OA) and other signs from electrical closet.",
      "Place OA signage in designated spots.",
      "Turn on all grinders.",
      "Warm up Walk Up & Drive Espresso bars: pull two dubs on each head and let fall into drain.",
      "At 5am, open the Drive and Walkup Windows.",
      "Dog Drive sidedoor.",
    ],
  },
  {
    title: "End of Opening Tasks",
    tasks: [
      "Enter deposit into Loomis (by 9am at Owens).",
      "At the end of each broista's shift, assign closing tasks.",
      "Count and distribute all tips.",
      "Pull and take out trashes, pull rag bag and take to dumpster (if necessary).",
    ],
  },
];

const weeklyTaskData = {
  weekA: [
    {
      title: "Monday",
      tasks: [
        "Detail runner & backdoor, window, handles, silver floor plate, etc.",
      ],
    },
    {
      title: "Tuesday",
      tasks: [
        "Deep clean under Walk bar.",
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
        "Dust and deep clean both the tills, inside & out.",
      ],
    },
    {
      title: "Friday",
      tasks: ["Detail and clean inside and underneath Drive rapid rinser."],
    },
    {
      title: "Saturday",
      tasks: [
        "Detail runner & backdoor, window, handles, silver floor plate, etc.",
      ],
    },
    {
      title: "Sunday",
      tasks: ["Deep clean bathroom, toilet, sink, walls.", "Sweep and mop."],
    },
  ],
  weekB: [
    {
      title: "Monday",
      tasks: [
        "Detail mop sink, bucket, and faucet.",
        "Wipe down all hand washing sinks.",
      ],
    },
    {
      title: "Tuesday",
      tasks: ["Clean interior windows & back of espresso bar."],
    },
    {
      title: "Wednesday",
      tasks: ["Wipe down all pit syrup racks."],
    },
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
        "Dust the tops of lockers, safe, IT cabinets, air curtains.",
        "Organize and wipe down iPad areas.",
      ],
    },
    {
      title: "Saturday",
      tasks: ["Clean all exterior windows and menus."],
    },
    {
      title: "Sunday",
      tasks: ["Pull down all syrups from Walk & Drive bar.", "Clean racks."],
    },
  ],
};

const Opening = ({ selectedWeek, resetFlag }) => {
  const initializeTaskStates = (tasks) => tasks.map(() => false);

  const loadInitialTaskStates = () => {
    const savedStates = JSON.parse(localStorage.getItem("closingTasksState"));
    if (savedStates) {
      return savedStates;
    }
    // Create initial state
    const initialTaskStates = {};
    tasksData.forEach(({ title, tasks }) => {
      initialTaskStates[title] = initializeTaskStates(tasks);
    });
    return initialTaskStates;
  };

  const [taskStates, setTaskStates] = useState(() => loadInitialTaskStates());

  // Save state to localStorage whenever taskStates change
  useEffect(() => {
    
    localStorage.setItem("closingTasksState", JSON.stringify(taskStates));
  }, [taskStates]);

  // Reset states and clear localStorage on resetFlag
  useEffect(() => {
    if (resetFlag) {
      
      const freshStates = tasksData.reduce((acc, section) => {
        acc[section.title] = initializeTaskStates(section.tasks);
        return acc;
      }, {});
      setTaskStates(freshStates);
      localStorage.removeItem("closingTasksState"); // Clear local storage
    }
  }, [resetFlag, tasksData]);

  const toggleAll = (title, value) => {
    const tasksForTitle =
      tasksData.find((section) => section.title === title)?.tasks ||
      weeklyTaskData.weekA
        .concat(weeklyTaskData.weekB)
        .find((week) => week.title === title)?.tasks ||
      [];

    setTaskStates((prev) => ({
      ...prev,
      [title]: prev[title]
        ? prev[title].map(() => value)
        : initializeTaskStates(tasksForTitle),
    }));
  };

  const toggleTask = (title, index) => {
    setTaskStates((prev) => {
      const updatedStates = prev[title]
        ? [...prev[title]]
        : initializeTaskStates(
            tasksData.find((section) => section.title === title)?.tasks || []
          );
      updatedStates[index] = !updatedStates[index];
      return { ...prev, [title]: updatedStates };
    });
  };

  const initializeVisibility = (tasksByWeek) =>
    tasksByWeek.reduce((acc, { title }) => {
      acc[title] = false; // Initially hide all sections
      return acc;
    }, {});

  const [weeklyVisibility, setWeeklyVisibility] = useState(() =>
    initializeVisibility(
      selectedWeek === "Weeks 1 & 3"
        ? weeklyTaskData.weekA
        : weeklyTaskData.weekB
    )
  );

  useEffect(() => {
    const initialVisibility =
      selectedWeek === "Weeks 1 & 3"
        ? initializeVisibility(weeklyTaskData.weekA)
        : initializeVisibility(weeklyTaskData.weekB);
    setWeeklyVisibility(initialVisibility);
  }, [selectedWeek]);

  const toggleVisibility = (title) => {
    setWeeklyVisibility((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const tasksByWeek = useMemo(() => {
    return selectedWeek === "Weeks 1 & 3"
      ? weeklyTaskData.weekA
      : weeklyTaskData.weekB;
  }, [selectedWeek]);

  return (
    <>
      <h2>Opening Tasks</h2>
      <ClearTasksButton taskStates={taskStates} setTaskStates={setTaskStates} />

      {tasksData.map(({ title, tasks }) => (
        <TaskSection
          key={title}
          title={title}
          tasks={tasks}
          allChecked={taskStates[title]?.every((state) => state) || false}
          onToggleAll={() =>
            toggleAll(title, !taskStates[title]?.every((state) => state))
          }
          taskStates={taskStates[title] || initializeTaskStates(tasks)}
          onToggleTask={(index) => toggleTask(title, index)}
        />
      ))}

      <h2>Weekly Tasks</h2>
      <p>
        Don't forget to take a before and after pic and post it to Leadership
        Band.
      </p>
      {tasksByWeek.map(({ title, tasks }) => (
        <div key={title}>
          <button onClick={() => toggleVisibility(title)}>
            {weeklyVisibility[title] ? "Hide" : "Show"} {title}
          </button>
          {weeklyVisibility[title] && (
            <TaskSection
              title={title}
              tasks={tasks}
              allChecked={taskStates[title]?.every((state) => state) || false}
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