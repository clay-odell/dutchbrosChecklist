import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Closing from "./Closing"; // Import your Closing component
import Opening from "./Opening"; // Import your Opening component
import Mid from "./Mid"; // Import your Mid component
import ResetAll from "./ResetAll"; // Import your ResetAll component

const DutchTasks = () => {
  const [selectedShift, setSelectedShift] = useState(""); // State to track selected shift
  const [selectedWeek, setSelectedWeek] = useState(""); // State to track selected week
  const [resetFlag, setResetFlag] = useState(false); // State to trigger global reset

  // Handles dropdown item selection for tasks
  const handleShiftSelect = (eventKey) => {
    setSelectedShift(eventKey);
  };

  // Handles dropdown item selection for weeks
  const handleWeekSelect = (eventKey) => {
    setSelectedWeek(eventKey);
  };

  // Global reset function
  const handleResetAll = () => {
    setResetFlag((prevFlag) => !prevFlag); // Toggle the resetFlag to signal a reset
  };

  return (
    <>
      <h1>Dutch Bros Shift Lead Task Check List</h1>
      

      <div>
        {/* Dropdown for shift selection */}
        <DropdownButton
          id="shift-select"
          title={`Shift Selection: ${selectedShift || "Select Shift"}`}
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
        {/* Dropdown for week selection */}
        <DropdownButton
          id="week-select"
          title={`Week Selection: ${selectedWeek || "Select Week"}`}
          onSelect={handleWeekSelect}
          variant="primary"
          className="week"
        >
          <Dropdown.Item eventKey="Weeks 1 & 3">Weeks 1 & 3</Dropdown.Item>
          <Dropdown.Item eventKey="Weeks 2 & 4">Weeks 2 & 4</Dropdown.Item>
        </DropdownButton>
      </div>
      <br />
      <div>
        {/* Add the global ResetAll button */}
      <ResetAll onReset={handleResetAll} />
      </div>

      <div className="task-content">
        {/* Render the appropriate component based on the selected shift */}
        {selectedShift === "Opening" && (
          <Opening selectedWeek={selectedWeek} resetFlag={resetFlag} />
        )}
        {selectedShift === "Mid" && (
          <Mid selectedWeek={selectedWeek} resetFlag={resetFlag} />
        )}
        {selectedShift === "Closing" && (
          <Closing selectedWeek={selectedWeek} resetFlag={resetFlag} />
        )}
        <br />
        
      </div>

      
    </>
  );
};

export default DutchTasks;
