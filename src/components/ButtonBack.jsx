import Button from "./Button";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function ButtonBack({ children }) {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        type="back"
      >
        {children}
      </Button>
    </div>
  );
}

export default ButtonBack;
