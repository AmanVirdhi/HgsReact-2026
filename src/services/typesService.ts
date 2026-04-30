import axios from 'axios';
import { HgsTypes } from '../models/types';

const API_BASE = 'https://hgs-dotnet-2026.onrender.com/api';

export const typesService = {
  addGrievance: async (data: HgsTypes): Promise<HgsTypes> => {
    // Send direct object with proper string types for room/mobile
    const apiData = {
      name: data.name,
      grievancetypes: data.grievancetypes,
      room: String(data.room),
      course: data.course,
      mobile: String(data.mobile),
      description: data.description,
      userEmail: data.userEmail || ''
    };
    const response = await axios.post(`${API_BASE}/HgsInfo`, apiData);
    return response.data;
  },

  getGrievanceList: async (): Promise<HgsTypes[]> => {
    const response = await axios.get<HgsTypes[]>(`${API_BASE}/HgsInfo`);
    return response.data;
  },

  deleteGrievance: async (id: string | number): Promise<void> => {
    await axios.delete(`${API_BASE}/HgsInfo/${id}`);
  },

  getGrievance: async (id: string | number): Promise<HgsTypes> => {
    const response = await axios.get<HgsTypes>(`${API_BASE}/HgsInfo/${id}`);
    return response.data;
  },

  updateGrievance: async (data: HgsTypes): Promise<boolean> => {
    const apiData = {
      id: data.id,
      name: data.name,
      grievancetypes: data.grievancetypes,
      room: String(data.room),
      course: data.course,
      mobile: String(data.mobile),
      description: data.description
    };
    await axios.put(`${API_BASE}/HgsInfo/${data.id}`, apiData);
    return true;
  }
};
