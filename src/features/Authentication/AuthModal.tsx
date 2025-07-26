import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Register from "./Register";
import { useState } from "react";

export function AuthModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit px-8">
        {<Register setOpen={setOpen}></Register>}
      </DialogContent>
    </Dialog>
  );
}
