'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2, Save, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  // Memoize the document reference for the user's profile
  const profileRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  // Local state for the form
  const [formData, setFormData] = useState({
    ageYears: 30,
    sex: 'male',
    heightCm: 175,
    weightKg: 75,
    activityLevel: 'moderately_active',
    goal: 'maintenance',
    targetWeightKg: 75,
  });

  // Update local state when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        ageYears: profile.ageYears || 30,
        sex: profile.sex || 'male',
        heightCm: profile.heightCm || 175,
        weightKg: profile.weightKg || 75,
        activityLevel: profile.activityLevel || 'moderately_active',
        goal: profile.goal || 'maintenance',
        targetWeightKg: profile.targetWeightKg || profile.weightKg || 75,
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (!profileRef || !user?.uid) return;

    // Basic TDEE and Goal calculation (simplified for MVP)
    // In a real app, this could be more complex or handled by the AI flow
    const baseCalories = 2000;
    const profileUpdate = {
      ...formData,
      id: user.uid,
      dailyCaloricGoal: baseCalories,
      proteinGoalGrams: 150,
      carbGoalGrams: 200,
      fatGoalGrams: 70,
      updatedAt: new Date().toISOString(),
      createdAt: profile?.createdAt || new Date().toISOString(),
    };

    setDocumentNonBlocking(profileRef, profileUpdate, { merge: true });
  };

  if (isUserLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-center">
        <h1 className="text-3xl font-bold font-headline mb-4">Acesso ao Perfil</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Inicie sessão para configurar o seu perfil e objetivos personalizados.
        </p>
        <Link href="/login">
          <Button size="lg" className="gap-2">
            <LogIn className="h-5 w-5" /> Entrar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold font-headline text-primary">Perfil & Objetivos</h1>
        <p className="text-muted-foreground">Configure os seus dados para cálculos personalizados pela IA.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados Antropométricos</CardTitle>
          <CardDescription>Estes dados serão usados para calcular o seu TDEE e macros.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input 
                id="age" 
                type="number" 
                value={formData.ageYears}
                onChange={(e) => handleInputChange('ageYears', parseInt(e.target.value))}
                placeholder="Ex: 30" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <Select 
                value={formData.sex}
                onValueChange={(value) => handleInputChange('sex', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input 
                id="height" 
                type="number" 
                value={formData.heightCm}
                onChange={(e) => handleInputChange('heightCm', parseInt(e.target.value))}
                placeholder="Ex: 175" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso Atual (kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                value={formData.weightKg}
                onChange={(e) => handleInputChange('weightKg', parseFloat(e.target.value))}
                placeholder="Ex: 75.5" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Nível de Atividade</Label>
            <Select 
              value={formData.activityLevel}
              onValueChange={(value) => handleInputChange('activityLevel', value)}
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="Selecione o seu nível de atividade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                <SelectItem value="lightly_active">Levemente Ativo (1-3 dias/semana)</SelectItem>
                <SelectItem value="moderately_active">Moderadamente Ativo (3-5 dias/semana)</SelectItem>
                <SelectItem value="very_active">Muito Ativo (6-7 dias/semana)</SelectItem>
                <SelectItem value="extra_active">Extra Ativo (Trabalho físico intenso)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objetivos</CardTitle>
          <CardDescription>O que pretende alcançar?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal">Objetivo Principal</Label>
            <Select 
              value={formData.goal}
              onValueChange={(value) => handleInputChange('goal', value)}
            >
              <SelectTrigger id="goal">
                <SelectValue placeholder="Escolha um objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">Perda de Peso</SelectItem>
                <SelectItem value="maintenance">Manutenção de Peso</SelectItem>
                <SelectItem value="muscle_gain">Ganho de Massa Muscular</SelectItem>
                <SelectItem value="performance">Melhoria de Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-weight">Peso Alvo (kg)</Label>
            <Input 
              id="target-weight" 
              type="number" 
              value={formData.targetWeightKg}
              onChange={(e) => handleInputChange('targetWeightKg', parseFloat(e.target.value))}
              placeholder="Ex: 70" 
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 py-6 text-lg gap-2"
            onClick={handleSaveProfile}
            disabled={isProfileLoading}
          >
            {isProfileLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Save className="h-5 w-5" />}
            Guardar & Calcular Metas com IA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
