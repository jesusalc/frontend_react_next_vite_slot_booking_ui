
// Slots Booked date duration

export type SlotBooked = {
  date: string;
  count: number;
  disabled: boolean
};

export type SlotsBooked = SlotBooked[];

export type SlotsBookedResponseData = {
  slots: SlotsBooked;
};
export interface SlotsBookedProps {
  slots: SlotsBooked;
  onBookSlot: (slot: SlotBooked) => void;
}


// Slot start end
export type Slot = {
  start: string;
  end: string;
};
export type Slots = Slot[];
export type SlotsResponseData = {
  slots: Slots;
};
export interface SlotsProps {
  slots: Slots;
  onBookSlot: (slot: Slot) => void;
}


/// Response data error success
export type SuccessResponse = {
  error: string;
  data: SlotsResponseData | SlotsBookedResponseData;
  status: string;
};
export type ErrorResponse = {
  error: string;
  data: string;
  status: string;
};

export type ApiResponse = SuccessResponse | ErrorResponse;

export function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return response.error === '';
}

export interface BookingFormProps {
  onSearchSlots: (searchParams: { date: string; duration: string }) => void;
}

export interface CalendarWithSlotsProps {
  slots: SlotBooked[]; // Assuming the correct import of SlotBooked type
}
