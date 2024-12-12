import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FaUsers } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { IoIosLogOut } from 'react-icons/io';
import { decodeToken } from '@/lib/token';
import { DecodedToken } from '@/modules/token';
import { Role } from '@/modules/employee';

const adminNavItems = [
  {
    title: 'Employee',
    url: `/employees`,
    icon: FaUsers,
  },
  {
    title: 'Report',
    url: `/reports`,
    icon: HiOutlineDocumentReport,
  },
];

const employeeNavItems = [
  {
    title: 'Employee',
    url: `/employees`,
    icon: FaUsers,
  },
];

export default function Navbar() {

  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  const decodedToken = decodeToken(sessionStorage.getItem('token')!) as DecodedToken;
  const navItems = decodedToken?.role === Role.Admin ? adminNavItems : employeeNavItems;
  return (
    <Sidebar className="bg-black">
      <SidebarContent className="py-4 bg-black">
        <SidebarGroup className="text-white">
          <SidebarGroupLabel className="text-2xl text-white">
            HR Information System
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-[4rem]">
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-lg">
                    <NavLink to={item.url}>
                      <item.icon />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-black'>
        <Button size={`sm`} variant={`ghost`} className="bg-none text-white" onClick={logout}>
          <IoIosLogOut />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
