import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SignatureBoxProps {
  id: string;
  placeholder: string;
  defaultValue?: string;
  onConfirm: (val: string) => void;
  confirmLabel?: string;
  confirmVariant?: "default" | "destructive";
  onReject?: () => void;
  rejectLabel?: string;
  extraFields?: React.ReactNode;
}

export function SignatureBox({
  id,
  placeholder,
  defaultValue = "",
  onConfirm,
  confirmLabel = "Sign & Submit",
  onReject,
  rejectLabel = "Reject",
  extraFields,
}: SignatureBoxProps) {
  const [val, setVal] = useState(defaultValue);

  return (
    <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg p-6 text-center">
      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">
        Type your full name to digitally sign
      </p>
      {extraFields}
      <input
        id={id}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="block w-full max-w-xs mx-auto mb-4 text-center italic text-lg border-0 border-b-2 border-primary bg-transparent text-primary outline-none font-semibold placeholder:text-muted-foreground/50 placeholder:not-italic placeholder:text-sm placeholder:font-normal"
      />
      <div className="flex items-center justify-center gap-3">
        <Button onClick={() => onConfirm(val)} size="sm">
          {confirmLabel}
        </Button>
        {onReject && (
          <Button onClick={onReject} variant="destructive" size="sm">
            {rejectLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
