import axios, { AxiosRequestConfig } from 'axios';
import { ErrorField } from './shared/errors';

export interface SuccessResponse {
  success: true;
  message: string;
}

export interface FailedResponse {
  success: false;
  message: string;
  error: ErrorField;
}

export type VerifyResponse = SuccessResponse | FailedResponse;

export const send = (search: string, config?: AxiosRequestConfig) =>
  axios.post<VerifyResponse>(
    `/api/verification/send${search}`,
    undefined,
    config
  );

export const confirm = (search: string, config?: AxiosRequestConfig) =>
  axios.post<VerifyResponse>(
    `/api/verification/confirm${search}`,
    undefined,
    config
  );
