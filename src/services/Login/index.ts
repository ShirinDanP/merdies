import HTTPResponse from "../HttpResponse";
import httpClient from "../HttpClient";
import { Errors } from "../errors";
import HttpClient from "../HttpClient";
import { LoginData } from "./model";
import { AxiosRequestConfig } from "axios";

class LogInService {
  private http: httpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getLogInInfo = async (
    token: string
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
      const response = await this.http.get("Login/Inloggning", authentication);
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
}

export default LogInService;
