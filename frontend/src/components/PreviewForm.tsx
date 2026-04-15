import { BookingRequest, ROOMS } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PreviewFormProps {
  req: BookingRequest;
  onBack: () => void;
}

const tdStyle = "border border-foreground/80 p-1.5 align-top text-[11px]";

export function PreviewForm({ req, onBack }: PreviewFormProps) {
  const letters = "abcdefg".split("");

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Detail
        </Button>
      </div>

      <div className="bg-card border border-border p-7 font-serif text-[11px] text-foreground print:border-0 print:shadow-none">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="text-center font-bold text-sm mb-1">
              Jaypee University of Information Technology, Waknaghat Solan H.P
            </div>
            <div className="text-center text-xs mb-3">
              REQUISTION FORM FOR BOOKING OF THE FOLLOWING (Pl tick)
            </div>
            <div className="flex justify-center gap-5 mb-3">
              {ROOMS.map((r) => (
                <div key={r} className="flex items-center gap-1.5 font-bold text-xs">
                  <div
                    className={`w-3.5 h-3.5 border-2 border-foreground shrink-0 ${
                      req.room === r ? "bg-foreground" : ""
                    }`}
                  />
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div className="w-14 h-14 border border-border flex items-center justify-center text-[9px] text-center text-muted-foreground ml-4 shrink-0">
            JUIT
            <br />
            Logo
          </div>
        </div>

        <table className="w-full border-collapse text-[11px]">
          <tbody>
            <tr>
              <td className={tdStyle}><strong>1</strong></td>
              <td colSpan={3} className={tdStyle}>
                <strong>NAME OF FACULTY/STAFF & DESIGNATION</strong>
                <br />
                <em>(Will not be booked in the name of student)</em>
              </td>
              <td colSpan={2} className={tdStyle}>
                {req.facultyName} &nbsp;&nbsp; {req.designation}
              </td>
            </tr>
            <tr>
              <td className={tdStyle}>2</td>
              <td colSpan={3} className={tdStyle}>Telephone/Mobile no:</td>
              <td colSpan={2} className={tdStyle}>{req.phone}</td>
            </tr>
            <tr>
              <td className={tdStyle}>3</td>
              <td colSpan={3} className={tdStyle}>Department</td>
              <td colSpan={2} className={tdStyle}>{req.department}</td>
            </tr>
            <tr>
              <td className={`${tdStyle} font-bold`}>4</td>
              <td className={`${tdStyle} font-bold bg-muted`}>DATE</td>
              <td colSpan={2} className={`${tdStyle} font-bold bg-muted`}>TIME FROM</td>
              <td colSpan={2} className={`${tdStyle} font-bold bg-muted`}>TIME TO</td>
            </tr>
            {letters.map((l, i) => {
              const d = req.dates[i] ?? { date: "", from: "", to: "" };
              return (
                <tr key={l}>
                  <td className={tdStyle}>{l}.</td>
                  <td className={tdStyle}>Date: {d.date}</td>
                  <td colSpan={2} className={tdStyle}>{d.from}</td>
                  <td colSpan={2} className={tdStyle}>{d.to}</td>
                </tr>
              );
            })}
            <tr>
              <td className={tdStyle}>5</td>
              <td colSpan={2} className={tdStyle}>Refreshment Required (Cafeteria/Tuck-shop)</td>
              <td className={tdStyle}>Yes <strong>{req.refreshment ? "☑" : "☐"}</strong></td>
              <td className={tdStyle}>No <strong>{!req.refreshment ? "☑" : "☐"}</strong></td>
              <td className={tdStyle}>Details: {req.refreshDetails}</td>
            </tr>
            <tr>
              <td className={tdStyle}>6</td>
              <td colSpan={3} className={tdStyle}>PA System Required</td>
              <td className={tdStyle}>Yes <strong>{req.paSystem ? "☑" : "☐"}</strong></td>
              <td className={tdStyle}>No <strong>{!req.paSystem ? "☑" : "☐"}</strong></td>
            </tr>
            <tr>
              <td className={tdStyle}>7</td>
              <td colSpan={3} className={tdStyle}>Total Strength (Approx)</td>
              <td colSpan={2} className={tdStyle}>{req.strength}</td>
            </tr>
            <tr>
              <td className={tdStyle}>8</td>
              <td colSpan={2} className={tdStyle}>Purpose:</td>
              <td colSpan={3} className={tdStyle}>{req.purpose}</td>
            </tr>
            <tr>
              <td className={tdStyle}>9</td>
              <td colSpan={2} className={tdStyle}>Remarks of Administrative Officer</td>
              <td colSpan={3} className={tdStyle}>
                Available/Not Available: {req.adminAvailability || "___________"} &nbsp;&nbsp; {req.adminRemarks}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-5 mt-6">
          {[
            { label: "Signature of the Requisitioner", value: req.facultySignature },
            { label: "Approved / Not Approved — Signature of HOD", value: req.hodApproved === false ? "NOT APPROVED" : req.hodSignature },
            { label: "Registrar & Dean of Student", value: req.registrarSignature },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="border-b border-foreground h-7 mb-1 flex items-end justify-center italic text-xs font-semibold">
                {value}
              </div>
              <div className="text-[9px]">{label}</div>
            </div>
          ))}
        </div>

        {/* Office Use */}
        <div className="border-t-2 border-foreground mt-5 pt-2">
          <strong className="text-[10px]">FOR OFFICE USE ONLY</strong>
          <div className="mt-2 text-[10px]">
            Request received on _____________________ Time _____________________________________
          </div>
          <div className="mt-3 text-[10px]">
            <strong>Signature of Administrative Officer:</strong> {req.adminSignature || "_____________________"}
          </div>
          <div className="mt-3 text-[10px]">
            <strong>Responsibilities / Distribution</strong>
          </div>
          <ol className="text-[10px] ml-4 mt-1 leading-relaxed list-decimal">
            <li>JE Electrical: To instruct the operator for function of PA system and lights.</li>
            <li>Security Guard for opening / Closing as per order date and time.</li>
            <li>Head House Keeping for Proper Layout/cleanliness of Auditorium all the time</li>
            <li>Concerned department.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
