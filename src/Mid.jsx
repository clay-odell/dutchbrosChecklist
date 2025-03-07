import TaskSection from "./TaskSection";

const Mid = ({ selectedWeek }) => {
  const weekA = [
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
  ];

  const weekB = [
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
  ];

  const tasksByWeek = selectedWeek === "Weeks 1 & 3" ? weekA : weekB;

  return (
    <>
      <h2>Mid Tasks</h2>
      <p>Tasks for {selectedWeek}</p>
      {tasksByWeek.map(({ title, tasks }, index) => (
        <TaskSection key={index} title={title} tasks={tasks} />
      ))}
    </>
  );
};

export default Mid;
