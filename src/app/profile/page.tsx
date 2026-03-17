import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
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
              <Input id="age" type="number" placeholder="Ex: 30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input id="height" type="number" placeholder="Ex: 175" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso Atual (kg)</Label>
              <Input id="weight" type="number" placeholder="Ex: 75.5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Nível de Atividade</Label>
            <Select>
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
            <Select>
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
            <Input id="target-weight" type="number" placeholder="Ex: 70" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
            Guardar & Calcular Metas com IA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
