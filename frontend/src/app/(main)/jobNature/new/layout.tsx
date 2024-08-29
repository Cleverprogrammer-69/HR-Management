"use client"
import { Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";

export default function NewPostLayout({ children }:{children: React.ReactNode}) {
  const router = useRouter();

  const closeDialog = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={closeDialog}>
      <DialogContent
        className={'bg-card max-h-screen overflow-y-auto'}
      >
        <DialogTitle className="hidden">New JobNature</DialogTitle>
        <DialogDescription className="hidden">
          Form to register new JobNature.
        </DialogDescription>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create a new jobnature</h2>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
