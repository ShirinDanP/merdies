import HTTPResponse from "../HttpResponse";
import httpClient from "../HttpClient";
import { Errors } from "../errors";
import HttpClient from "../HttpClient";
import { AxiosRequestConfig } from "axios";
import HttpResponse from "../HttpResponse";
import {
  WorkOrderNumber,
  Info,
  RekvisionData,
  RekvisionResponse,
} from "./model";

class ReturnService {
  private http: httpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getWorkOrderNumber = async (
    workNumber: string,
    token: string | null
  ): Promise<HttpResponse<WorkOrderNumber>> => {
    let WorkOrderNumber: WorkOrderNumber = {
      Aonr: "",
    };
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Arbetsorder/HamtaAonr?nr=${workNumber}`,
        authentication
      );
      WorkOrderNumber = response.data;
      return new HTTPResponse(WorkOrderNumber);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          WorkOrderNumber,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(WorkOrderNumber, error);
    }
  };

  public getReturnInfo = async (
    token: string | null,
    kNumber: string
  ): Promise<HTTPResponse<Info>> => {
    let info: Info = {
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
      info = response.data;
      return new HTTPResponse(info);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(info, Errors.INTERNAL_SERVER_ERROR as number);
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(info, error);
    }
  };

  public createRekvision = async (
    rekvisionData: RekvisionData,
    token: string | null
  ): Promise<HttpResponse<RekvisionResponse>> => {
    let rekvisionResponse: RekvisionResponse = {
      WorkOrderId: "",
      ObjectId: "",
      Code0: "",
      Code1: "",
      Code2: "",
      Code3: "",
      Code4: "",
      Ftg: "",
      RequisitionId: "",
      Success: true,
      ErrorMessage: null,
      SessionID: "",
    };
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Rekhuvd/SkapaRevisition",
        rekvisionData,
        authentication
      );
      rekvisionResponse = response.data;
      return new HTTPResponse(rekvisionResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          rekvisionResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(rekvisionResponse, error);
    }
  };
}

export default ReturnService;
