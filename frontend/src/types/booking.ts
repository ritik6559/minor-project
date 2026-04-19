export type BookingStatus =
  | "PENDING_HOD"
  | "PENDING_ADMIN"
  | "PENDING_DEAN"
  | "DEAN_APPROVED"
  | "HOD_REJECTED"
  | "ADMIN_REJECTED"
  | "DEAN_REJECTED"
  | "CANCELLED";

export interface Room {
  id: string | number;
  room_number: string;
  name?: string;
  building?: string;
  floor?: string | number;
  capacity: number;
  facilities?: string[] | string;
  is_active?: boolean;
}

export interface UserLite {
  id: string | number;
  name: string;
  email?: string;
  role?: string;
}

export interface ApprovalEntry {
  id?: string | number;
  actor_name?: string;
  actor_role?: string;
  action: "APPROVED" | "REJECTED" | "SUBMITTED" | "CANCELLED";
  comments?: string;
  created_at: string;
}

export interface Booking {
  id: string | number;
  reference: string;
  room?: Room;
  room_id?: string | number;
  requester_name?: string;
  requester?: UserLite;
  purpose: string;
  expected_attendees?: number;
  phone_number?: string;
  date: string; // YYYY-MM-DD
  start_time: string;
  end_time: string;
  status: BookingStatus;
  faculty_incharge?: UserLite;
  student_coordinator?: UserLite;
  faculty_supervisor?: UserLite;
  approvals?: ApprovalEntry[];
  created_at?: string;
}

export interface NotificationItem {
  id: string | number;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error" | string;
  is_read: boolean;
  booking_id?: string | number;
  created_at: string;
}
