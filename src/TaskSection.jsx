import Form from "react-bootstrap/Form";

const TaskSection = ({
  title,
  tasks,
  allChecked,
  onToggleAll,
  taskStates,
  onToggleTask,
}) => (
  <section className="check-containers">
    <h3 className="text-start">
      {/* Align Form.Check label and switch to the left */}
      <Form.Check
        reverse
        type="switch"
        label={title}
        checked={allChecked}
        onChange={onToggleAll}
        className="text-start"
      />
    </h3>
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className="text-start">
          {" "}
          {/* Add alignment to the list items */}
          <Form.Check
            reverse
            type="switch"
            label={task}
            checked={taskStates[index]}
            onChange={() => onToggleTask(index)}
            className="text-start"
          />
        </li>
      ))}
    </ul>
  </section>
);

export default TaskSection;
