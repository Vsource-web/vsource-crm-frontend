// lib/branches.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Branch {
  id: string;
  name: string;
  code: string;
  city?: string;
  address?: string;

  usersCount: number;
  leadsCount: number;
  studentsCount: number;

  createdAt: string;
}

export interface CreateBranchDto {
  name: string;
  code: string;
  city?: string;
  address?: string;
}

export const getBranches = async () => {
  const { data } = await axios.get<Branch[]>(`${API_URL}/branches`);
  return data;
};

export const createBranch = async (payload: CreateBranchDto) => {
  const { data } = await axios.post(`${API_URL}/branches`, payload);
  return data;
};

export const updateBranch = async (id: string, payload: CreateBranchDto) => {
  const { data } = await axios.patch(`${API_URL}/branches/${id}`, payload);

  return data;
};

export const deleteBranch = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/branches/${id}`);

  return data;
};
