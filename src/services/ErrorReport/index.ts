import { Errors } from "../errors";
import HTTPResponse from "../HttpResponse";
import { AxiosRequestConfig } from "axios";
import HttpClient from "../HttpClient";
import {
  ErrorReportInfo,
  ErrorReportData,
  ErrorReportResponse,
  ObjectIdData,
} from "./model";

class ErrorReportService {
  private http: HttpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getObjectId = async (
    objectid: string,
    token?: string | null
  ): Promise<HTTPResponse<ObjectIdData>> => {
    let objectIdInfo: ObjectIdData = {
      ObjektId: "",
      Benamning1: "",
    };
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Objektdata/HamtaObjekt?objektid=${objectid}`,
        authentication
      );
      objectIdInfo = response.data;
      return new HTTPResponse(objectIdInfo);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          objectIdInfo,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(objectIdInfo, error);
    }
  };

  public getErrorReportInfo = async (
    token: string | null,
    kNumber: string
  ): Promise<HTTPResponse<ErrorReportInfo>> => {
    let errorReportInfoInfo: ErrorReportInfo = {
      Id: "",
      Description: "",
    };

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Tabelldata/Tabelldata?tabnr=${kNumber}`,
        authentication
      );
      errorReportInfoInfo = response.data;
      return new HTTPResponse(errorReportInfoInfo);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          errorReportInfoInfo,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(errorReportInfoInfo, error);
    }
  };

  public SubmitErrorReport = async (
    errorReportData: ErrorReportData,
    token: string | null
  ): Promise<HTTPResponse<ErrorReportResponse>> => {
    let errorReportResponse: ErrorReportResponse = {
      WorkOrderId: "",
      Success: false,
      ErrorMessage: "",
      SessionID: "",
    };
    let bodyFormData = new FormData();

    Object.entries(errorReportData).forEach(([key, value]) => {
      bodyFormData.append(key, value);
    });

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Arbetsorder/SkapaAo",
        bodyFormData,
        authentication
      );
      errorReportResponse = response.data;
      return new HTTPResponse(errorReportResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          errorReportResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;

      return new HTTPResponse(errorReportResponse, error);
    }
  };
}

export default ErrorReportService;
