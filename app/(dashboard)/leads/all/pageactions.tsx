// crm-frontend-next\app\(dashboard)\leads\all\pageactions.tsx
"use client";

import type { LeadStatus } from "@/types";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadRecord {
  id: string;
  leadNumber: string;
  studentName?: string;
  mobileNumber?: string;
  emailId?: string;
  source?: string;
  branch?: string;
  preferredCountry?: string;
  assignedCounselor?: string;
  remarks?: string;
  nextFollowup?: string | null;
  status: LeadStatus;
  createdAt: string;
}

interface PageActionsProps {
  selected: LeadRecord | null;
  setSelected: React.Dispatch<React.SetStateAction<LeadRecord | null>>;

  editingLead: LeadRecord | null;
  setEditingLead: React.Dispatch<React.SetStateAction<LeadRecord | null>>;

  leadIdToDelete: string | null;
  setLeadIdToDelete: React.Dispatch<React.SetStateAction<string | null>>;

  handleUpdateLead: (e: React.FormEvent) => Promise<void>;
  executeDeleteLead: () => Promise<void>;

  branchOptions: string[];
  statusStyle: Record<LeadStatus, string>;
}

export default function PageActions(props: PageActionsProps) {
  const {
    selected,
    setSelected,
    editingLead,
    setEditingLead,
    leadIdToDelete,
    setLeadIdToDelete,
    handleUpdateLead,
    executeDeleteLead,
    branchOptions,
    statusStyle,
  } = props;

  return (
    <>
      {/* 1. DETAILED RECORD VIEW SHEET */}
      <Sheet
        open={!!selected}
        onOpenChange={(value) => !value && setSelected(null)}
      >
        <SheetContent className="w-full sm:max-w-md overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {selected && (
            <>
              <SheetHeader className="pb-4 border-b border-border">
                <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
                  {selected.studentName || "Unspecified Profile File"}
                </SheetTitle>
                <SheetDescription className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded border border-border/40 mt-1">
                  System UID: {selected.id} <br /> Lead Index Ref:{" "}
                  {selected.leadNumber}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 pt-6">
                <div className="grid gap-2">
                  <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground/90">
                    Contact Information
                  </div>
                  <div className="text-sm font-medium text-foreground bg-secondary/20 p-3 rounded-lg border border-border/40 space-y-1">
                    <div>Mobile: {selected.mobileNumber || "N/A"}</div>
                    <div className="text-muted-foreground text-xs truncate">
                      Email: {selected.emailId || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground/90">
                    Assignment & Funnel Attributes
                  </div>
                  <div className="text-sm space-y-2 bg-secondary/10 p-3 rounded-lg border border-border/30">
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-muted-foreground">
                        Branch Allocation:
                      </span>{" "}
                      <span className="font-medium text-foreground text-right">
                        {selected.branch || "Unassigned"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-muted-foreground">
                        Assigned Counselor:
                      </span>{" "}
                      <span className="font-medium text-foreground text-right">
                        {selected.assignedCounselor || "Unassigned"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-muted-foreground">
                        Target Destination:
                      </span>{" "}
                      <span className="font-medium text-foreground text-right">
                        {selected.preferredCountry || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-muted-foreground">
                        Source Stream:
                      </span>{" "}
                      <span className="font-medium text-foreground text-right">
                        {selected.source || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground/90">
                    Pipeline Funnel Status
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className={`capitalize font-semibold text-sm px-3 py-1 ${statusStyle[selected.status]}`}
                    >
                      {selected.status}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-3">
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground/90 mb-1">
                      Internal System Logs
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Lead created into index matrix on{" "}
                      <span className="font-medium text-foreground">
                        {new Date(selected.createdAt).toLocaleDateString()}
                      </span>
                      . Next operational followup target callback response is
                      scheduled for:{" "}
                      <span className="font-semibold text-foreground">
                        {selected.nextFollowup
                          ? new Date(selected.nextFollowup).toLocaleDateString()
                          : "TBD"}
                      </span>
                      .
                    </p>
                  </div>
                  {selected.remarks && (
                    <div className="text-xs text-foreground bg-background p-2.5 rounded border border-border shadow-sm">
                      <span className="font-bold text-muted-foreground block text-[10px] uppercase tracking-wider mb-1">
                        Latest Management Remarks:
                      </span>
                      <p className="whitespace-pre-wrap leading-normal text-muted-foreground">
                        {selected.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* 2. RECORD MODIFICATION ACTIONSHEET FORM */}
      <Sheet
        open={!!editingLead}
        onOpenChange={(value) => !value && setEditingLead(null)}
      >
        <SheetContent className="w-full sm:max-w-md overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {editingLead && (
            <form
              onSubmit={handleUpdateLead}
              className="h-full flex flex-col justify-between"
            >
              <div className="space-y-5">
                <SheetHeader className="pb-4 border-b border-border">
                  <SheetTitle className="text-lg font-bold">
                    Modify Lead Parameters
                  </SheetTitle>
                  <SheetDescription>
                    Synchronize profile record variables for Identification
                    Number:{" "}
                    <span className="font-mono text-foreground font-semibold">
                      {editingLead.leadNumber}
                    </span>
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="edit-name" className="text-sm font-medium">
                      Student Name
                    </Label>
                    <Input
                      id="edit-name"
                      className="bg-background"
                      value={editingLead.studentName || ""}
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          studentName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="edit-mobile"
                        className="text-sm font-medium"
                      >
                        Mobile Number
                      </Label>
                      <Input
                        id="edit-mobile"
                        className="bg-background"
                        value={editingLead.mobileNumber || ""}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            mobileNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="edit-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="edit-email"
                        type="email"
                        className="bg-background"
                        value={editingLead.emailId || ""}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            emailId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label className="text-sm font-medium">
                      Pipeline Status
                    </Label>
                    <Select
                      value={editingLead.status}
                      onValueChange={(val) =>
                        setEditingLead({
                          ...editingLead,
                          status: val as LeadStatus,
                        })
                      }
                    >
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label className="text-sm font-medium">
                      Assigned Branch
                    </Label>
                    <Select
                      value={editingLead.branch || "all"}
                      onValueChange={(val) =>
                        setEditingLead({
                          ...editingLead,
                          branch: val === "all" ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select Branch Allocation" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchOptions.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="edit-counselor"
                      className="text-sm font-medium"
                    >
                      Assigned Counselor
                    </Label>
                    <Input
                      id="edit-counselor"
                      className="bg-background"
                      value={editingLead.assignedCounselor || ""}
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          assignedCounselor: e.target.value,
                        })
                      }
                      placeholder="Counselor Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="edit-country"
                        className="text-sm font-medium"
                      >
                        Preferred Country
                      </Label>
                      <Input
                        id="edit-country"
                        className="bg-background"
                        value={editingLead.preferredCountry || ""}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            preferredCountry: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="edit-source"
                        className="text-sm font-medium"
                      >
                        Lead Source
                      </Label>
                      <Input
                        id="edit-source"
                        className="bg-background"
                        value={editingLead.source || ""}
                        onChange={(e) =>
                          setEditingLead({
                            ...editingLead,
                            source: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="edit-followup"
                      className="text-sm font-medium"
                    >
                      Next Followup Date
                    </Label>
                    <Input
                      id="edit-followup"
                      type="date"
                      className="bg-background"
                      value={
                        editingLead.nextFollowup
                          ? editingLead.nextFollowup.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          nextFollowup: e.target.value || null,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="edit-remarks"
                      className="text-sm font-medium"
                    >
                      Management Remarks
                    </Label>
                    <Input
                      id="edit-remarks"
                      className="bg-background"
                      value={editingLead.remarks || ""}
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          remarks: e.target.value,
                        })
                      }
                      placeholder="Add tracking updates..."
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-6 pt-4 border-t border-border flex flex-row items-center justify-end gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingLead(null)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  Save Updates
                </Button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>

      {/* 3. HARD CONFIRMATION DELETION ALTER_DIALOG */}
      <AlertDialog
        open={!!leadIdToDelete}
        onOpenChange={(value) => !value && setLeadIdToDelete(null)}
      >
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Are you absolutely certain?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground leading-normal">
              This action cannot be undone. This will permanently detach the
              selected client file from your CRM live table data index matrices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-2">
            <AlertDialogCancel className="mt-0 w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDeleteLead}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
