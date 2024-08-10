interface BasePayment {
  metodaPlatnosci: string;
  statusPlatnosci: string;
  kwota: number;
}

export interface Payment extends BasePayment {
  id: number;
  dataPlatnosci: string | null;
  rezerwacje_id: number;
}

export interface PaymentData extends BasePayment {}
