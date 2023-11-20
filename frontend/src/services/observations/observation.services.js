import axios from "axios";
import { BASE_URL } from "../../BaseURL/url";
export const getObservation = async (hikingId)=> await axios.get(`${BASE_URL}/observation/get-all/${hikingId}`);

export const getObservationById = async (observationId)=> await axios.get(`${BASE_URL}/observation/${observationId}`);

export const createObservation = async (observation)=> await axios.post(`${BASE_URL}/observation`,observation);

export const updateObservation = async (observationId,observation)=> await axios.put(`${BASE_URL}/observation/${observationId}`,observation);

export const deleteObservation = async (observationId)=> await axios.delete(`${BASE_URL}/observation/${observationId}`);