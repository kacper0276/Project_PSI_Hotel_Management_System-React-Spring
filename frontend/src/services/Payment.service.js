import { apiJson } from "../api";

export default class PaymentService {
  static async createPayment(paymentData) {
    const formData = new FormData();

    Object.keys(paymentData).forEach((key) => {
      formData.append(key, paymentData[key]);
    });

    const response = await apiJson.post(`/platnosci`, formData);

    return response.data.message;
  }
}
