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
  RekvisionRowData,
  RekvisionRowResponse,
  RequisitionNumber,
  RequisionRadResponse,
} from "./model";

class ReturnService {
  private http: httpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getWorkOrderNumber = async (
    workNumber?: string,
    token?: string | null
  ): Promise<HttpResponse<WorkOrderNumber>> => {
    let workOrderNumber: WorkOrderNumber = {
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
      workOrderNumber = response.data;
      return new HTTPResponse(workOrderNumber);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          workOrderNumber,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(workOrderNumber, error);
    }
  };

  public getReturnInfo = async (
    token?: string | null,
    kNumber?: string
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
    token?: string | null
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

    let bodyFormData = new FormData();

    Object.entries(rekvisionData).forEach(([key, value]) => {
      bodyFormData.append(key, value);
    });
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Rekhuvd/SkapaRekvisition",
        bodyFormData,
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

  public createRekvisionRow = async (
    rekvisionRowData?: RekvisionRowData,
    token?: string | null
  ): Promise<HttpResponse<RekvisionRowResponse>> => {
    let rekvisionRowResponse: RekvisionRowResponse = {
      Success: true,
      ErrorMessage: null,
      SessionID: "",
    };
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Rekvrad/SkapaRekvisitonsrad",
        rekvisionRowData,
        authentication
      );
      rekvisionRowResponse = response.data;
      return new HTTPResponse(rekvisionRowResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          rekvisionRowResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(rekvisionRowResponse, error);
    }
  };

  public utforUttag = async (
    requisitionNumberData: RequisitionNumber,
    token?: string | null
  ): Promise<HttpResponse<RekvisionRowResponse>> => {
    let rekvisionRowResponse: RekvisionRowResponse = {
      Success: true,
      ErrorMessage: null,
      SessionID: "",
    };

    let bodyFormData = new FormData();

    Object.entries(requisitionNumberData).forEach(([key, value]) => {
      bodyFormData.append(key, value);
    });

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Rekhuvd/UtforUttag",
        bodyFormData,
        authentication
      );
      rekvisionRowResponse = response.data;
      return new HTTPResponse(rekvisionRowResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          rekvisionRowResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(rekvisionRowResponse, error);
    }
  };

  public hamtaRekvisitionsrader = async (
    token?: string | null,
    sessionId?: string,
    rekvisitionsId?: string | null
  ): Promise<HTTPResponse<RequisionRadResponse>> => {
    let requisionRadResponse: RequisionRadResponse = {
      RequisitionId: "",
      RequisitionList: [],
      Success: true,
      ErrorMessage: null,
      SessionID: "",
    };

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Rekhuvd/HamtaRekvisitionsrader?sessionsId=${sessionId}&rekvisitionsId=${rekvisitionsId}`,
        authentication
      );
      requisionRadResponse = response.data;
      return new HTTPResponse(requisionRadResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          requisionRadResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(requisionRadResponse, error);
    }
  };
}

export default ReturnService;
