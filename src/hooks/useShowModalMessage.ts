import { useState, useEffect } from "react";

interface UseShowModalProps {
  response: any;
}

interface UseShowModalState {
  showSuccess: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSuccess: () => void;
}

const useShowModalMessage = ({
  response,
}: UseShowModalProps): [UseShowModalState] => {
  const [showSuccess, setShowSuccessMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(false);
      setShowSuccessMsg("success");
    } else if (
      response &&
      response.Success === false &&
      response.ErrorMessage
    ) {
      setIsLoading(false);
      setShowSuccessMsg("errorFail");
    } else {
      setIsLoading(false);
      setShowSuccessMsg("fail");
    }
  }, [response]);

  return [{ showSuccess, isLoading, setIsLoading, handleCloseSuccess }];
};

export default useShowModalMessage;
