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
    <h3>
      <Form.Check
        reverse
        type="switch"
        label={title}
        checked={allChecked}
        onChange={onToggleAll}
      />
    </h3>
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <Form.Check
            reverse
            type="switch"
            label={task}
            checked={taskStates[index]}
            onChange={() => onToggleTask(index)}
          />
        </li>
      ))}
    </ul>
  </section>
);

export default TaskSection;
