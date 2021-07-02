import axios, { AxiosRequestConfig } from 'axios';

interface VerifyResponse {
  success: boolean;
  message: string;
}

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
