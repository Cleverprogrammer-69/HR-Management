import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { logoutUser } from '@/lib/store/features/user/authSlice';
import { toggleSideBar } from '@/lib/store/features/clientFeatures/clientSlice';
import { Menu } from 'lucide-react';
import {ArrowLeftFromLine, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user }= useAppSelector(state => state.auth)
  const { sideBarOpen } = useAppSelector(state => state.client)
  const handleToggleSideBar = () => {
    dispatch(toggleSideBar());
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login')
  }
  return (
    <nav className="bg-card dark:bg-background py-2 px-3 flex justify-between items-center">
      <button className="text-foreground" onClick={handleToggleSideBar}>
        {sideBarOpen ? (
          <ArrowLeftFromLine className="text-destructive" />
        ) : (
          <Menu />
        )}
      </button>
      <Link href={'/'}>
        <span className="text-xl font-extrabold text-foreground">
          Human Hub
        </span>
      </Link>

      <div className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive font-extrabold text-md' onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 text-destructive" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}