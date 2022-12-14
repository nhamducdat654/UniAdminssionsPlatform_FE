/* eslint-disable */
import { CallAPI } from './axiosBase';
import { GET_NEWS_ENDPOINT } from '../constants/Endpoints/NewsEndpoint';

export const getNewsService = (data) =>
CallAPI(
  `${GET_NEWS_ENDPOINT}?title=${data.title}&tags=${data.tags}&sort=${data.sort}&page=${data.page}&limit=${data.limit}`,
  'GET'
);
