import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Closing from "./Closing"; // Import your Closing component
import Opening from "./Opening"; // Import your Opening component
import Mid from "./Mid"; // Import your Mid component


const DutchTasks = () => {
  const [selectedShift, setSelectedShift] = useState(""); // State to track selected shift
  const [selectedWeek, setSelectedWeek] = useState(""); // State to track selected week

  // Handles dropdown item selection for tasks
  const handleShiftSelect = (eventKey) => {
    setSelectedShift(eventKey);
  };

  // Handles dropdown item selection for weeks
  const handleWeekSelect = (eventKey) => {
    setSelectedWeek(eventKey);
  };

  return (
   <>
   <h1>Dutch Bros Shift Lead Task Check List</h1>
   <div>
    <DropdownButton
    id="shift-select"
    title={`Shift Selection: ${selectedShift}`}
    onSelect={handleShiftSelect}
    variant="success"
    className="shiftType"
    >
        <Dropdown.Item eventKey="Opening">Opening Tasks</Dropdown.Item>
        <Dropdown.Item eventKey="Mid">Mid Tasks</Dropdown.Item>
        <Dropdown.Item eventKey="Closing">Closing Tasks</Dropdown.Item>
    </DropdownButton>
   </div>
   <br />
    <div>
        <DropdownButton
        id="week-select"
        title={`Week Selection: ${selectedWeek}`}
        onSelect={handleWeekSelect}
        variant="primary"
        className="week"
        >
            <Dropdown.Item eventKey="Weeks 1 & 3">Weeks 1 & 3</Dropdown.Item>
            <Dropdown.Item eventKey="Weeks 2 & 4">Weeks 2 & 4</Dropdown.Item>
        </DropdownButton>
    </div>

    <div className="task-content">
        {selectedShift === "Opening" && <Opening selectedWeek={selectedWeek} />}
        {selectedShift === "Mid" && <Mid selectedWeek={selectedWeek} />}
        {selectedShift === "Closing" && <Closing selectedWeek={selectedWeek} />}
    </div>
    
   </>
  );
};

export default DutchTasks;
