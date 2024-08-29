import React from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import Link from 'next/link';
import {
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
  BuildingIcon,
  BriefcaseIcon,
  GlobeIcon,
  Plus,
  FilePen
} from 'lucide-react';
import { store } from '@/lib/store/store';

export default function Sidebar() {
  const employees = store.getState().employee.employee?.data;
  return (
    <Command className="bg-card">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="min-h-[85vh] overflow-y-auto">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <Link href="/">
            <CommandItem className="flex justify-between">
              Home
              <HomeIcon />
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Employee">
          <Link href="/employee">
            <CommandItem className="flex justify-between">
              Employees
              <UsersIcon />
            </CommandItem>
          </Link>
          <Link href="/employee/new">
            <CommandItem className="flex justify-between">
              New employee
              <div className="flex items-center space-x-0">
                <UserPlusIcon />
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Department">
          <Link href="/department">
            <CommandItem className="flex justify-between">
              Departments
              <BuildingIcon />
            </CommandItem>
          </Link>
          <Link href="/department/new">
            <CommandItem className="flex justify-between">
              New department
              <div className="flex items-center space-x-0">
                <BuildingIcon />
                <Plus size={10} />
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Designation">
          <Link href="/designation">
            <CommandItem className="flex justify-between">
              Designations
              <BriefcaseIcon />
            </CommandItem>
          </Link>
          <Link href="/designation/new">
            <CommandItem className="flex justify-between">
              New designation
              <div className="flex items-center space-x-0">
                <BriefcaseIcon />
                <Plus size={10} />
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Job type">
          <Link href="/jobType">
            <CommandItem className="flex justify-between">
              Job types
              <GlobeIcon />
            </CommandItem>
          </Link>
          <Link href="/jobType/new">
            <CommandItem className="flex justify-between">
              New job type
              <div className="flex items-center space-x-0">
                <GlobeIcon />
                <Plus size={10} />
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Job nature">
          <Link href="/jobNature">
            <CommandItem className="flex justify-between">
              Job natures
              <FilePen />
            </CommandItem>
          </Link>
          <Link href="/jobNature/new">
            <CommandItem className="flex justify-between">
              New job nature
              <div className="flex items-center space-x-0">
                <FilePen />
                <Plus size={10} />
              </div>
            </CommandItem>
          </Link>
        </CommandGroup>

        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
