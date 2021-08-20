import { useEffect, useState } from "react";
import configureServices from "../services";
import {
  ErrorDataWithoutSessionId,
  ErrorReportResponse,
  ObjectIdData,
} from "../services/ErrorReport/model";
import HTTPResponse from "../services/HttpResponse";

interface UseErrorReportProps {
  accessToken: string | null;
  objectId: string;
  errorReportData: ErrorDataWithoutSessionId;
  sessionId: string;
}

interface UseErrorReportState {
  objectIdInfoResult: ObjectIdData[];
  departmentList: string[];
  discoveredList: string[];
  symptomList: string[];
  openModal: boolean;
  response: HTTPResponse<ErrorReportResponse> | undefined;
  submitErrorReport: () => void;
}

const useErrorReport = ({
  accessToken,
  objectId,
  errorReportData,
  sessionId,
}: UseErrorReportProps): [UseErrorReportState] => {
  const [objectIdInfoResult, setObjectIdInfoResult] = useState<ObjectIdData[]>([
    { ObjektId: "", Benamning1: "" },
  ]);
  const [departmentList, setdepartmentList] = useState<string[]>([]);
  const [discoveredList, setDiscoveredList] = useState<string[]>([]);
  const [symptomList, setSymptomList] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<HTTPResponse<ErrorReportResponse>>();

  const getObjectId = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.errorReport.getObjectId(
      objectId,
      accessToken
    )) as any;
    setObjectIdInfoResult(result);
  };

  const getDepartmentInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.errorReport.getErrorReportInfo(
      accessToken,
      "0014"
    )) as any;
    setdepartmentList(result);
  };

  const getDiscoveredInfo = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.errorReport.getErrorReportInfo(
      accessToken,
      "uka"
    )) as any;
    setDiscoveredList(result);
  };

  const getSymptomInfo = async (): Promise<void> => {
    const services = await configureServices();

    const { result } = (await services.errorReport.getErrorReportInfo(
      accessToken,
      "ukb"
    )) as any;
    setSymptomList(result);
  };

  const submitErrorReport = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.errorReport.SubmitErrorReport(
      { SessionsId: sessionId, ...errorReportData },
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
      submitErrorReport,
    },
  ];
};

export default useErrorReport;
