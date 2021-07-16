import { useState, useEffect } from "react";

interface UseShowModalProps {
  response: any;
}

interface UseShowModalState {
  showSuccess: string;
  handleCloseSuccess: () => void;
}

const useShowModalMessage = ({
  response,
}: UseShowModalProps): [UseShowModalState] => {
  const [showSuccess, setShowSuccessMsg] = useState<string>("");

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessMsg("");
  };

  useEffect((): void => {
    if (
      response &&
      response.Success &&
      (!response.ErrorMessage ||
        response.ErrorMessage.includes("Registrering OK!"))
    ) {
      setShowSuccessMsg("success");
    } else if (
      response &&
      response.Success === false &&
      response.ErrorMessage
    ) {
      setShowSuccessMsg("errorFail");
    } else {
      setShowSuccessMsg("fail");
    }
  }, [response]);

  return [{ showSuccess, handleCloseSuccess }];
};

export default useShowModalMessage;
