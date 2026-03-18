'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { 
  User, 
  Settings, 
  LayoutDashboard, 
  Apple, 
  Activity, 
  BrainCircuit,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function AppSidebar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <Sidebar className="border-r shadow-sm">
      <SidebarHeader className="p-6 border-b bg-white">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary group-hover:bg-primary/90 transition-colors">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-primary font-headline tracking-tight">NutriAI</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-2">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {[
                { label: 'Painel Principal', href: '/dashboard', icon: LayoutDashboard },
                { label: 'Diário Alimentar', href: '/diary', icon: Apple },
                { label: 'Módulo Oncológico', href: '/oncology', icon: Activity },
                { label: 'Coach IA', href: '/ai-coach', icon: BrainCircuit },
              ].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label} className="h-10 px-3">
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-2">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Perfil" className="h-10 px-3">
                  <Link href="/profile" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span className="font-medium">O Meu Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Definições" className="h-10 px-3">
                  <Link href="/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span className="font-medium">Definições</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-slate-50/50">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white border shadow-sm">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-slate-700">{user.email}</p>
                <div className="flex items-center gap-1">
                   <ShieldCheck className="h-3 w-3 text-accent-foreground" />
                   <span className="text-[10px] text-accent-foreground font-bold uppercase">Membro Pro</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 text-xs font-semibold text-destructive hover:bg-destructive/5 py-2 px-3 rounded-md transition-colors w-full border border-transparent hover:border-destructive/20"
            >
              <LogOut className="h-3 w-3" />
              <span>Sair da Conta</span>
            </button>
          </div>
        ) : (
          <Link href="/login" className="w-full">
            <SidebarMenuButton className="w-full justify-center bg-primary text-white hover:bg-primary/90 h-10 shadow-md">
              Iniciar Sessão
            </SidebarMenuButton>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
