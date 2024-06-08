import { api, apiMultipart } from "../api";

export default class RoomService {
  static async getAllRooms() {
    const response = await api.get(`/pokoje`);

    return response.data;
  }

  static async getRoomDetails(id) {
    const response = await api.get(`/pokoje/${id}`);

    return response.data;
  }

  static async createNewRoom(roomData) {
    const formData = new FormData();

    for (const key of Object.keys(roomData.zdjecia)) {
      formData.append("zdjecia", roomData.zdjecia[key]);
    }

    formData.append("dostepnosc", roomData.dostepnosc);
    formData.append("dataZwolnienia", roomData.dataZwolnienia);
    formData.append("cena", roomData.cena);
    formData.append("typPokoju", roomData.typPokoju);
    formData.append("wyposazenie", roomData.wyposazenie);
    formData.append("ileOsob", roomData.ileOsob);

    const response = await apiMultipart.post(`/pokoje`, formData);

    return response;
  }

  static async deleteRoom(id) {
    await api.delete(`/pokoje/${id}`);
  }

  static async findRoomOffers(dateFrom, dateTo, roomType, persons) {
    const response = await api.get("/pokoje/szukaj-ofert", {
      params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        roomType: roomType,
        persons: persons,
      },
    });

    return response.data;
  }
}
