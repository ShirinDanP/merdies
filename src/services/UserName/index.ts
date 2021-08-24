import HTTPResponse from "../HttpResponse";
import httpClient from "../HttpClient";
import { Errors } from "../errors";
import HttpClient from "../HttpClient";
import { Info, LoginData } from "./model";
import { AxiosRequestConfig } from "axios";

class UserNameService {
  private http: httpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public valideringLoggedInUser = async (
    token?: string | null,
    username?: string
  ): Promise<HTTPResponse<boolean>> => {
    let isUserNameValid: boolean = false;

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Tabelldata/ValideraForradsinloggning?anvandarNamn=${username}`,
        authentication
      );

      isUserNameValid = response?.data;
      return response?.data;
    } catch (err) {
      const { response } = err;
      if (!response) {
        return response?.data;
      }

      const error =
        Object.values(Errors).indexOf(response?.status) > -1
          ? response?.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(isUserNameValid, error);
    }
  };

  public getUserByPersonalNumber = async (
    token?: string | null,
    personalNumber?: number
  ): Promise<HTTPResponse<LoginData>> => {
    let loginData: LoginData = {
      Success: false,
      ErrorMessage: null,
      SignFtg: "",
      FtgFtg: "",
      SessionID: "",
    };

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Login/NummerInloggning?nr=${personalNumber}`,
        authentication
      );
      loginData = response.data;

      return new HTTPResponse(loginData);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          loginData,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(loginData, error);
    }
  };

  public getExternalUsername = async (
    token?: string | null,
    username?: string
  ): Promise<HTTPResponse<Info>> => {
    let userNameInfo: Info = {
      Id: "",
      Description: "",
    };
    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Tabelldata/ExternAnvandare?anvId=${username}`,
        authentication
      );
      userNameInfo = response.data;
      return new HTTPResponse(userNameInfo);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          userNameInfo,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(userNameInfo, error);
    }
  };
}

export default UserNameService;
