import { useEffect, useState } from "react";
import configureServices from "../services";
import {
  FalseDataWithoutSessionId,
  FalseReportResponse,
  ObjectIdData,
} from "../services/FalseReport/model";
import HTTPResponse from "../services/HttpResponse";

interface UseFalseReportProps {
  accessToken: string | null;
  objectId: string;
  falseReportData: FalseDataWithoutSessionId;
  sessionId: string;
}

interface UseFalseReportState {
  objectIdInfoResult: ObjectIdData[];
  departmentList: string[];
  discoveredList: string[];
  symptomList: string[];
  openModal: boolean;
  response: HTTPResponse<FalseReportResponse> | undefined;
  submitFalseRepost: () => void;
}

const useFalseReport = ({
  accessToken,
  objectId,
  falseReportData,
  sessionId,
}: UseFalseReportProps): [UseFalseReportState] => {
  const [objectIdInfoResult, setObjectIdInfoResult] = useState<ObjectIdData[]>([
    { ObjektId: "", Benamning1: "" },
  ]);
  const [departmentList, setdepartmentList] = useState<string[]>([]);
  const [discoveredList, setDiscoveredList] = useState<string[]>([]);
  const [symptomList, setSymptomList] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<HTTPResponse<FalseReportResponse>>();

  const getObjectId = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.falseReport.getObjectId(
      objectId,
      accessToken
    )) as any;
    setObjectIdInfoResult(result);
  };

  const getDepartmentInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.falseReport.getFalseReportInfo(
      accessToken,
      "0014"
    )) as any;
    setdepartmentList(result);
  };

  const getDiscoveredInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.falseReport.getFalseReportInfo(
      accessToken,
      "uka"
    )) as any;
    setDiscoveredList(result);
  };

  const getSymptomInfo = async (): Promise<void> => {
    const services = await configureServices();

    const { result } = (await services.falseReport.getFalseReportInfo(
      accessToken,
      "ukb"
    )) as any;
    setSymptomList(result);
  };

  const submitFalseRepost = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.falseReport.SubmitFalseReport(
      { SessionsId: sessionId, ...falseReportData },
      accessToken
    )) as any;
    setResponse(result);
    setOpenModal(true);
  };

  useEffect((): void => {
    getObjectId();
    getDepartmentInfo();
    getDiscoveredInfo();
    getSymptomInfo();
  }, [accessToken, objectId, sessionId]);

  return [
    {
      objectIdInfoResult,
      departmentList,
      discoveredList,
      symptomList,
      response,
      openModal,
      submitFalseRepost,
    },
  ];
};

export default useFalseReport;
