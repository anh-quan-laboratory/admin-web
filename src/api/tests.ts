import axios from "axios";
import { Test, CreateTestInput } from "../types/test";

const API_URL = "http://localhost:3000/api/tests"; // Replace with your actual API URL

// Get all tests with optional keyword filter
export async function getAllTests(keyword: string = ""): Promise<Test[]> {
  try {
    const response = await axios.get(`${API_URL}?keyword=${keyword}`);
    const data = response.data;
    return data?.data.tests || [];
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
}

// Get a test by ID
export async function getTestById(id: string): Promise<Test> {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data.test;
  } catch (error) {
    console.error("Error fetching test by ID:", error);
    throw error;
  }
}

// Create a new test
export async function createTest(data: CreateTestInput): Promise<Test> {
  try {
    const response = await axios.post(API_URL, data);
    return response.data.data.test;
  } catch (error) {
    console.error("Error creating test:", error);
    throw error;
  }
}

// Edit a test by ID
export async function editTest(id: string, data: Partial<Test>): Promise<Test> {
  try {
    console.log("editTest", id, data);
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data.data.test;
  } catch (error) {
    console.error("Error editing test:", error);
    throw error;
  }
}

// Delete a test by ID
export async function deleteTest(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
}
