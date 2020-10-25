import URL from 'url-parse';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IRequestArguments } from '@/lib/interfaces';
import { Logger } from '@/tools/Logger';

/**
 * Service to house logic for sending requests to the API
 */
export class ApiService {
  /**
   * Request client
   */
  private readonly client: AxiosInstance

  /**
   * Cached instance of the service
   */
  private static instance: ApiService | null = null;

  /**
   * Logger
   */
  private readonly logger: Logger = new Logger({ context: 'ApiService' });

  /**
   * Base URL for requests to the API
   */
  public readonly endpoint: URL;

  /**
   * Get the singleton instance of this class
   */
  public static getInstance(endpoint?: string) {
    const apiEndpoint = endpoint ?? process.env.VUE_APP_API_ENDPOINT;

    if (!apiEndpoint) {
      throw Error(
        'Unable to initialize instance of `ApiService` without endpoint. '
        + 'Provide a parameter or ensure your environment variables are set correctly',
      );
    }

    if (!this.instance) {
      this.instance = new ApiService(apiEndpoint);
      return this.instance;
    }
    return this.instance;
  }

  /**
   * Constructor
   * @param endpoint
   */
  private constructor(endpoint: string) {
    const url = new URL(endpoint);

    if (url.protocol === null) {
      throw new Error('Invalid API endpoint provided');
    }

    this.endpoint = url;

    this.client = Axios.create({
      baseURL: this.endpoint.href,
    });
  }

  /**
   * Post request.
   *
   * @param path
   * @param {object} params
   * @throws {Error}
   * @returns {object} Response body
   */
  async post<T = any>(path: string, params: IRequestArguments, axiosConfig?: AxiosRequestConfig) {
    const options = axiosConfig ?? {};
    const config: AxiosRequestConfig = {
      responseType: 'json',
      ...options,
      method: 'POST',
      url: path,
    };
    this.logger.request({ ...config, params });
    const response = await this.client.post<T>(path, params, config);
    this.logger.response(response);
    return response;
  }

  /**
   * Get request.
   *
   * @param path
   * @param params
   */
  async get<T = any>(path: string, params: IRequestArguments, axiosConfig?: AxiosRequestConfig) {
    const options = axiosConfig ?? {};
    const config: AxiosRequestConfig = {
      params,
      responseType: 'json',
      ...options,
      method: 'GET',
      url: path,
    };
    this.logger.request(config);
    const response = await this.client.get<T>(path, config);
    this.logger.response(response);
    return response;
  }

  /**
   * Put request.
   *
   * @deprecated
   *
   * @param path
   * @param params
   */
  async put<T = any>(path: string, params: IRequestArguments, axiosConfig?: AxiosRequestConfig) {
    this.logger.warn('ApiService: Use of the `PUT` protocol is deprecated - use `PATCH` instead.');

    const options = axiosConfig ?? {};
    const config: AxiosRequestConfig = {
      responseType: 'json',
      ...options,
      method: 'PUT',
      url: path,
    };
    this.logger.request({ ...config, params });
    const response = await this.client.put<T>(path, params, config);
    this.logger.response(response);
    return response;
  }

  /**
   * Patch request.
   *
   * @param path
   * @param params
   */
  async patch<T = any>(path: string, params: IRequestArguments, axiosConfig?: AxiosRequestConfig) {
    const options = axiosConfig ?? {};
    const config: AxiosRequestConfig = {
      responseType: 'json',
      ...options,
      method: 'PATCH',
      url: path,
    };
    this.logger.request({ ...config, params });
    const response = await this.client.patch<T>(path, params, config);
    this.logger.response(response);
    return response;
  }

  /**
   * Delete request.
   *
   * @param path
   * @param params
   */
  async delete<T = any>(path: string, params: IRequestArguments, axiosConfig?: AxiosRequestConfig) {
    const options = axiosConfig ?? {};
    const config: AxiosRequestConfig = {
      params,
      responseType: 'json',
      ...options,
      method: 'DELETE',
      url: path,
    };
    this.logger.request(config);
    const response = await this.client.delete<T>(path, config);
    this.logger.response(response);
    return response;
  }
}

export default ApiService;
