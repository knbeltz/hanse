"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteWidgetDialogProps {
  open: boolean;
  onClose: () => void;
  widgetId: Id<"widgets">;
  widgetName: string;
}

export function DeleteWidgetDialog({
  open,
  onClose,
  widgetId,
  widgetName,
}: DeleteWidgetDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteWidget = useMutation(api.widgets.deleteWidget);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteWidget({ widgetId });
      onClose();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent showCloseButton={false} className="rounded-none border border-ink max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-caslon text-base font-bold text-ink">
            Delete widget
          </DialogTitle>
          <DialogDescription className="text-sm text-hanse-muted">
            <span className="font-medium text-ink">&ldquo;{widgetName}&rdquo;</span> and all its
            research data will be permanently deleted. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-t border-ledger rounded-none">
          <DialogClose render={<Button variant="secondary" disabled={isDeleting} />}>
            Cancel
          </DialogClose>
          <Button variant="primary" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
