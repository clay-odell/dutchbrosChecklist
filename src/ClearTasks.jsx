import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClearTasksButton = ({ taskStates, setTaskStates }) => {
  const handleClick = (e) => {
    e.preventDefault();

    // Properly use reduce to reset all tasks to false
    const clearedStates = Object.keys(taskStates).reduce((acc, title) => {
      acc[title] = taskStates[title].map(() => false);
      return acc; 
    }, {});

    setTaskStates(clearedStates);
    localStorage.removeItem("openingTasksState"); // Optional: Adjust local storage clearing logic as needed
    localStorage.removeItem("closingTasksState"); // Optional for Closing component tasks
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
