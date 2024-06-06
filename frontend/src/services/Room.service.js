import { api } from "../api";

export default class RoomService {
  static async getAllRooms() {
    const response = await api.get(`/pokoje`);

    return response.data;
  }

  static async getRoomDetails(id) {
    const response = await api.get(`/pokoje/${id}`);

    return response.data;
  }

  static async deleteRoom(id) {
    await api.delete(`/pokoje/${id}`);
  }
}
