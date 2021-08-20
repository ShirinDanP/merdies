import { useEffect, useState } from "react";
import configureServices from "../services";

interface UserNameProps {
  accessToken?: string;
  username?: string;
  personalNumber?: number;
}

interface UseNameState {
  isUserNameValid: boolean;
  newSessionId: string;
  clickedOnUser: boolean;
  clickOnUser: () => void;
  isUserValid: () => void;
  getUerByPersonalNumber: () => void;
}

const useUserName = ({
  accessToken,
  username,
  personalNumber,
}: UserNameProps): [UseNameState] => {
  const [isUserNameValid, setUserNameValidation] = useState<boolean>(false);
  const [newSessionId, setSessionId] = useState<string>("");
  const [clickedOnUser, setClickOnUser] = useState<boolean>(false);

  const isUserValid = async (): Promise<void> => {
    const services = await configureServices();
    const { response } = (await services.userNameService.valideringLoggedInUser(
      accessToken,
      username
    )) as any;
    setUserNameValidation(response.result);
  };

  const getExternalUserName = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.userNameService.getExternalUsername(
      accessToken,
      username
    )) as any;
  };

  const getUerByPersonalNumber = async (): Promise<void> => {
    const services = await configureServices();
    const { response } =
      (await services.userNameService.getUserByPersonalNumber(
        accessToken,
        personalNumber
      )) as any;
    setSessionId(response?.result?.SessionID);
  };

  const clickOnUser = (): void => {
    setClickOnUser(!clickedOnUser);
    // if (clickedOnUser) {
    //   isUserValid();
    // }
  };

  return [
    {
      isUserNameValid,
      newSessionId,
      clickedOnUser,
      clickOnUser,
      isUserValid,
      getUerByPersonalNumber,
    },
  ];
};

export default useUserName;
