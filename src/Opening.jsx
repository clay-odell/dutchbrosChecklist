import TaskSection from "./TaskSection";
const Opening = () => {

      const openingTasks = [
        "Turn on music: Open Pandora/Sonos and pick a station.",
        "Ensure that the outside and inside speakers are on at an acceptable volume.",
        "Fill the sanitizer sink.",
        "Use test strips to ensure accurate pH levels of 200ppm; It should be a bright cyan color.",
        "Make sure all LB iPads are plugged in and charging!",
        "Warm up the Walk Up & Drive Espresso Bars: pull 2 dubs on each head, down drain.",
        "Open windows and let it rip!"
    
      ];
      const endOfOpening = [
        "Enter deposit into Loomis by 9am at Owens and end of shift at University.",
        "Count & distribute tips."
      ];

      return (
        <>
        <h2>Opening Tasks</h2>
        <p>Daily tasks for opening the shop.</p>

        <TaskSection title="Opening Tasks" tasks={openingTasks} />
        <TaskSection title="End of Shift Tasks" tasks={endOfOpening} />
        </>
      )
}
export default Opening;