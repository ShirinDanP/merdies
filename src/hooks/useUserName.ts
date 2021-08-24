import { useEffect, useState } from "react";
import configureServices from "../services";
import { useMsal, useAccount } from "@azure/msal-react";

interface UserNameProps {
  accessToken?: string | null;
}

interface UseNameState {
  isUserNameValid: boolean;
  newSessionId: string;
  clickedOnUser: boolean;
  clickOnUser: () => void;
  onPersonalNumberchange: (value: any) => void;
}

const useUserName = ({ accessToken }: UserNameProps): [UseNameState] => {
  const [isUserNameValid, setUserNameValidation] = useState<boolean>(false);
  const [newSessionId, setSessionId] = useState<string>("");
  const [clickedOnUser, setClickOnUser] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");

  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const isUserValid = async (): Promise<void> => {
    const services = await configureServices();
    const response = (await services.userNameService.valideringLoggedInUser(
      accessToken,
      username
    )) as any;
    setUserNameValidation(response?.result ? response.result : response);
  };

  const getExternalUserName = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.userNameService.getExternalUsername(
      accessToken,
      username
    )) as any;
  };

  const getUerByPersonalNumber = async (
    personalNumber: number
  ): Promise<void> => {
    const services = await configureServices();
    const response = (await services.userNameService.getUserByPersonalNumber(
      accessToken,
      personalNumber
    )) as any;
    setSessionId(response?.result?.SessionID);
  };

  const onPersonalNumberchange = (value: any): void => {
    getUerByPersonalNumber(value);
  };

  const clickOnUser = (): void => {
    setClickOnUser(!clickedOnUser);
  };

  useEffect((): void => {
    if (clickedOnUser) {
      isUserValid();
    }
  }, [clickedOnUser]);

  useEffect((): void => {
    if (account && account.name) {
      setUserName(account.name.split(" ")[0]);
    }
  }, [account]);

  return [
    {
      isUserNameValid,
      newSessionId,
      clickedOnUser,
      clickOnUser,
      onPersonalNumberchange,
    },
  ];
};

export default useUserName;
