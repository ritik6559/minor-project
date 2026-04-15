import { useState } from "react";
import { Comment } from "@/types/booking";
import { fmtDate } from "@/lib/booking-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

interface CommentThreadProps {
  comments: Comment[];
  authorName: string;
  authorRole: Comment["role"];
  onAdd: (comment: Comment) => void;
  readOnly?: boolean;
}

export function CommentThread({ comments, authorName, authorRole, onAdd, readOnly = false }: CommentThreadProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd({
      id: "CMT" + Date.now(),
      author: authorName,
      role: authorRole,
      text: text.trim(),
      timestamp: Date.now(),
    });
    setText("");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-sans font-bold text-primary flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Comments
          {comments.length > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
              {comments.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="border border-border rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{c.author}</span>
                <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                  {c.role}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">{fmtDate(c.timestamp)}</span>
            </div>
            <p className="text-sm text-foreground">{c.text}</p>
          </div>
        ))}

        {!readOnly && (
          <div className="flex gap-2 pt-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment…"
              className="min-h-15 flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
              }}
            />
            <Button onClick={handleSubmit} size="icon" className="self-end h-10 w-10" disabled={!text.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
