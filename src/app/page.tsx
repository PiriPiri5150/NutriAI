import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Apple, BrainCircuit, LineChart, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline text-primary">NutriAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Painel
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/diary">
            Diário
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/oncology">
            Oncologia
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary font-headline">
                    Transforme a sua Saúde com IA
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    NutriAI: O seu assistente pessoal de nutrição e fitness que aprende consigo. Planos personalizados, diário inteligente e análise especializada.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Começar Agora
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button size="lg" variant="outline">
                      Definir Metas
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    alt="NutriAI Hero"
                    className="object-cover w-full h-full"
                    src="https://picsum.photos/seed/nutriai/800/800"
                    data-ai-hint="healthy lifestyle"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary font-headline">Funcionalidades Core</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que precisa para atingir os seus objetivos de forma inteligente e sustentável.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <Card className="border-none shadow-md bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Apple className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Diário Inteligente</h3>
                  <p className="text-muted-foreground">Registo fácil de refeições com scanner de código de barras e base de dados integrada.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-accent/20">
                    <BrainCircuit className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Nutricionista IA</h3>
                  <p className="text-muted-foreground">Feedback em tempo real, sugestões de refeições e ajustes dinâmicos de metas.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Módulo Oncológico</h3>
                  <p className="text-muted-foreground">Análise fisiológica avançada e prescrição segura para pacientes oncológicos.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-muted-foreground">© 2024 NutriAI. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
        </nav>
      </footer>
    </div>
  );
}
