import { useState } from "react";
import { BookingRequest, DateSlot, ROOMS } from "@/types/booking";
import { newForm } from "@/lib/booking-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, X } from "lucide-react";

interface NewRequestFormProps {
  onSubmit: (req: BookingRequest) => void;
  onCancel: () => void;
}

export function NewRequestForm({ onSubmit, onCancel }: NewRequestFormProps) {
  const [form, setForm] = useState(newForm);
  const [error, setError] = useState("");

  const update = <K extends keyof BookingRequest>(key: K, val: BookingRequest[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const updateDate = (i: number, key: keyof DateSlot, val: string) =>
    setForm((f) => {
      const dates = [...f.dates];
      dates[i] = { ...dates[i], [key]: val };
      return { ...f, dates };
    });

  const addDate = () => {
    if (form.dates.length < 7) setForm((f) => ({ ...f, dates: [...f.dates, { date: "", from: "", to: "" }] }));
  };

  const removeDate = (i: number) => setForm((f) => ({ ...f, dates: f.dates.filter((_, idx) => idx !== i) }));

  const handleSubmit = () => {
    if (!form.facultyName || !form.designation || !form.phone || !form.department || !form.purpose) {
      setError("Please fill in all required fields (Name, Designation, Phone, Department, Purpose).");
      return;
    }
    const req: BookingRequest = {
      ...form,
      id: "REQ" + Date.now(),
      status: "pending_sign",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    onSubmit(req);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-primary">New Room Booking Request</h1>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Venue */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground">
            Select Venue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ROOMS.map((r) => (
              <Button
                key={r}
                variant={form.room === r ? "default" : "outline"}
                size="sm"
                onClick={() => update("room", r)}
                className="font-semibold"
              >
                {r}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requester Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground">
            Requester Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name <span className="text-destructive">*</span></Label>
              <Input placeholder="Full name" value={form.facultyName} onChange={(e) => update("facultyName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Designation <span className="text-destructive">*</span></Label>
              <Input placeholder="e.g. Assistant Professor" value={form.designation} onChange={(e) => update("designation", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone <span className="text-destructive">*</span></Label>
              <Input placeholder="Mobile number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Department <span className="text-destructive">*</span></Label>
              <Input placeholder="e.g. CSE" value={form.department} onChange={(e) => update("department", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground">
            Schedule (up to 7 dates)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.dates.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground w-5">
                {String.fromCharCode(97 + i)}.
              </span>
              <Input type="date" value={d.date} onChange={(e) => updateDate(i, "date", e.target.value)} className="flex-1" />
              <Input type="time" value={d.from} onChange={(e) => updateDate(i, "from", e.target.value)} className="w-28" />
              <Input type="time" value={d.to} onChange={(e) => updateDate(i, "to", e.target.value)} className="w-28" />
              {i > 0 ? (
                <Button variant="ghost" size="icon" onClick={() => removeDate(i)} className="text-muted-foreground hover:text-destructive h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              ) : (
                <div className="w-8" />
              )}
            </div>
          ))}
          {form.dates.length < 7 && (
            <Button variant="outline" size="sm" onClick={addDate} className="mt-2">
              <Plus className="w-3 h-3 mr-1" /> Add Date
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-sans font-bold uppercase tracking-wider text-muted-foreground">
            Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Refreshment Required?</Label>
              <RadioGroup
                value={form.refreshment ? "yes" : "no"}
                onValueChange={(v) => update("refreshment", v === "yes")}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="ref-yes" />
                  <Label htmlFor="ref-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="ref-no" />
                  <Label htmlFor="ref-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              {form.refreshment && (
                <Input
                  placeholder="Specify refreshment details"
                  value={form.refreshDetails}
                  onChange={(e) => update("refreshDetails", e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>PA System Required?</Label>
              <RadioGroup
                value={form.paSystem ? "yes" : "no"}
                onValueChange={(v) => update("paSystem", v === "yes")}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="pa-yes" />
                  <Label htmlFor="pa-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="pa-no" />
                  <Label htmlFor="pa-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Total Strength (Approx)</Label>
              <Input type="number" placeholder="No. of participants" value={form.strength} onChange={(e) => update("strength", e.target.value)} />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Purpose <span className="text-destructive">*</span></Label>
              <Textarea
                placeholder="Describe the purpose of this booking…"
                value={form.purpose}
                onChange={(e) => update("purpose", e.target.value)}
                className="min-h-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSubmit}>Submit Request</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
