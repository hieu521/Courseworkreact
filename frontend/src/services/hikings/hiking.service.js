import axios from "axios";
import { BASE_URL } from "../../BaseURL/url";

export const getHikings = async () => await axios.get(`${BASE_URL}/hikings`);

export const getHikingById = async (hikingId) =>
  await axios.get(`${BASE_URL}/hikings/${hikingId}`);

export const createHiking = async (hiking) =>
  await axios.post(`${BASE_URL}/hikings/`, hiking);

export const updateHiking = async (hikingId, hiking) =>
  await axios.put(`${BASE_URL}/hikings/${hikingId}`, hiking);

export const deleteHiking = async (hikingId) =>
  await axios.delete(`${BASE_URL}/hikings/${hikingId}`);

export const searchHiking = async (keyword) =>
  await axios.get(`${BASE_URL}/hikings/search/${keyword}`);
