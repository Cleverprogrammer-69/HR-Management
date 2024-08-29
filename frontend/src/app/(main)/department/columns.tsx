'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch } from '@/lib/store/store';
import { deleteOneDepartment } from '@/lib/store/features/department/departmentSlice';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export type Department_data = {
  id: number;
  name: string;
  abbrevation: string;
  hod: string;
};

const DepartmentActionsCell: React.FC<{ department: Department_data }> = ({
  department,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleDelete = async (departmentId: string | string[]) => {
    try {
      const deletedDepartment = await dispatch(
        deleteOneDepartment(departmentId)
      );
      toast({
        title: 'Deleted successfuly',
        variant: 'default',
        duration: 2000,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Deletion Failed',
        variant: 'destructive',
        description: error as string,
        action: (
          <ToastAction
            altText={'Refresh'}
            onClick={() => handleDelete(departmentId)}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div className="text-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:outline-none">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(String(department.id))}
          >
            Copy department Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/department/${department.id}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDialogOpen}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete(String(department.id));
                  handleDialogClose();
                }}
              >
                Confirm
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns: ColumnDef<Department_data>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Id
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'abbrevation',
    header: 'Abbrevation',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'hod',
    header: 'Head of department',
  },

  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <DepartmentActionsCell department={row.original} />,
  },
];
