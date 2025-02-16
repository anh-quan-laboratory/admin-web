import axios from "axios";
import { Combo, ComboSchema } from "../types/combo";

export async function getAllCombos(): Promise<Combo[]> {
  const response = await axios.get(`http://localhost:3000/api/combos`);
  const data = response.data;

  return data?.data.combos || [];
}

// Create a new combo
export async function createCombo(data: ComboSchema): Promise<Combo> {
  const response = await axios.post(`http://localhost:3000/api/combos`, data);
  return response.data.data.combo;
}

// Edit an existing combo
export async function updateCombo(id: string, data: ComboSchema): Promise<Combo> {
  const response = await axios.patch(`http://localhost:3000/api/combos/${id}`, data);
  return response.data.data.combo;
}

// Delete a combo
export async function deleteCombo(id: string): Promise<void> {
  await axios.delete(`http://localhost:3000/api/combos/${id}`);
}
