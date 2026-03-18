
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Apple, Plus, Search, ScanLine, Coffee, Utensils, Moon, Carrot } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SidebarTrigger } from '@/components/ui/sidebar';

const meals = [
  { 
    id: 1, 
    name: 'Pequeno-almoço', 
    icon: Coffee, 
    items: [
      { name: 'Ovos mexidos (3)', kcal: 210, p: 18, c: 2, f: 15 },
      { name: 'Pão integral (1 fatia)', kcal: 80, p: 3, c: 15, f: 1 },
    ],
    totalKcal: 290
  },
  { 
    id: 2, 
    name: 'Almoço', 
    icon: Utensils, 
    items: [
      { name: 'Peito de Frango (150g)', kcal: 240, p: 46, c: 0, f: 5 },
      { name: 'Arroz Integral (100g)', kcal: 110, p: 2, c: 23, f: 1 },
      { name: 'Salada Mista', kcal: 50, p: 1, c: 5, f: 2 },
    ],
    totalKcal: 400
  },
  { 
    id: 3, 
    name: 'Jantar', 
    icon: Moon, 
    items: [],
    totalKcal: 0
  },
  { 
    id: 4, 
    name: 'Lanches', 
    icon: Carrot, 
    items: [
      { name: 'Maçã', kcal: 95, p: 0, c: 25, f: 0 },
    ],
    totalKcal: 95
  }
];

export default function DiaryPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger aria-label="Abrir menu lateral" />
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Diário Alimentar</h1>
            <p className="text-muted-foreground">Sexta-feira, 24 de Maio</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input className="pl-9 w-[200px] md:w-[300px]" placeholder="Pesquisar alimento..." aria-label="Pesquisar alimento" />
          </div>
          <Button variant="outline" className="gap-2">
            <ScanLine className="h-4 w-4" aria-hidden="true" /> Scanner
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {meals.map((meal) => (
              <div key={meal.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <meal.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-bold text-lg">{meal.name}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">{meal.totalKcal} kcal</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" aria-label={`Adicionar item ao ${meal.name}`}>
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                
                {meal.items.length > 0 ? (
                  <div className="space-y-2 ml-11">
                    {meal.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm py-1 border-l-2 border-muted pl-3">
                        <span className="text-muted-foreground">{item.name}</span>
                        <div className="flex gap-4">
                          <span className="text-muted-foreground w-12 text-right">{item.kcal} kcal</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-11 text-sm text-muted-foreground italic">
                    Nenhum item registado.
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo Nutricional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Energia</span>
                  <span className="font-bold">785 / 2100 kcal</span>
                </div>
                <Progress value={37} className="h-2" aria-label="Resumo de calorias totais" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Proteína</span>
                  <span className="font-bold">69 / 150g</span>
                </div>
                <Progress value={46} className="h-2" aria-label="Resumo de proteína total" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Carbs</span>
                  <span className="font-bold">68 / 220g</span>
                </div>
                <Progress value={31} className="h-2" aria-label="Resumo de hidratos de carbono totais" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gordura</span>
                  <span className="font-bold">23 / 70g</span>
                </div>
                <Progress value={33} className="h-2" aria-label="Resumo de gorduras totais" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
