import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClearTasksButton = ({ taskStates, setTaskStates }) => {
  const handleClick = (e) => {
    e.preventDefault();

    // Properly use reduce to reset all tasks to false
    const clearedStates = Object.keys(taskStates).reduce((acc, title) => {
      acc[title] = taskStates[title].map(() => false); // Reset task states
      return acc; // Return the accumulator for the next iteration
    }, {}); // Initialize accumulator as an empty object

    setTaskStates(clearedStates); // Update state with cleared states
  };

  return (
    <>
      <Container className="mb-5">
        <Button variant="warning" onClick={handleClick}>
          Clear All Completed Tasks
        </Button>
      </Container>
      <br />
    </>
  );
};

export default ClearTasksButton;
