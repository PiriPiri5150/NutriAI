
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Apple, Activity, Flame, Trophy, Plus, ChevronRight, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardPage() {
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
        <Card className="md:col-span-2">
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
            <Progress value={41} className="h-3" aria-label="Progresso de calorias diárias" />
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Proteína</div>
                <div className="font-semibold">82g / 150g</div>
                <Progress value={54} className="h-1 mt-1" aria-label="Progresso de proteína" />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Carbs</div>
                <div className="font-semibold">120g / 220g</div>
                <Progress value={54} className="h-1 mt-1" aria-label="Progresso de hidratos de carbono" />
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Gordura</div>
                <div className="font-semibold">35g / 70g</div>
                <Progress value={50} className="h-1 mt-1" aria-label="Progresso de gorduras" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-accent-foreground" aria-hidden="true" /> Insight da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              "Você está um pouco baixo em proteína hoje. Sugiro um snack de iogurte grego ou uma dose de whey para atingir a sua meta de recuperação muscular."
            </p>
            <Link href="/ai-coach">
              <Button variant="link" className="p-0 text-primary flex items-center gap-1 h-auto">
                Falar com NutriAI <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" aria-hidden="true" /> Streak Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-4">
            <div className="text-5xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground mt-1">Dias consecutivos</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Últimas Refeições</CardTitle>
            <Link href="/diary">
              <Button variant="ghost" size="sm">Ver tudo</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Almoço', desc: 'Frango Grelhado com Arroz e Salada', kcal: 540, time: '13:00' },
                { name: 'Pequeno-almoço', desc: 'Omelete de Claras com Espinafres', kcal: 320, time: '08:30' },
              ].map((meal, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Apple className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-base">{meal.name}</h2>
                      <p className="text-sm text-muted-foreground">{meal.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{meal.kcal} kcal</div>
                    <div className="text-xs text-muted-foreground">{meal.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Módulo Oncológico Especializado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl border bg-white shadow-sm">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Activity className="h-6 w-6 text-accent-foreground" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Análise de Performance</h2>
                <p className="text-sm text-muted-foreground">
                  Acompanhe métricas de VO2 max e carga de treino adaptada.
                </p>
                <Link href="/oncology">
                  <Button size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/80">
                    Aceder Módulo
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
