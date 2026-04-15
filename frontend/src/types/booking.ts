export type Role = "Faculty (Requester)" | "Faculty (Approver)" | "HOD" | "Admin Officer" | "Registrar";

export type Status =
  | "draft"
  | "pending_sign"
  | "pending_hod"
  | "pending_admin"
  | "pending_registrar"
  | "approved"
  | "rejected";

export type View = "dashboard" | "new" | "detail" | "preview";

export interface DateSlot {
  date: string;
  from: string;
  to: string;
}

export interface Comment {
  id: string;
  author: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface BookingRequest {
  id: string;
  room: string;
  facultyName: string;
  designation: string;
  phone: string;
  department: string;
  dates: DateSlot[];
  refreshment: boolean;
  refreshDetails: string;
  paSystem: boolean;
  strength: string;
  purpose: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
  facultySignature: string;
  facultySignedAt?: number;
  hodSignature: string;
  hodApproved: boolean | null;
  hodSignedAt?: number;
  adminRemarks: string;
  adminAvailability: string;
  adminSignature: string;
  adminSignedAt?: number;
  registrarApproved: boolean | null;
  registrarSignature: string;
  registrarSignedAt?: number;
  comments: Comment[];
}

export const ROOMS = ["AUDITORIUM", "BOARD ROOM", "LT1", "LT2", "LT3"] as const;
export const ROLES: Role[] = ["Faculty (Requester)", "Faculty (Approver)", "HOD", "Admin Officer", "Registrar"];

export const STEP_KEYS: Status[] = ["draft", "pending_sign", "pending_hod", "pending_admin", "pending_registrar", "approved"];
export const STEP_LABELS = ["Draft", "Signed", "HOD", "Admin", "Registrar", "Final"];

export const STATUS_LABELS: Record<Status, string> = {
  draft: "Draft",
  pending_sign: "Awaiting Signature",
  pending_hod: "Pending HOD",
  pending_admin: "Pending Admin",
  pending_registrar: "Pending Registrar",
  approved: "Approved",
  rejected: "Rejected",
};

export const ROLE_ROUTES: Record<Role, string> = {
  "Faculty (Requester)": "/faculty",
  "Faculty (Approver)": "/approver",
  "HOD": "/hod",
  "Admin Officer": "/admin",
  "Registrar": "/registrar",
};
