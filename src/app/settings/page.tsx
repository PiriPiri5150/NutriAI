
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Shield, Smartphone, Globe, UserX } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Definições</h1>
          <p className="text-muted-foreground">Faça a gestão da sua conta e preferências da aplicação.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Notificações</CardTitle>
            </div>
            <CardDescription>Escolha como deseja ser alertado sobre as suas metas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembretes de Refeição</Label>
                <p className="text-xs text-muted-foreground">Receba avisos quando estiver na hora de registar comida.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Macronutrientes</Label>
                <p className="text-xs text-muted-foreground">Aviso quando atingir ou estiver perto da meta de proteína.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Privacidade & Dados</CardTitle>
            </div>
            <CardDescription>Gerencie o acesso aos seus dados de saúde.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Partilhar com Equipa Médica</Label>
                <p className="text-xs text-muted-foreground">Permitir que especialistas visualizem o seu progresso oncológico.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Análise de IA Melhorada</Label>
                <p className="text-xs text-muted-foreground">Permitir que a IA utilize o seu histórico para sugestões mais precisas.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <UserX className="h-5 w-5" />
              <CardTitle className="text-lg">Zona de Perigo</CardTitle>
            </div>
            <CardDescription>Ações irreversíveis relacionadas com a sua conta.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm" className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border-destructive/20">
              Eliminar Todos os Dados do Firestore
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
