import React from 'react'
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
import { HouseIcon, PersonStanding, PersonStandingIcon } from 'lucide-react';
import { store } from '@/lib/store/store';

export default function Sidebar() {
  const employees = store.getState().employee.employee?.data
  return (
    <Command className="bg-card">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions"> 
          <Link href="/">
            <CommandItem className="flex justify-between">
              Home
              <HouseIcon />
            </CommandItem>
          </Link>
          
          <Link href="/employee">
            <CommandItem className="flex justify-between">
              Employees
              <PersonStandingIcon />
              
            </CommandItem>
          </Link>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

