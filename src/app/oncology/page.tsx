'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ShieldCheck, FileText, Info, Plus, Apple, Trash2, Calendar as CalendarIcon, Utensils, LogIn } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

export default function OncologyPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const patientDetailsId = user?.uid;

  const plansQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid || !patientDetailsId) return null;
    return collection(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans');
  }, [firestore, user?.uid, patientDetailsId]);

  const { data: plans, isLoading: isLoadingPlans } = useCollection(plansQuery);

  const foodsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid || !patientDetailsId || !selectedPlanId) return null;
    return collection(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans', selectedPlanId, 'recommendedFoods');
  }, [firestore, user?.uid, patientDetailsId, selectedPlanId]);

  const { data: recommendedFoods } = useCollection(foodsQuery);

  const handleAddPlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore || !user?.uid || !patientDetailsId) return;

    const formData = new FormData(e.currentTarget);
    const newPlan = {
      patientId: patientDetailsId,
      userId: user.uid,
      planName: formData.get('planName') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      targetCalories: Number(formData.get('targetCalories')),
      targetProteinGrams: Number(formData.get('targetProteinGrams')),
      targetCarbsGrams: Number(formData.get('targetCarbsGrams')),
      targetFatGrams: Number(formData.get('targetFatGrams')),
      specialDietaryConsiderations: formData.get('specialDietaryConsiderations') as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const plansRef = collection(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans');
    addDocumentNonBlocking(plansRef, newPlan);
    (e.target as HTMLFormElement).reset();
  };

  const handleAddFood = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore || !user?.uid || !patientDetailsId || !selectedPlanId) return;

    const formData = new FormData(e.currentTarget);
    const newFood = {
      planId: selectedPlanId,
      userId: user.uid,
      patientId: patientDetailsId,
      generalFoodCategory: formData.get('category') as string,
      recommendedQuantity: Number(formData.get('quantity')),
      recommendedUnit: formData.get('unit') as string,
      mealTypeSuggestion: formData.get('mealType') as string,
      preparationNotes: formData.get('notes') as string,
      createdAt: new Date().toISOString(),
    };

    const foodsRef = collection(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans', selectedPlanId, 'recommendedFoods');
    addDocumentNonBlocking(foodsRef, newFood);
    (e.target as HTMLFormElement).reset();
  };

  const handleDeletePlan = (id: string) => {
    if (!firestore || !user?.uid || !patientDetailsId) return;
    const planRef = doc(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans', id);
    deleteDocumentNonBlocking(planRef);
    if (selectedPlanId === id) setSelectedPlanId(null);
  };

  const handleDeleteFood = (id: string) => {
    if (!firestore || !user?.uid || !patientDetailsId || !selectedPlanId) return;
    const foodRef = doc(firestore, 'users', user.uid, 'oncologyPatientDetails', patientDetailsId, 'nutritionalPlans', selectedPlanId, 'recommendedFoods', id);
    deleteDocumentNonBlocking(foodRef);
  };

  if (isUserLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-center">
        <ShieldCheck className="h-16 w-16 text-primary/20 mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-4">Acesso Restrito</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Para aceder ao seu acompanhamento oncológico personalizado, por favor autentique-se na plataforma NutriAI.
        </p>
        <Link href="/login">
          <Button size="lg" className="gap-2">
            <LogIn className="h-5 w-5" /> Iniciar Sessão
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Acompanhamento Oncológico</h1>
          <p className="text-muted-foreground">Gestão integrada de fisiologia e nutrição especializada.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Relatório Geral
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />
        <AlertTitle className="text-blue-700">Protocolo Clínico</AlertTitle>
        <AlertDescription className="text-blue-600">
          As recomendações nutricionais e de exercício são adaptadas à sua fase de tratamento. Consulte sempre a sua equipa médica.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="physiology" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
          <TabsTrigger value="physiology" className="flex gap-2">
            <Activity className="h-4 w-4" aria-hidden="true" /> Fisiologia
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex gap-2">
            <Apple className="h-4 w-4" aria-hidden="true" /> Nutrição
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physiology" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Métricas de Performance</CardTitle>
                <CardDescription>Análise baseada em dados cinesiológicos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase">VO2 Max Estimado</h2>
                    <div className="text-2xl font-bold mt-1">32.4 ml/kg/min</div>
                    <div className="text-xs text-green-600 font-semibold mt-1">+2.1 vs mês anterior</div>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase">Carga de Treino</h2>
                    <div className="text-2xl font-bold mt-1">Moderada (RPE 4-6)</div>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase">FC Alvo</h2>
                    <div className="text-2xl font-bold mt-1">112 - 134 bpm</div>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase">Status</h2>
                    <div className="text-2xl font-bold mt-1">Estável</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" /> Prescrição Segura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                    <span>Treino aeróbico de baixo impacto 3x/semana.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                    <span>Monitorizar fadiga extrema pós-sessão.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                    <span>Sessões de no máximo 40 minutos.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 h-fit">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">Planos Nutricionais</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <Plus className="h-4 w-4" aria-hidden="true" /> Novo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Plano Nutricional</DialogTitle>
                      <DialogDescription>
                        Defina as metas e objetivos para o seu acompanhamento nutricional especializado.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPlan}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="planName">Nome do Plano</Label>
                          <Input id="planName" name="planName" placeholder="Ex: Dieta Recuperação Ativa" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Início</Label>
                            <Input id="startDate" name="startDate" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">Fim</Label>
                            <Input id="endDate" name="endDate" type="date" required />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="targetCalories">Calorias (kcal)</Label>
                            <Input id="targetCalories" name="targetCalories" type="number" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="targetProteinGrams">Proteína (g)</Label>
                            <Input id="targetProteinGrams" name="targetProteinGrams" type="number" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição / Objetivos</Label>
                          <Textarea id="description" name="description" placeholder="Descreva o propósito deste plano..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialDietaryConsiderations">Considerações Especiais</Label>
                          <Input id="specialDietaryConsiderations" name="specialDietaryConsiderations" placeholder="Ex: Baixo resíduo, sem lactose..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="w-full">Criar Plano</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {isLoadingPlans ? (
                  <div className="flex justify-center p-4">A carregar planos...</div>
                ) : plans?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Utensils className="h-10 w-10 mx-auto mb-2 opacity-20" aria-hidden="true" />
                    <p>Nenhum plano criado.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {plans?.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`group relative flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedPlanId === plan.id ? 'bg-primary/5 border-primary shadow-sm' : 'hover:bg-muted'
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-selected={selectedPlanId === plan.id}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm truncate pr-6">{plan.planName}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePlan(plan.id);
                            }}
                            aria-label={`Eliminar plano ${plan.planName}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" aria-hidden="true" />
                          <span>{plan.startDate} - {plan.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              {selectedPlanId ? (
                <>
                  <CardHeader className="border-b bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <CardTitle className="text-xl">
                          {plans?.find(p => p.id === selectedPlanId)?.planName}
                        </CardTitle>
                        <CardDescription>Gestão de alimentos recomendados e metas.</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/80 gap-2">
                            <Plus className="h-4 w-4" aria-hidden="true" /> Add Alimento
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Recomendar Alimento</DialogTitle>
                            <DialogDescription>
                              Adicione alimentos específicos recomendados para este plano clínico.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleAddFood}>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="category">Alimento ou Categoria</Label>
                                <Input id="category" name="category" placeholder="Ex: Frango cozido, Legumes vapor..." required />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="quantity">Quantidade</Label>
                                  <Input id="quantity" name="quantity" type="number" required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="unit">Unidade</Label>
                                  <Input id="unit" name="unit" placeholder="g, ml, un..." required />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="mealType">Refeição Sugerida</Label>
                                <Input id="mealType" name="mealType" placeholder="Ex: Almoço, Pequeno-almoço..." required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="notes">Notas de Preparação</Label>
                                <Textarea id="notes" name="notes" placeholder="Dicas para facilitar a ingestão..." />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="w-full">Adicionar Recomendação</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {plans?.find(p => p.id === selectedPlanId) && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-2 rounded bg-white border">
                          <div className="text-[10px] uppercase font-bold text-muted-foreground">Calorias</div>
                          <div className="text-sm font-bold">{plans.find(p => p.id === selectedPlanId)?.targetCalories} kcal</div>
                        </div>
                        <div className="p-2 rounded bg-white border">
                          <div className="text-[10px] uppercase font-bold text-muted-foreground">Proteína</div>
                          <div className="text-sm font-bold">{plans.find(p => p.id === selectedPlanId)?.targetProteinGrams} g</div>
                        </div>
                        <div className="p-2 rounded bg-white border">
                          <div className="text-[10px] uppercase font-bold text-muted-foreground">Carbs</div>
                          <div className="text-sm font-bold">{plans.find(p => p.id === selectedPlanId)?.targetCarbsGrams} g</div>
                        </div>
                        <div className="p-2 rounded bg-white border">
                          <div className="text-[10px] uppercase font-bold text-muted-foreground">Gordura</div>
                          <div className="text-sm font-bold">{plans.find(p => p.id === selectedPlanId)?.targetFatGrams} g</div>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h2 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Alimentos Recomendados</h2>
                    <div className="space-y-4">
                      {recommendedFoods?.length === 0 ? (
                        <p className="text-center py-8 text-sm text-muted-foreground">Nenhum alimento recomendado para este plano.</p>
                      ) : (
                        recommendedFoods?.map((food) => (
                          <div key={food.id} className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-4 items-center">
                              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                <Utensils className="h-5 w-5 text-accent-foreground" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="font-bold text-base">{food.generalFoodCategory}</h3>
                                <div className="flex gap-2 text-xs text-muted-foreground items-center">
                                  <span className="bg-primary/5 px-2 py-0.5 rounded text-primary font-medium">{food.mealTypeSuggestion}</span>
                                  <span>•</span>
                                  <span>{food.recommendedQuantity}{food.recommendedUnit}</span>
                                </div>
                                {food.preparationNotes && (
                                  <p className="text-xs text-muted-foreground mt-1 italic">"{food.preparationNotes}"</p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteFood(food.id)}
                              aria-label={`Remover alimento ${food.generalFoodCategory}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                  <Apple className="h-12 w-12 mb-4 opacity-10" aria-hidden="true" />
                  <p className="text-lg">Selecione um plano à esquerda para gerir os detalhes nutricionais.</p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
