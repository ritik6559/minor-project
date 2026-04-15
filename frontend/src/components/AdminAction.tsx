import { BookingRequest } from "@/types/booking";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminActionProps {
  req: BookingRequest;
  onSave: (patch: Partial<BookingRequest>) => void;
}

export function AdminAction({ req, onSave }: AdminActionProps) {
  const [avail, setAvail] = useState(req.adminAvailability || "Available");
  const [remarks, setRemarks] = useState(req.adminRemarks || "");
  const [sig, setSig] = useState(req.adminSignature || "");

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="text-base font-sans font-bold text-primary">Administrative Officer Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Availability</Label>
          <Select value={avail} onValueChange={setAvail}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Not Available">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Remarks</Label>
          <Textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add remarks…"
            className="min-h-15"
          />
        </div>

        <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg p-6 text-center">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">
            Type your full name to digitally sign
          </p>
          <Input
            value={sig}
            onChange={(e) => setSig(e.target.value)}
            placeholder="Admin Officer name"
            className="max-w-xs mx-auto text-center italic text-lg border-0 border-b-2 border-primary bg-transparent text-primary mb-4"
          />
          <Button
            onClick={() => {
              if (!sig.trim()) return alert("Please enter your name to sign.");
              onSave({
                adminSignature: sig,
                adminAvailability: avail,
                adminRemarks: remarks,
                adminSignedAt: Date.now(),
                status: "pending_registrar",
              });
            }}
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            Sign & Forward to Registrar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
