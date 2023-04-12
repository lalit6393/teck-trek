import { Alert } from "@mui/material";
import { useUserAuth } from "../../context/UseUserAuth";

const AlertMsg = (props) => {
  const { alert, setAlert } = useUserAuth();
  return (
    <>
      {alert.isOpen && (
        <Alert
          sx={{ fontSize: "14px", width: "90%", maxWidth: "300px" }}
          severity={alert.status == 200 ? "success" : "error"}
          color={alert.status == 200 ? "success" : "error"}
          style={{
            position: "fixed",
            zIndex: "99999",
            right: "20px",
            bottom: "20px",
          }}
        >
          {alert.msg}
        </Alert>
      )}
    </>
  );
};

export default AlertMsg;
