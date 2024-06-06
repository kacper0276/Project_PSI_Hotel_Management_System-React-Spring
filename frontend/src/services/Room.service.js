import axios from "axios";
import { API_URL } from "../App";

export default class RoomService {
  static async getAllRooms() {
    const response = await axios.get(`${API_URL}/pokoje`);

    return response.data;
  }

  static async getRoomDetails(id) {
    const response = await axios.get(`${API_URL}/pokoje/${id}`);

    return response.data;
  }
}
