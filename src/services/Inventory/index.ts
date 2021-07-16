import HttpClient from "../HttpClient";
import {
  Articles,
  ArticleInfo,
  InventoryData,
  InventoryResponse,
} from "./model";
import { Errors } from "../errors";
import HTTPResponse from "../HttpResponse";
import { AxiosRequestConfig } from "axios";
import HttpResponse from "../HttpResponse";

/* globals CSS_CONFIG */

class InventoryService {
  private http: HttpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  public getArticle = async (
    token: string | null,
    searchTerm: string
  ): Promise<HttpResponse<Articles[]>> => {
    let articles: Articles[] = [{ Id: "" }];

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Artikel/HamtaArtiklar?sokterm=${searchTerm}`,
        authentication
      );
      articles = response.data;
      return new HTTPResponse(articles);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          articles,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(articles, error);
    }
  };

  public getArticleInformation = async (
    sessionId: string,
    token: string | null,
    id: string | number
  ): Promise<HTTPResponse<ArticleInfo>> => {
    let articleInfo: ArticleInfo = {
      ItemId: "",
      Title: "",
      RepairSelected: "",
      Dimension: "",
      StoreLocation: "",
      Balance: 0,
      Unit: "",
      InventoryDate: "",
      Success: false,
      ErrorMessage: null,
      SessionID: "",
    };

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.get(
        `Artikel/HamtaArtikel/${id}?sessionsId=${sessionId}`,
        authentication
      );
      articleInfo = response.data;
      return new HTTPResponse(articleInfo);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          articleInfo,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }
      console.log("error", err);

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;

      return new HTTPResponse(articleInfo, error);
    }
  };

  public submitInventory = async (
    inventoryData: InventoryData,
    token: string | null
  ): Promise<HTTPResponse<InventoryResponse>> => {
    let inventoryResponse: InventoryResponse = {
      Success: false,
      ErrorMessage: null,
      SessionID: "",
    };

    try {
      const authentication: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await this.http.post(
        "Artikel/UforInventering",
        inventoryData,
        authentication
      );
      inventoryResponse = response.data;
      return new HTTPResponse(inventoryResponse);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(
          inventoryResponse,
          Errors.INTERNAL_SERVER_ERROR as number
        );
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.INTERNAL_SERVER_ERROR;
      return new HTTPResponse(inventoryResponse, error);
    }
  };
}

export default InventoryService;
