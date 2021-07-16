import { Errors } from "../errors";
import HTTPResponse from "../HttpResponse";
import { AxiosRequestConfig } from "axios";
import HttpClient from "../HttpClient";
import {
  FalseReportInfo,
  FalseReportData,
  FalseReportResponse,
  ObjectIdData,
} from "./model";

class FaleReportService {
  private http: HttpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getObjectId = async (
    objectid: string,
    token: string | null
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

  public getFalseReportInfo = async (
    token: string | null,
    kNumber: string
  ): Promise<HTTPResponse<FalseReportInfo>> => {
    let falseReportInfoInfo: FalseReportInfo = {
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
      falseReportInfoInfo = response.data;
      return new HTTPResponse(falseReportInfoInfo);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          falseReportInfoInfo,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(falseReportInfoInfo, error);
    }
  };

  public SubmitFalseReport = async (
    falseReportData: FalseReportData,
    token: string | null
  ): Promise<HTTPResponse<FalseReportResponse>> => {
    let falseReportResponse: FalseReportResponse = {
      WorkOrderId: "",
      Success: false,
      ErrorMessage: "",
      SessionID: "",
    };
    let bodyFormData = new FormData();

    Object.entries(falseReportData).forEach(([key, value]) => {
        bodyFormData.append(key, value)
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
      falseReportResponse = response.data;
      return new HTTPResponse(falseReportResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          falseReportResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;

      return new HTTPResponse(falseReportResponse, error);
    }
  };
}

export default FaleReportService;
