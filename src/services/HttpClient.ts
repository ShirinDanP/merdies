/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import merge from "deepmerge";
import { loginRequest } from "../authConfig";
import { msalInstance } from "../index";
import { TokenResponse } from "./errors";

/* globals CSS_CONFIG */

const ensureTrailingSlash = (url: string): string => url.replace(/\/?$/, "/");

class HttpClient {
  private baseUrl: string;

  private middleware: any[] = [];

  private baseConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  public constructor(baseUrl = "") {
    this.baseUrl = ensureTrailingSlash(baseUrl);
  }

  public applyMiddleware = (
    initialConfig: AxiosRequestConfig = {}
  ): AxiosRequestConfig =>
    this.middleware.reduce(
      (config, applyChanges): void => config.then(applyChanges),
      Promise.resolve(merge(this.baseConfig, initialConfig))
    );

  public get = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + url;
    return axios.get(finalUrl, finalConfig);
  };

  public post = async (
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + url;
    return axios.post(finalUrl, body, finalConfig);
  };

  public put = async (
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + url;
    return axios.put(finalUrl, body, finalConfig);
  };

  public delete = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + url;
    return axios.delete(finalUrl, finalConfig);
  };
}

export default HttpClient;
