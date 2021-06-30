/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'deepmerge';

/* globals CSS_CONFIG */

const ensureTrailingSlash = (url: string): string => url.replace(/\/?$/, '/');

const removeSlash = (url: string): string => {
  return url.indexOf('/') === 0 ? url.substr(1) : url;
};

class HttpClient {
  private baseUrl: string;

  private middleware: any[] = [];

  private baseConfig: AxiosRequestConfig = {
    timeout: 20000,
    headers: {
      'Accept-Language': `${CSS_CONFIG.LANGUAGE}-${CSS_CONFIG.COUNTRY}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  public constructor(baseUrl = '') {
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
    const finalUrl = this.baseUrl + removeSlash(url);
    return axios.get(finalUrl, finalConfig);
  };

  public post = async (
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + removeSlash(url);
    return axios.post(finalUrl, body, finalConfig);
  };

  public put = async (
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + removeSlash(url);
    return axios.put(finalUrl, body, finalConfig);
  };

  public delete = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    const finalConfig = await this.applyMiddleware(config);
    const finalUrl = this.baseUrl + removeSlash(url);
    return axios.delete(finalUrl, finalConfig);
  };
}

export default HttpClient;
