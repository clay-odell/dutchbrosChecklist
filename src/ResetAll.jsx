import { Button } from "react-bootstrap";
const ResetAll = ({ onReset }) => {
  return (
    <Button variant="danger" onClick={onReset}>
      Reset All
    </Button>
  );
};
export default ResetAll;
