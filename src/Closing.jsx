import { useState, useEffect, useMemo } from "react";
import TaskSection from "./TaskSection";
import ClearTasksButton from "./ClearTasks";

const Closing = ({ selectedWeek, resetFlag }) => {
  // Use `useMemo` to memoize `tasksData`
  const tasksData = useMemo(
    () => [
      {
        title: "Pit Tasks",
        tasks: [
          "Scoops and Rinse Cup removed and cleaned. (Keep water off after).",
          "All toppers on syrups and sauces cleaned.",
          "Pre-mades wiped down, tops cleaned, and filled.",
          "Check and pull trashes",
        ],
      },
      {
        title: "Taylor Tasks",
        tasks: [
          "The first odd/even Taylor Machine has been emptied and cleaned.",
          "The second odd/even Taylor Machine has been emptied and cleaned.",
          "Both Taylor machines have been refilled and are ready for use.",
          "Move Taylor machines and wipe down wall and window.",
        ],
      },
      {
        title: "Espresso Tasks",
        tasks: [
          "Backwash machine heads",
          "Wash all shot tins.",
          "Wash all mix/steam tins.",
          "Wash grates, drain grates, and rapid rinse.",
          "Sanitize/spray and wipe down machine exterior & steam wand.",
          "Wash all scoops & stirrers.",
          "Wash both drying mats.",
          "Ensure all dishes are cleaned.",
          "Reassemble Espresso machine.",
        ],
      },
      {
        title: "Walk Bar Tasks",
        tasks: [
          "All dishes pulled and washed.",
          "Bar & Counter wiped down (includes under bar, behind Bunn, and under syrup rack).",
          "Grinder emptied and wiped down.",
          "All toppers on syrups and sauces cleaned.",
        ],
      },
      {
        title: "Off Bar Tasks",
        tasks: [
          "Sweep shop floor, getting underneath all bars, ice bins, and counter tops.",
          "Mop from back of shop to Taps machine.",
          "Restock fridge: milks, soft top, whip, dry milks, chai, muffin tops, & granola.",
          "Wash pitchers for teas, lemonade, and cold brew.",
          "Restock cans of soda, Rebel, and SF Rebel.",
          "Fill and wipe down ice bins.",
          "Clean all drains using bowl cleaner.",
        ],
      },
      {
        title: "End of Night Tasks",
        tasks: [
          "Shut down drive bar.",
          "Mop front half of shop.",
          "Decaf grinder emptied & wiped down.",
          "Check all iPads & Verifones are plugged in and charging.",
          "Close Drive and Walkup tills (SL)",
          "Tips counted and distributed (SL)",
          "Triple sink drained and rinsed out",
          "All rags collected and placed into rag bin.",
          "Retrieve order ahead signs, and put signage in electrical closet.",
          "Taps machine shut off and nozzles placed in 32oz mix cup of soda water.",
          "Turn off music, building lights, and inside lights.",
          "Ensure all doors and windows are locked and alarm is set.",
        ],
      },
    ],
    [] // Memoized once as it's static data
  );

  const weeklyTaskData = useMemo(
    () => ({
      weekA: [
        {
          title: "Monday",
          tasks: ["Dust cup dispensers.", "Wipe off major splatters."],
        },
        {
          title: "Tuesday",
          tasks: [
            "Detail and clean inside and underneath Walk and Back bars' rapid rinser.",
          ],
        },
        {
          title: "Wednesday",
          tasks: [
            "Pull out Walk Taylor machine",
            "Wipe down wall behind it.",
            "Wipe the machine down.",
            "Clean the air vents.",
            "Sweep and mop.",
          ],
        },
        {
          title: "Thursday",
          tasks: [
            "Clean the base and corners of the floor using floor brush and hot water.",
          ],
        },
        {
          title: "Friday",
          tasks: [
            "Clean and wipe down behind back of all espresso machines.",
            "Wipe down back of the espresso machines.",
          ],
        },
        {
          title: "Saturday",
          tasks: [
            "Pull out front Drive Taylor machine.",
            "Wipe down wall behind it.",
            "Wipe the machine down.",
            "Clean the air vents.",
            "Sweep and mop.",
          ],
        },
        {
          title: "Sunday",
          tasks: [
            "Clean out all trash and recycling bins",
            "Inside",
            "Outside",
          ],
        },
      ],
      weekB: [
        {
          title: "Monday",
          tasks: [
            "Deep clean under Pit.",
            "Wipe walls.",
            "Get the nitty gritty on the floor.",
            "Dust the pipes and legs.",
            "Get in the corners.",
            "Sweep and mop.",
          ],
        },
        { title: "Tuesday", tasks: ["Detail Drive fridge door inside and out.", "Wipe down any splatters on the inside.", "Clean front fridge door.",] },
        { title: "Wednesday", tasks: ["Sweep and mop fridge floor.", "Organize product.", "Check dates for expiration"] },
        { title: "Thursday", tasks: ["Detail Walk fridge door inside and out.", "Wipe down any splatters on the inside.", "Clean front fridge door."] },
        { title: "Friday", tasks: ["Wipe down the runner door.", "Wipe down the backdoor.", "Wipe down bathroom door."] },
        { title: "Saturday", tasks: ["Wipe down Taylor wheels and ice caddy wheels.", "Wipe down all ice bins."] },
        { title: "Sunday", tasks: ["Detail Pit fridge door inside and out.", "Wipe down any splatters on the inside.", "Clean front fridge door."] },
      ],
    }),
    []
  );

  const initializeTaskStates = (tasks) => tasks.map(() => false);

  // Load state from localStorage or initialize it
  const loadInitialTaskStates = () => {
    const savedStates = JSON.parse(localStorage.getItem("closingTasksState"));
    if (savedStates) {
      return savedStates;
    }
    return tasksData.reduce((acc, section) => {
      acc[section.title] = initializeTaskStates(section.tasks);
      return acc;
    }, {});
  };

  const [taskStates, setTaskStates] = useState(loadInitialTaskStates);

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
  // Weekly task visibility states
  const [weeklyVisibility, setWeeklyVisibility] = useState({});

  const initializeVisibility = (tasksByWeek) =>
    tasksByWeek.reduce((acc, { title }) => {
      acc[title] = false; // Initially hide all sections
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

  const tasksByWeek = useMemo(() => {
    return selectedWeek === "Weeks 1 & 3"
      ? weeklyTaskData.weekA
      : weeklyTaskData.weekB;
  }, [selectedWeek, weeklyTaskData]);

  return (
    <>
      <h2>Closing Tasks</h2>
      <p>Nightly tasks for shutting down the shop.</p>

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

export default Closing;