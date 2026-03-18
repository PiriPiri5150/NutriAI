'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Apple, 
  Activity, 
  Flame, 
  Trophy, 
  Plus, 
  ChevronRight, 
  BrainCircuit, 
  CheckCircle2, 
  ExternalLink,
  Info,
  Smartphone,
  Unlink
} from 'lucide-react';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [isXiaomiConnected, setIsXiaomiConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectGoogleFit = () => {
    setIsConnecting(true);
    // Simulação de fluxo OAuth com Google Fit
    setTimeout(() => {
      setIsConnecting(false);
      setIsXiaomiConnected(true);
      toast({
        title: "Conexão Estabelecida",
        description: "Os teus dados da Xiaomi Mi Fit serão agora sincronizados via Google Fit.",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsXiaomiConnected(false);
    toast({
      title: "Dispositivo Desligado",
      description: "A sincronização com a Xiaomi Mi Fitness foi interrompida.",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SidebarTrigger aria-label="Abrir menu lateral" />
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Bom dia, Utilizador!</h1>
            <p className="text-muted-foreground">Aqui está o seu resumo de hoje.</p>
          </div>
        </div>
        <Link href="/diary">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" /> Adicionar Refeição
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2 shadow-sm border-muted/40">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" /> Calorias Restantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-4xl font-bold text-primary">1,240</span>
                <span className="text-muted-foreground ml-2">kcal</span>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                Meta: 2,100 kcal
              </div>
            </div>
            <Progress 
              value={41} 
              className="h-3" 
              aria-label="Progresso de calorias totais: 41% consumido de 2100 kcal" 
            />
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <h2 className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Proteína</h2>
                <div className="font-semibold text-sm sm:text-base">82g / 150g</div>
                <Progress 
                  value={54} 
                  className="h-1.5 mt-2" 
                  aria-label="Progresso de proteína: 54% da meta de 150g" 
                />
              </div>
              <div className="text-center">
                <h2 className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Carbs</h2>
                <div className="font-semibold text-sm sm:text-base">120g / 220g</div>
                <Progress 
                  value={54} 
                  className="h-1.5 mt-2" 
                  aria-label="Progresso de hidratos de carbono: 54% da meta de 220g" 
                />
              </div>
              <div className="text-center">
                <h2 className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Gordura</h2>
                <div className="font-semibold text-sm sm:text-base">35g / 70g</div>
                <Progress 
                  value={50} 
                  className="h-1.5 mt-2" 
                  aria-label="Progresso de gordura: 50% da meta de 70g" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/5 border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-accent-foreground" aria-hidden="true" /> Insight da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              "Você está um pouco baixo em proteína hoje. Sugiro um snack de iogurte grego ou uma dose de whey para atingir a sua meta de recuperação muscular."
            </p>
            <Link href="/ai-coach">
              <Button variant="link" className="p-0 text-primary font-bold flex items-center gap-1 h-auto hover:no-underline" aria-label="Falar com o NutriAI Coach">
                Falar com NutriAI <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-muted/40">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" aria-hidden="true" /> Streak Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-4">
            <div className="text-5xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground mt-2 font-medium">Dias consecutivos</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-muted/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Últimas Refeições</CardTitle>
            <Link href="/diary">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">Ver tudo</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Almoço', desc: 'Frango Grelhado com Arroz e Salada', kcal: 540, time: '13:00' },
                { name: 'Pequeno-almoço', desc: 'Omelete de Claras com Espinafres', kcal: 320, time: '08:30' },
              ].map((meal, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors border border-transparent hover:border-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Apple className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{meal.kcal} kcal</div>
                    <div className="text-xs text-muted-foreground font-medium">{meal.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-muted/40">
          <CardHeader>
            <CardTitle className="text-xl">Módulo Oncológico Especializado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Activity className="h-6 w-6 text-accent-foreground" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Análise de Performance</h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Acompanhe métricas de VO2 max e carga de treino adaptada à sua fase de tratamento.
                </p>
                <Link href="/oncology">
                  <Button size="sm" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                    Aceder Módulo
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="health-connections-title">
        <h2 id="health-connections-title" className="text-2xl font-bold font-headline text-primary mb-6">Conexões de Saúde</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`shadow-sm transition-all border-2 ${isXiaomiConnected ? 'border-green-500/20 bg-green-50/10' : 'border-muted/40'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Smartphone className="h-5 w-5 text-orange-500" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold">Xiaomi Mi Fitness</CardTitle>
                </div>
                {isXiaomiConnected && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Ligado" />
                )}
              </div>
              <CardDescription className="mt-2 text-xs font-medium uppercase tracking-wider">
                Via Google Fit Bridge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Sincronize automaticamente passos, sono e calorias através da ponte segura com o Google Fit.
              </p>
              
              {!isXiaomiConnected ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full gap-2 font-bold shadow-md hover:shadow-lg transition-shadow">
                      <Plus className="h-4 w-4" /> Conectar Dispositivo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ligar Xiaomi Mi Fitness</DialogTitle>
                      <DialogDescription>
                        A NutriAI utiliza o Google Fit como ponte para ler os dados da sua Xiaomi Mi Band ou relógio.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                      <div className="p-4 rounded-xl bg-muted/30 border space-y-4">
                        <div className="flex gap-4 items-start">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 font-bold">1</div>
                          <div>
                            <p className="font-bold text-sm">Configurar Mi Fitness</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Na app Xiaomi, vá a Perfil &gt; Apps ligadas e ligue o Google Fit.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 font-bold">2</div>
                          <div>
                            <p className="font-bold text-sm">Autorizar NutriAI</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Clique no botão abaixo para ligar a sua conta Google.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs">
                        <Info className="h-4 w-4 shrink-0" />
                        <p>Isto garante que os seus passos apareçam automaticamente no diário.</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleConnectGoogleFit} 
                        disabled={isConnecting}
                        className="w-full gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-bold"
                        aria-label="Autorizar conexão via Google Fit"
                      >
                        {isConnecting ? (
                          <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        Autorizar com Google
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-green-700 font-bold">
                      <CheckCircle2 className="h-4 w-4" /> Ativo e a Sincronizar
                    </div>
                    <span className="text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded uppercase font-bold">Online</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2 text-destructive hover:bg-destructive/10 border-destructive/20"
                    onClick={handleDisconnect}
                    aria-label="Desligar Xiaomi Mi Fitness"
                  >
                    <Unlink className="h-3.5 w-3.5" /> Desligar Dispositivo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
