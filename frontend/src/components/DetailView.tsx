import { BookingRequest, Role, Comment } from "@/types/booking";
import { fmtDate } from "@/lib/booking-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";
import { StepBar } from "./StepBar";
import { SignatureBox } from "./SignatureBox";
import { AdminAction } from "./AdminAction";
import { CommentThread } from "./CommentThread";
import { ArrowLeft, FileText, Trash2, Send, Check, X } from "lucide-react";

interface DetailViewProps {
  req: BookingRequest;
  role: Role;
  userName: string;
  onUpdate: (req: BookingRequest) => void;
  onDelete: (id: string) => void;
  onPreview: () => void;
  onBack: () => void;
}

export function DetailView({ req, role, userName, onUpdate, onDelete, onPreview, onBack }: DetailViewProps) {
  const save = (patch: Partial<BookingRequest>) => {
    onUpdate({ ...req, ...patch, updatedAt: Date.now() });
  };

  const handleAddComment = (comment: Comment) => {
    const updatedComments = [...(req.comments || []), comment];
    save({ comments: updatedComments });
  };

  const DetailField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-foreground">{value || "—"}</p>
    </div>
  );

  const SignaturePill = ({
    label, name, date, rejected,
  }: {
    label: string; name: string; date?: number; rejected?: boolean;
  }) => (
    <div className={`flex items-center gap-3 rounded-lg p-3 border ${
      rejected ? "bg-destructive/10 border-destructive/30" : "bg-success/10 border-success/30"
    }`}>
      <div className={`shrink-0 ${rejected ? "text-destructive" : "text-success"}`}>
        {rejected ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className={`text-sm font-semibold italic ${rejected ? "text-destructive" : "text-success"}`}>
          {name}{rejected ? " (Rejected)" : ""}
        </p>
        {date && <p className="text-[11px] text-muted-foreground">{fmtDate(date)}</p>}
      </div>
    </div>
  );

  // Determine if comments should be shown (Registrar can write, others read-only on approved/rejected)
  const showComments = role === "Registrar" || (req.comments && req.comments.length > 0);
  const commentsReadOnly = role !== "Registrar";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold text-primary font-sans">
                {req.room}{" "}
                <span className="font-normal text-muted-foreground text-base">— {req.purpose || "Room Booking"}</span>
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">ID: {req.id}</p>
            </div>
            <StatusBadge status={req.status} />
          </div>
          <StepBar status={req.status} />
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-sans font-bold text-primary">Request Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailField label="Faculty / Staff" value={req.facultyName} />
            <DetailField label="Designation" value={req.designation} />
            <DetailField label="Phone" value={req.phone} />
            <DetailField label="Department" value={req.department} />
            <DetailField label="PA System" value={req.paSystem ? "Yes" : "No"} />
            <DetailField label="Total Strength" value={req.strength} />
          </div>
          <DetailField label="Purpose" value={req.purpose} />
          {req.refreshment && <DetailField label="Refreshments" value={req.refreshDetails || "Required"} />}
          <Separator />
          <div>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">Schedule</p>
            {req.dates.filter((d) => d.date).map((d, i) => (
              <div key={i} className="text-sm py-1.5 border-b border-border/50 text-foreground">
                {String.fromCharCode(97 + i)}.{" "}
                <strong>{d.date}</strong> &nbsp;{d.from || "—"} → {d.to || "—"}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Signature Trail */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-sans font-bold text-primary">Signature Trail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {req.facultySignature && (
            <SignaturePill label="Faculty Signature" name={req.facultySignature} date={req.facultySignedAt} />
          )}
          {req.hodSignature && (
            <SignaturePill label="HOD Signature" name={req.hodSignature} date={req.hodSignedAt} rejected={req.hodApproved === false} />
          )}
          {req.adminSignature && (
            <SignaturePill label="Admin Officer" name={`${req.adminSignature}${req.adminAvailability ? " — " + req.adminAvailability : ""}`} date={req.adminSignedAt} />
          )}
          {req.registrarSignature && (
            <SignaturePill label="Registrar" name={req.registrarSignature} date={req.registrarSignedAt} rejected={req.registrarApproved === false} />
          )}
          {!req.facultySignature && <p className="text-sm text-muted-foreground">No signatures yet.</p>}
          {req.adminRemarks && (
            <p className="text-xs text-muted-foreground">Admin remarks: {req.adminRemarks}</p>
          )}
        </CardContent>
      </Card>

      {/* Comments Thread */}
      {showComments && (
        <CommentThread
          comments={req.comments || []}
          authorName={userName}
          authorRole={role}
          onAdd={handleAddComment}
          readOnly={commentsReadOnly}
        />
      )}

      {/* Action areas */}
      {role === "Faculty (Requester)" && req.status === "pending_sign" && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-bold text-primary">Your Signature Required</CardTitle>
          </CardHeader>
          <CardContent>
            <SignatureBox
              id="fac-sig"
              placeholder="Type your full name"
              defaultValue={req.facultySignature}
              confirmLabel="Sign & Send to HOD"
              onConfirm={(sig) => {
                if (!sig.trim()) return alert("Please type your name to sign.");
                save({ facultySignature: sig, facultySignedAt: Date.now(), status: "pending_hod" });
              }}
            />
          </CardContent>
        </Card>
      )}

      {role === "HOD" && req.status === "pending_hod" && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-bold text-primary">HOD Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <SignatureBox
              id="hod-sig"
              placeholder="HOD full name"
              defaultValue={req.hodSignature}
              confirmLabel="Approve & Sign"
              onReject={() => {
                const sig = (document.getElementById("hod-sig") as HTMLInputElement)?.value?.trim();
                if (!sig) return alert("Please enter your name to sign.");
                save({ hodSignature: sig, hodApproved: false, hodSignedAt: Date.now(), status: "rejected" });
              }}
              onConfirm={(sig) => {
                if (!sig.trim()) return alert("Please enter your name to sign.");
                save({ hodSignature: sig, hodApproved: true, hodSignedAt: Date.now(), status: "pending_admin" });
              }}
            />
          </CardContent>
        </Card>
      )}

      {role === "Admin Officer" && req.status === "pending_admin" && <AdminAction req={req} onSave={save} />}

      {role === "Registrar" && req.status === "pending_registrar" && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-bold text-primary">Registrar / Dean of Students</CardTitle>
          </CardHeader>
          <CardContent>
            <SignatureBox
              id="reg-sig"
              placeholder="Registrar full name"
              defaultValue={req.registrarSignature}
              confirmLabel="Approve & Sign"
              onReject={() => {
                const sig = (document.getElementById("reg-sig") as HTMLInputElement)?.value?.trim();
                if (!sig) return alert("Please enter your name.");
                save({ registrarSignature: sig, registrarApproved: false, registrarSignedAt: Date.now(), status: "rejected" });
              }}
              onConfirm={(sig) => {
                if (!sig.trim()) return alert("Please enter your name.");
                save({ registrarSignature: sig, registrarApproved: true, registrarSignedAt: Date.now(), status: "approved" });
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button variant="outline" onClick={onPreview}>
          <FileText className="w-4 h-4 mr-1" /> View Official Form
        </Button>
        {role === "Faculty (Requester)" && req.status === "draft" && (
          <Button onClick={() => save({ status: "pending_sign" })}>
            <Send className="w-4 h-4 mr-1" /> Submit for Signature
          </Button>
        )}
        {role === "Faculty (Requester)" && (
          <Button variant="destructive" onClick={() => { if (confirm("Delete this request?")) onDelete(req.id); }}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        )}
      </div>
    </div>
  );
}
