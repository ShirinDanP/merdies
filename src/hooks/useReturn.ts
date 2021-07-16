import { useState, useEffect } from "react";
import configureServices from "../services";

import { RekvisionData, WorkOrderNumber } from "../services/Return/model";
import { ObjectIdData } from "../services/FalseReport/model";

interface UseReturnProps {
  accessToken: string | null;
  workNumber: string;
  objectId: string;
  rekvisionData: RekvisionData;
}
interface UseReturnStates {
  objectIdInfoResult: ObjectIdData[];
  kontoInfo: string[];
  ansvarInfo: string[];
  activityInfo: string[];
  kStalle: string[];
  uppFoljn: string[];
  workOrderNumber: WorkOrderNumber[];
  createRekvision: () => void;
}

const useReturn = ({
  rekvisionData,
  workNumber,
  accessToken,
  objectId,
}: UseReturnProps): [UseReturnStates] => {
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

  const getObjectId = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.falseReport.getObjectId(
      objectId,
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
    console.log("result", result);
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
    (await services.returnService.createRekvision(
      rekvisionData,
      accessToken
    )) as any;
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
      createRekvision,
    },
  ];
};

export default useReturn;
