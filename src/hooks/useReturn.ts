import { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";

import configureServices from "../services";
import {
  RekvisionData,
  WorkOrderNumber,
  RequisionRadResponse,
  RekvisionRowResponse,
} from "../services/Return/model";
import { ObjectIdData } from "../services/ErrorReport/model";
import HTTPResponse from "../services/HttpResponse";

interface UseReturnProps {
  accessToken?: string | null;
  workNumber?: string;
  objectId?: string;
  rekvisionData?: RekvisionData;
  sessionId?: string;
}
interface UseReturnStates {
  objectIdInfoResult: ObjectIdData[];
  kontoInfo: string[];
  ansvarInfo: string[];
  activityInfo: string[];
  kStalle: string[];
  uppFoljn: string[];
  workOrderNumber: WorkOrderNumber[];
  openModal: boolean;
  response: HTTPResponse<RekvisionData> | undefined;
  createRekvision: () => void;
  utforUttag: (value: boolean) => void;
  hamtaRekvisitionsRader: () => void;
  requsitionNumber: string;
  getRekvisionRadResponse?: RequisionRadResponse;
  getUtforUttagResponse?: RekvisionRowResponse;
}

const useReturn = ({
  rekvisionData,
  workNumber,
  accessToken,
  objectId,
  sessionId,
}: UseReturnProps): [UseReturnStates] => {
  const { t } = useTranslation();
  const { instance } = useMsal();

  const [workOrderNumber, setWorkNumber] = useState<WorkOrderNumber[]>([
    {
      Aonr: "",
    },
  ]);
  const [objectIdInfoResult, setObjectIdInfoResult] = useState<ObjectIdData[]>([
    { ObjektId: "", Benamning1: "" },
  ]);

  const [kontoInfo, setKontoInfo] = useState<string[]>([]);
  const [ansvarInfo, setAnsvarInfo] = useState<string[]>([]);
  const [activityInfo, setActivityInfo] = useState<string[]>([]);
  const [kStalle, setKstalle] = useState<string[]>([]);
  const [uppFoljn, setUppFoljn] = useState<string[]>([]);
  const [requsitionNumber, setRequisitionNumber] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<HTTPResponse<RekvisionData>>();
  const [getRekvisionRadResponse, setRekvisitionRadResponse] =
    useState<RequisionRadResponse>();
  const [getUtforUttagResponse, setUtforUttagResponse] =
    useState<RekvisionRowResponse>();

  const getObjectId = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.errorReport.getObjectId(
      objectId as any,
      accessToken
    )) as any;
    setObjectIdInfoResult(result);
  };

  const getAONumber = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getWorkOrderNumber(
      workNumber,
      accessToken
    )) as any;
    setWorkNumber(result);
  };

  const getKontoInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getReturnInfo(
      accessToken,
      "k-00"
    )) as any;
    setKontoInfo(result);
  };

  const getAnsvarInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getReturnInfo(
      accessToken,
      "k-01"
    )) as any;
    setAnsvarInfo(result);
  };

  const getAktivityInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getReturnInfo(
      accessToken,
      "k-02"
    )) as any;
    setActivityInfo(result);
  };

  const getKStalle = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getReturnInfo(
      accessToken,
      "k-03"
    )) as any;
    setKstalle(result);
  };

  const getUppFoljn = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.returnService.getReturnInfo(
      accessToken,
      "k-04"
    )) as any;
    setUppFoljn(result);
  };

  const createRekvision = async (): Promise<void> => {
    const services = await configureServices();
    const newData = { ...rekvisionData, sessionsId: sessionId };
    const response = (await services.returnService.createRekvision(
      newData as any,
      accessToken
    )) as any;
    setRequisitionNumber(response.result.RequisitionId);
    setOpenModal(true);
    setResponse(response.result);
    localStorage.setItem("requisitionNr", response.result.RequisitionId);
    if (response.result.Success) {
      navigate(`/${t("pageUrls.returnInv")}`);
    }
  };

  const utforUttag = async (loggedOut: boolean): Promise<void> => {
    const services = await configureServices();
    const requestNumber = localStorage.getItem("requisitionNr");
    let requisitionData = {
      sessionsId: sessionId,
      reqnr: requestNumber,
    };
    const result = (await services.returnService.utforUttag(
      requisitionData as any,
      accessToken
    )) as any;
    setOpenModal(true);
    if (!loggedOut && result.result.Success) {
      navigate("/");
    } else if (loggedOut && result.result.Success) {
      instance.logoutRedirect();
    }
    setUtforUttagResponse(result.result);
  };

  const hamtaRekvisitionsRader = async (): Promise<void> => {
    const services = await configureServices();
    const requestNumber = localStorage.getItem("requisitionNr");

    const response = (await services.returnService.hamtaRekvisitionsrader(
      accessToken,
      sessionId,
      requestNumber
    )) as any;
    setOpenModal(true);
    setRekvisitionRadResponse(response.result);
    if (response.result.Success) {
      navigate(`/${t("pageUrls.rekvisition")}`);
    }
    localStorage.setItem(
      "RequisitionList",
      JSON.stringify(response?.result?.RequisitionList)
    );
  };

  useEffect((): void => {
    getAONumber();
  }, [workNumber, accessToken]);

  useEffect((): void => {
    getObjectId();
    getKontoInfo();
    getAnsvarInfo();
    getAktivityInfo();
    getKStalle();
    getUppFoljn();
  }, [accessToken, objectId]);

  return [
    {
      workOrderNumber,
      kontoInfo,
      ansvarInfo,
      activityInfo,
      kStalle,
      uppFoljn,
      objectIdInfoResult,
      requsitionNumber,
      openModal,
      response,
      getRekvisionRadResponse,
      getUtforUttagResponse,
      createRekvision,
      utforUttag,
      hamtaRekvisitionsRader,
    },
  ];
};

export default useReturn;
