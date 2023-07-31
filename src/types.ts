
// Slots Available date duration

export type SlotAvailable = {
  date: string;
  count: number;
};

export type SlotsAvailable = SlotAvailable[];

export type SlotsAvailableResponseData = {
  slots: SlotsAvailable;
};
export interface SlotsAvailableProps {
  slots: SlotsAvailable;
  onBookSlot: (slot: SlotAvailable) => void;
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
  data: SlotsResponseData | SlotsAvailableResponseData;
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
  slots: SlotAvailable[]; // Assuming the correct import of SlotAvailable type
}
