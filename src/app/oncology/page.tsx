import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ShieldCheck, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function OncologyPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Análise Oncológica Especializada</h1>
          <p className="text-muted-foreground">Monitorização avançada para prescrição de exercício segura.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Exportar Relatório
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/80 gap-2">
            Nova Avaliação
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Nota de Segurança</AlertTitle>
        <AlertDescription className="text-blue-600">
          Este módulo utiliza modelos baseados em fisiologia do exercício clínico. Toda a prescrição deve ser validada por um especialista.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cálculos Fisiológicos</CardTitle>
            <CardDescription>Métricas baseadas em dados cinesiológicos e laboratoriais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm font-medium text-muted-foreground uppercase">VO2 Max Estimado</div>
                <div className="text-2xl font-bold mt-1">32.4 ml/kg/min</div>
                <div className="text-xs text-green-600 font-semibold mt-1">+2.1 vs mês anterior</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm font-medium text-muted-foreground uppercase">Carga de Treino Ideal</div>
                <div className="text-2xl font-bold mt-1">Moderada (RPE 4-6)</div>
                <div className="text-xs text-muted-foreground mt-1">Sugestão: 150min / semana</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm font-medium text-muted-foreground uppercase">Frequência Cardíaca Alvo</div>
                <div className="text-2xl font-bold mt-1">112 - 134 bpm</div>
                <div className="text-xs text-muted-foreground mt-1">Zona Aeróbica 2</div>
              </div>
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="text-sm font-medium text-muted-foreground uppercase">Status Metabólico</div>
                <div className="text-2xl font-bold mt-1">Estável</div>
                <div className="text-xs text-muted-foreground mt-1">Sem sinais de caquexia</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Prescrição Segura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Com base nos seus últimos exames e dados de atividade, a IA recomenda:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Focar em exercícios de resistência de baixa intensidade.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Evitar sessões superiores a 45 minutos em dias de fadiga acentuada.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Priorizar hidratação antes e após a atividade.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
