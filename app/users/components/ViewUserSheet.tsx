"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { User } from "../types/user";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export default function ViewUserSheet({ open, onOpenChange, user }: Props) {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p>{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Branch</p>

            <p>{user.branch?.name ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Roles</p>

            <p>{user?.role?.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created</p>

            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
