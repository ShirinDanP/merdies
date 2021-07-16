import { useState, useEffect } from "react";
import configureServices from "../services";

interface UseLogInProps {
  accessToken?: string;
}

interface UseLogInState {
  sessionId: string;
}

const useSessionId = (accessToken: string): [UseLogInState] => {
  const [sessionId, setSessionId] = useState<string>("");
  const getLoginData = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.logIn.getLogInInfo(accessToken)) as any;
    setSessionId(result.SessionID);
    console.log();
  };

  useEffect((): void => {
    getLoginData();
  }, [accessToken]);

  return [{ sessionId }];
};

export default useSessionId;
