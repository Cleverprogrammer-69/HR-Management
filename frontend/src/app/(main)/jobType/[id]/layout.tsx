'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function JobTypeDetailsLayout({ children } : { children: React.ReactNode}) {
  const router = useRouter();

  const closeDialog = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={closeDialog}>
      <DialogContent className={'bg-card max-h-screen overflow-y-auto'}>
        <DialogTitle className="hidden">New JobType</DialogTitle>
        <DialogDescription className="hidden">
          Form to register new JobType.
        </DialogDescription>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Details of jobtype</h2>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
