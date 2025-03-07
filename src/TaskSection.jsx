
import Form from "react-bootstrap/Form";

const TaskSection = ({ title, tasks }) => (
  <section className="check-containers">
    <h3>
      <Form.Check reverse type="switch" label={title} />
    </h3>
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <Form.Check reverse type="switch" label={task} />
        </li>
      ))}
    </ul>
  </section>
);

export default TaskSection;
