import { Alert } from "@mui/material";
import { useUserAuth } from "../../context/UseUserAuth";

const AlertMsg = (props) => {
  const { alert, setAlert } = useUserAuth();
  return (
    <>
      {alert.isOpen && (
        <Alert
          sx={{fontSize:"14px"}}
          severity={alert.status == 200 ? "success" : "error"}
          color={alert.status == 200 ? "success" : "error"}
          style={{
            position: "absolute",
            zIndex: "99999",
            left: "50%",
            top: "20px",
            transform: "translateX(-50%)",
          }}
        >
          {alert.msg}
        </Alert>
      )}
    </>
  );
};

export default AlertMsg;
