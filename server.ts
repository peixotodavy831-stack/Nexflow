import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "NEXFLOW Engine", timestamp: new Date().toISOString() });
});

// AI Nex Study Assistant Chat Route
app.post("/api/ai/nex-chat", async (req, res) => {
  try {
    const { userMessage, currentSubject, currentGoals } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Robust contextual fallback matching Nex personality
      const lower = (userMessage || '').toLowerCase();
      let reply = "Vamos simplificar. O melhor caminho agora é focar em uma única meta por 35 minutos para entrar no Flow.";
      let suggestedAction = {
        type: 'start_flow',
        subjectName: currentSubject || 'Matemática',
        goalTitle: 'Revisão Focada de 35 minutos',
        suggestedDurationMin: 35
      };
      let breakdownTasks = [
        '1. Revisar os 3 conceitos fundamentais (10 min)',
        '2. Resolver 5 exercícios práticos (20 min)',
        '3. Resumo dos pontos de atenção (5 min)'
      ];

      if (lower.includes('prova') || lower.includes('começar') || lower.includes('não sei')) {
        reply = "Não tente abraçar tudo de uma vez. Vamos simplificar: primeiro revisamos a teoria básica e depois partimos para exercícios. Sugiro uma sessão de 35 minutos.";
        breakdownTasks = [
          'Passo 1: Ler o resumo dos tópicos centrais (10 min)',
          'Passo 2: Resolver 6 questões selecionadas (20 min)',
          'Passo 3: Mapear dúvidas restantes (5 min)'
        ];
      } else if (lower.includes('dividir') || lower.includes('tarefa') || lower.includes('plano')) {
        reply = "Dividi seu objetivo em 3 blocos enxutos para manter seu Flow Score alto:";
        breakdownTasks = [
          'Bloco A: Estruturação dos dados e fórmulas (15 min)',
          'Bloco B: Execução prática sem distrações (30 min)',
          'Bloco C: Auto-avaliação rápida (10 min)'
        ];
      } else if (lower.includes('explicar') || lower.includes('o que é') || lower.includes('função')) {
        reply = "Função Quadrática f(x) = ax² + bx + c modela trajetórias parabólicas. O vértice Xv = -b/(2a) determina o ponto máximo ou mínimo. Vamos praticar 3 exercícios?";
        breakdownTasks = ['Revisar cálculo do Delta', 'Encontrar coordenadas do vértice', 'Esboçar o gráfico'];
      }

      return res.json({
        success: true,
        reply,
        suggestedAction,
        breakdownTasks
      });
    }

    const systemPrompt = `Você é o "Nex", a IA assistente oficial do aplicativo NexFlow (app de estudos centrado no estado de Flow).
Sua personalidade:
- Objetiva, madura, masculina/moderna, encorajadora e sem enrolação.
- Nunca converse desnecessariamente nem use textos clichês como "Olá! Como posso ajudar você hoje?".
- Foco em ação: transforme dúvidas em planos de estudo claros, divida tarefas em blocos de 25 a 45 minutos de Flow, e explique conceitos de forma socrática e concisa.
- Sempre responda em Português do Brasil com excelente clareza.

Contexto do aluno:
Matéria atual: ${currentSubject || 'Geral'}
Objetivos ativos: ${JSON.stringify(currentGoals || [])}
Mensagem do estudante: "${userMessage}"

Formato estrito de resposta JSON:
{
  "reply": "Resposta direta e objetiva do Nex (máximo 3 frases)",
  "breakdownTasks": ["Etapa 1 curta", "Etapa 2 curta", "Etapa 3 curta"],
  "suggestedDurationMin": 35,
  "suggestedGoal": "Título direto para a sessão de Flow"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");

    res.json({
      success: true,
      reply: parsed.reply || "Vamos simplificar e entrar no Flow com uma sessão focada.",
      breakdownTasks: parsed.breakdownTasks || [],
      suggestedAction: {
        type: 'start_flow',
        subjectName: currentSubject || 'Matemática',
        goalTitle: parsed.suggestedGoal || 'Sessão de Flow com Nex',
        suggestedDurationMin: parsed.suggestedDurationMin || 35
      }
    });

  } catch (error: any) {
    console.error("Error in /api/ai/nex-chat:", error);
    res.json({
      success: true,
      reply: "Vamos focar no que importa. Sugiro iniciarmos uma sessão de 35 minutos para destravar seu conteúdo.",
      breakdownTasks: ['Revisão dos fundamentos', 'Prática orientada', 'Conclusão e fixação'],
      suggestedAction: {
        type: 'start_flow',
        subjectName: 'Matemática',
        goalTitle: 'Sessão de Foco Nex',
        suggestedDurationMin: 35
      }
    });
  }
});


// AI Socratic Tutor Hint Route
app.post("/api/ai/hint", async (req, res) => {
  try {
    const { questionPrompt, userCurrentAttempt, hintLevel, bottleneckTag } = req.body;
    
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        fallback: true,
        hint: hintLevel === 1 
          ? "Dica Socrática: Identifique primeiro a variável desconhecida e expresse os termos em função dela."
          : hintLevel === 2
          ? "Dica Estrutural: Subtraia os termos com x para um lado e os números constantes para o outro."
          : "Explicação: Veja o passo a passo resolvendo cada igualdade com calma."
      });
    }

    let instruction = "";
    if (hintLevel === 1) {
      instruction = "Forneça UMA única DICA SOCRÁTICA (1 a 2 frases curtas). NÃO dê a resposta final nem monte a equação inteira. Apenas faça o aluno refletir sobre o primeiro passo de raciocínio.";
    } else if (hintLevel === 2) {
      instruction = "Forneça UMA DICA ESTRUTURAL (2 a 3 frases). Dê a estrutura matemática parcial ou mostre como isolar a variável, sem entregar a resposta numérica final.";
    } else {
      instruction = "Forneça uma EXPLICAÇÃO PASSO A PASSO clara e encorajadora do problema e do resultado final.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Você é o Tutor IA do NEXFLOW, um sistema de aprendizagem adaptativa baseado na teoria do Flow e na Ciência da Aprendizagem.
Seu objetivo é PRESERVAR O ESFORÇO COGNITIVO do aluno (não dar respostas fáceis demais).

Exercício: "${questionPrompt}"
Gargalo identificado: "${bottleneckTag || 'Nenhum'}"
Tentativa do aluno: "${userCurrentAttempt || 'Ainda não tentou'}"

Instrução de nível de dica (${hintLevel}):
${instruction}

Responda diretamente em português do Brasil de forma elegante e concisa.`,
    });

    const hintText = response.text || "Pense no primeiro passo para isolar a variável desconhecida.";
    res.json({ success: true, hint: hintText });

  } catch (error: any) {
    console.error("Error in /api/ai/hint:", error);
    res.status(500).json({ 
      error: "Falha ao gerar dica inteligente", 
      message: error?.message || "Erro interno",
      fallback: "Tente analisar as variáveis do problema e isolar o termo desconhecido."
    });
  }
});

// AI Diagnostic Feedback on Wrong/Partial Answer
app.post("/api/ai/feedback", async (req, res) => {
  try {
    const { questionPrompt, userAnswer, correctAnswer, bottleneckTag } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        fallback: true,
        feedback: `Ops! Sua resposta foi "${userAnswer}". A resposta correta era "${correctAnswer}". Repare como interpretar o enunciado e trocar os sinais na equação.`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Você é o assistente de feedback pedagógico do NEXFLOW.
Analise a resposta do estudante para o exercício abaixo:

Exercício: "${questionPrompt}"
Resposta do estudante: "${userAnswer}"
Resposta correta esperada: "${correctAnswer}"
Gargalo do conceito: "${bottleneckTag}"

Escreva um feedback diagnóstico em 2 a 3 frases curtas:
1. Identifique exatamente qual erro conceitual ou de atenção o aluno provavelmente cometeu.
2. Dê uma orientação acionável para o próximo desafio de modo positivo.`,
    });

    res.json({ success: true, feedback: response.text });
  } catch (error: any) {
    console.error("Error in /api/ai/feedback:", error);
    res.status(500).json({ 
      error: "Falha ao analisar resposta",
      fallback: "Sua resposta esteve próxima! Verifique com atenção as etapas de cálculo."
    });
  }
});

// AI Dynamic Adaptive Question Generator
app.post("/api/ai/generate-question", async (req, res) => {
  try {
    const { conceptName, targetDifficulty, studentBottleneck } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        fallback: true,
        question: {
          id: `gen_${Date.now()}`,
          conceptId: 'eq_3',
          conceptName: conceptName || 'Matemática Adaptativa',
          title: 'Desafio Adaptativo de Fixação',
          prompt: 'Se o quádruplo de um número menos 8 é igual a 28, qual é o valor desse número?',
          type: 'numeric',
          correctNumericAnswer: 9,
          difficulty: targetDifficulty || 5,
          bottleneckTag: studentBottleneck || 'Tradução para Álgebra',
          hints: {
            hint1: 'Escreva a equação como 4x - 8 = 28.',
            hint2: 'Somando 8 a ambos os lados, você terá 4x = 36.',
            explanation: '4x - 8 = 28 => 4x = 36 => x = 9.'
          }
        }
      });
    }

    const prompt = `Gere 1 questão inédita de matemática em formato JSON para o sistema NEXFLOW.
Conceito: "${conceptName}"
Dificuldade desejada (1 a 10): ${targetDifficulty || 5}
Foco em resolver o gargalo do aluno: "${studentBottleneck || 'Tradução do texto para equação'}"

Formato estrito de retorno JSON:
{
  "title": "Título do Exercício",
  "prompt": "Texto do enunciado do problema",
  "type": "multiple_choice",
  "difficulty": ${targetDifficulty || 5},
  "bottleneckTag": "${studentBottleneck || 'Tradução Verbal'}",
  "options": [
    { "id": "opt1", "text": "Opção A", "isCorrect": false },
    { "id": "opt2", "text": "Opção B", "isCorrect": true },
    { "id": "opt3", "text": "Opção C", "isCorrect": false },
    { "id": "opt4", "text": "Opção D", "isCorrect": false }
  ],
  "hints": {
    "hint1": "Dica socrática inicial...",
    "hint2": "Pista estrutural da equação...",
    "explanation": "Explicação completa passo a passo..."
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    const generatedQuestion = {
      id: `gen_${Date.now()}`,
      conceptId: 'eq_3',
      conceptName: conceptName || 'Matemática • Equações',
      title: parsed.title || 'Desafio Adaptativo NEXFLOW',
      prompt: parsed.prompt || 'Resolva a equação.',
      type: parsed.type || 'multiple_choice',
      options: parsed.options || [],
      difficulty: parsed.difficulty || targetDifficulty || 5,
      bottleneckTag: parsed.bottleneckTag || studentBottleneck || 'Raciocínio Lógico',
      hints: parsed.hints || {
        hint1: 'Identifique os dados no problema.',
        hint2: 'Monte a igualdade matemática.',
        explanation: 'Siga os passos algébricos até encontrar x.'
      }
    };

    res.json({ success: true, question: generatedQuestion });

  } catch (error: any) {
    console.error("Error generating question:", error);
    res.status(500).json({ error: "Falha na geração adaptativa" });
  }
});

// ----------------------------------------------------
// VITE / STATIC SERVING
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 NEXFLOW Express + Vite server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
