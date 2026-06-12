// crm-frontend-next\app\lib\master-settings.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Country {
  id: string;
  name: string;
}

export interface Intake {
  id: string;
  name: string;
}

export interface LeadSource {
  id: string;
  name: string;
}

export const getCountries = async () => {
  const { data } = await axios.get<Country[]>(`${API_URL}/countries`);

  return data;
};

export const getIntakes = async () => {
  const { data } = await axios.get<Intake[]>(`${API_URL}/intakes`);

  return data;
};

export const getLeadSources = async () => {
  const { data } = await axios.get<LeadSource[]>(`${API_URL}/lead-sources`);

  return data;
};

export interface MasterItem {
  id: string;
  name: string;
}

export const getMasters = async (endpoint: string) => {
  const { data } = await axios.get<MasterItem[]>(`${API_URL}${endpoint}`);

  return data;
};

export const createMaster = async (endpoint: string, name: string) => {
  const { data } = await axios.post(`${API_URL}${endpoint}`, {
    name,
  });

  return data;
};

export const deleteMaster = async (endpoint: string, id: string) => {
  const { data } = await axios.delete(`${API_URL}${endpoint}/${id}`);

  return data;
};
