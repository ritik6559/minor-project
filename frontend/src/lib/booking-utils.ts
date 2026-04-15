import { BookingRequest, Role, Status, STEP_KEYS } from "@/types/booking";

export function newForm(): BookingRequest {
  return {
    id: "", room: "LT1", facultyName: "", designation: "", phone: "", department: "",
    dates: [{ date: "", from: "", to: "" }],
    refreshment: false, refreshDetails: "", paSystem: false, strength: "", purpose: "",
    status: "draft", createdAt: 0, updatedAt: 0,
    facultySignature: "", hodSignature: "", hodApproved: null,
    adminRemarks: "", adminAvailability: "Available", adminSignature: "",
    registrarApproved: null, registrarSignature: "",
    comments: [],
  };
}

export function getStepIndex(status: Status): number {
  const idx = STEP_KEYS.indexOf(status);
  return idx === -1 ? 0 : idx;
}

export function canActOn(req: BookingRequest, role: Role): boolean {
  if (role === "Faculty (Requester)") return req.status === "draft" || req.status === "pending_sign";
  if (role === "HOD") return req.status === "pending_hod";
  if (role === "Admin Officer") return req.status === "pending_admin";
  if (role === "Registrar") return req.status === "pending_registrar";
  return false;
}

export function visibleRequests(reqs: BookingRequest[], role: Role): BookingRequest[] {
  if (role === "Faculty (Requester)") return reqs.filter(r => r.status === "draft" || r.status === "pending_sign");
  if (role === "Faculty (Approver)") return reqs.filter(r => r.status !== "draft");
  if (role === "HOD") return reqs.filter(r => ["pending_hod", "approved", "rejected"].includes(r.status));
  if (role === "Admin Officer") return reqs.filter(r => ["pending_admin", "approved", "rejected"].includes(r.status));
  if (role === "Registrar") return reqs.filter(r => ["pending_registrar", "approved", "rejected"].includes(r.status));
  return reqs;
}

export function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
