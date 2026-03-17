import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BrainCircuit, Send, Sparkles } from 'lucide-react';

export default function AICoachPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-primary">NutriAI Coach</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Online e pronto para ajudar
            </p>
          </div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* System/Welcome Message */}
            <div className="flex gap-3 max-w-[85%]">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="p-4 rounded-2xl rounded-tl-none bg-white border shadow-sm">
                  <p className="text-sm">
                    Olá! Eu sou o seu coach virtual da NutriAI. Analisei o seu diário alimentar de hoje e notei que você está a progredir bem com a ingestão de gorduras, mas pode precisar de mais fibras. 
                  </p>
                  <p className="text-sm mt-2">
                    Como posso ajudar hoje? Posso sugerir um jantar rico em proteína ou responder a dúvidas sobre o seu treino.
                  </p>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-accent text-accent-foreground">U</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-white shadow-sm">
                  <p className="text-sm">
                    Podes sugerir um jantar leve mas que me ajude a bater a meta de 30g de proteína?
                  </p>
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-3 max-w-[85%]">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="p-4 rounded-2xl rounded-tl-none bg-white border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-accent-foreground" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sugestão de Jantar</span>
                  </div>
                  <p className="text-sm font-semibold">Salmão ao Vapor com Espargos e Quinoa</p>
                  <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Proteína: 34g</li>
                    <li>Calorias: 420 kcal</li>
                    <li>Fibras: 6g</li>
                  </ul>
                  <p className="text-sm mt-3 italic">
                    "É um prato leve e rico em Ômega-3, perfeito para uma recuperação noturna tranquila."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-white">
          <form className="flex gap-2">
            <Input 
              placeholder="Pergunte sobre nutrição, treino ou peça uma sugestão..." 
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Sugestão de lanche', 'Análise semanal', 'Metas de hoje', 'VO2 Max'].map((tag) => (
              <Button key={tag} variant="outline" size="sm" className="whitespace-nowrap rounded-full text-xs h-8">
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
