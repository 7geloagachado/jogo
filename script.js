/* ============================================================
   JOGO: VERDADEIRO OU FALSO — MATEMÁTICA 6º ANO
   ============================================================ */

// ---------- BANCO DE QUESTÕES ----------
// Edite/adicione aqui. "resposta": true (verdadeiro) ou false (falso)
const BANCO_QUESTOES = [
  {
    afirmacao: "O resultado de 7 × 8 é 56.",
    resposta: true,
    explicacao: "7 × 8 = 56. Correto!"
  },
  {
    afirmacao: "A raiz quadrada de 81 é 8.",
    resposta: false,
    explicacao: "A raiz quadrada de 81 é 9, pois 9 × 9 = 81."
  },
  {
    afirmacao: "O número 1 é considerado um número primo.",
    resposta: false,
    explicacao: "1 não é primo, pois só tem um divisor (ele mesmo). Primos têm exatamente 2 divisores."
  },
  {
    afirmacao: "A fração 1/2 é maior que 1/3.",
    resposta: true,
    explicacao: "1/2 = 0,5 e 1/3 ≈ 0,33. Então 1/2 é maior."
  },
  {
    afirmacao: "Um ângulo reto mede 90 graus.",
    resposta: true,
    explicacao: "Ângulo reto = 90°. Correto!"
  },
  {
    afirmacao: "O perímetro de um quadrado de lado 5 cm é 20 cm.",
    resposta: true,
    explicacao: "Perímetro = 4 × 5 = 20 cm. Correto!"
  },
  {
    afirmacao: "O dobro de 15 é 35.",
    resposta: false,
    explicacao: "O dobro de 15 é 30 (15 × 2 = 30)."
  },
  {
    afirmacao: "10% de 200 é igual a 20.",
    resposta: true,
    explicacao: "10% de 200 = 200 ÷ 10 = 20. Correto!"
  },
  {
    afirmacao: "Um triângulo pode ter dois ângulos retos.",
    resposta: false,
    explicacao: "A soma dos ângulos de um triângulo é 180°. Dois ângulos de 90° já somam 180°, impossível."
  },
  {
    afirmacao: "O número 0,5 é igual à fração 1/2.",
    resposta: true,
    explicacao: "0,5 = 5/10 = 1/2. Correto!"
  },
  {
    afirmacao: "A área de um retângulo de 4 cm por 6 cm é 24 cm².",
    resposta: true,
    explicacao: "Área = base × altura = 4 × 6 = 24 cm². Correto!"
  },
  {
    afirmacao: "O menor número primo é 2.",
    resposta: true,
    explicacao: "2 é o menor primo (e o único par). Correto!"
  },
  {
    afirmacao: "3/4 é maior que 0,8.",
    resposta: false,
    explicacao: "3/4 = 0,75, que é menor que 0,8."
  },
  {
    afirmacao: "A soma dos ângulos internos de um quadrilátero é 360°.",
    resposta: true,
    explicacao: "Todo quadrilátero tem soma dos ângulos internos igual a 360°. Correto!"
  },
  {
    afirmacao: "O resultado de 100 ÷ 4 é 20.",
    resposta: false,
    explicacao: "100 ÷ 4 = 25, e não 20."
  }
];

// ---------- CONFIGURAÇÕES DO JOGO ----------
const CONFIG = {
  totalPerguntas: 10,
  tempoPorPergunta: 15,   // segundos
  vidasIniciais: 3,
  pontosPorAcerto: 10,
  bonusRapido: 5,          // bônus se responder em <= 5s
  tempoBonus: 5            // segundos
};

// ---------- ESTADO DO JOGO ----------
let estado = {
  perguntas: [],
  indice: 0,
  pontos: 0,
  vidas: CONFIG.vidasIniciais,
  acertos: 0,
  erros: 0,
  tempoRestante: CONFIG.tempoPorPergunta,
  intervaloTimer: null,
  travado: false  // evita duplo clique / múltiplas respostas
};

// ---------- REFERÊNCIAS DO DOM ----------
const telaInicio   = document.getElementById('tela-inicio');
const telaJogo     = document.getElementById('tela-jogo');
const telaFim      = document.getElementById('tela-fim');

const hudVidas     = document.getElementById('hud-vidas');
const hudPontos    = document.getElementById('hud-pontos');
const hudProgresso = document.getElementById('hud-progresso');

const barraPreench  = document.getElementById('barra-preenchimento');
const tempoTexto    = document.getElementById('tempo-texto');

const numeroPergunta = document.getElementById('numero-pergunta');
const afirmacaoEl    = document.getElementById('afirmacao');
const feedbackEl     = document.getElementById('feedback');

const btnVerdadeiro = document.querySelector('.btn-verdadeiro');
const btnFalso      = document.querySelector('.btn-falso');
const btnsResposta  = [btnVerdadeiro, btnFalso];

const btnComecar   = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const emojiFim     = document.getElementById('emoji-fim');
const tituloFim    = document.getElementById('titulo-fim');
const mensagemFim  = document.getElementById('mensagem-fim');
const fimPontos    = document.getElementById('fim-pontos');
const fimAcertos   = document.getElementById('fim-acertos');
const fimErros     = document.getElementById('fim-erros');

// ---------- FUNÇÕES AUXILIARES ----------
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function mostrarTela(tela) {
  [telaInicio, telaJogo, telaFim].forEach(t => t.classList.remove('ativa'));
  tela.classList.add('ativa');
}

function atualizarHUD() {
  hudVidas.textContent = '❤️'.repeat(estado.vidas) + '🖤'.repeat(Math.max(0, CONFIG.vidasIniciais - estado.vidas));
  hudPontos.textContent = `⭐ ${estado.pontos}`;
  hudProgresso.textContent = `${estado.indice + 1}/${CONFIG.totalPerguntas}`;
}

function atualizarBarraTempo() {
  const pct = (estado.tempoRestante / CONFIG.tempoPorPergunta) * 100;
  barraPreench.style.width = pct + '%';
  tempoTexto.textContent = estado.tempoRestante + 's';

  barraPreench.classList.remove('alerta', 'perigo');
  if (estado.tempoRestante <= 5) {
    barraPreench.classList.add('perigo');
  } else if (estado.tempoRestante <= 10) {
    barraPreench.classList.add('alerta');
  }
}

function limparTimer() {
  if (estado.intervaloTimer) {
    clearInterval(estado.intervaloTimer);
    estado.intervaloTimer = null;
  }
}

function travarBotoes(travado) {
  btnsResposta.forEach(b => (b.disabled = travado));
}

// ---------- INÍCIO DO JOGO ----------
function iniciarJogo() {
  estado = {
    perguntas: embaralhar(BANCO_QUESTOES).slice(0, CONFIG.totalPerguntas),
    indice: 0,
    pontos: 0,
    vidas: CONFIG.vidasIniciais,
    acertos: 0,
    erros: 0,
    tempoRestante: CONFIG.tempoPorPergunta,
    intervaloTimer: null,
    travado: false
  };

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  mostrarTela(telaJogo);
  carregarPergunta();
}

// ---------- CARREGAR PERGUNTA ----------
function carregarPergunta() {
  limparTimer();

  // Verifica condições de fim
  if (estado.indice >= CONFIG.totalPerguntas || estado.vidas <= 0) {
    finalizarJogo();
    return;
  }

  estado.travado = false;
  travarBotoes(false);
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  // Remove classes de feedback dos botões
  btnsResposta.forEach(b => b.classList.remove('correto', 'errado'));

  const pergunta = estado.perguntas[estado.indice];
  afirmacaoEl.textContent = pergunta.afirmacao;
  numeroPergunta.textContent = `Pergunta ${estado.indice + 1} de ${CONFIG.totalPerguntas}`;

  atualizarHUD();

  // Inicia o tempo
  estado.tempoRestante = CONFIG.tempoPorPergunta;
  atualizarBarraTempo();

  estado.intervaloTimer = setInterval(() => {
    estado.tempoRestante--;
    atualizarBarraTempo();

    if (estado.tempoRestante <= 0) {
      limparTimer();
      responder(null); // tempo esgotado
    }
  }, 1000);
}

// ---------- RESPONDER ----------
function responder(respostaUsuario) {
  if (estado.travado) return;
  estado.travado = true;
  limparTimer();

  const pergunta = estado.perguntas[estado.indice];
  const tempoUsado = CONFIG.tempoPorPergunta - estado.tempoRestante;

  travarBotoes(true);

  // Caso 1: tempo esgotado
  if (respostaUsuario === null) {
    estado.erros++;
    estado.vidas--;
    feedbackEl.textContent = `⏰ Tempo esgotado! ${pergunta.explicacao}`;
    feedbackEl.className = 'feedback erro';

    // Marca o botão correto
    const btnCorreto = pergunta.resposta ? btnVerdadeiro : btnFalso;
    btnCorreto.classList.add('correto');

    atualizarHUD();
    avancar();
    return;
  }

  // Caso 2: resposta do jogador
  const acertou = respostaUsuario === pergunta.resposta;

  if (acertou) {
    estado.acertos++;

    let pontosGanhos = CONFIG.pontosPorAcerto;
    let bonus = '';
    if (tempoUsado <= CONFIG.tempoBonus) {
      pontosGanhos += CONFIG.bonusRapido;
      bonus = ` +${CONFIG.bonusRapido} bônus rápido! 🔥`;
    }
    estado.pontos += pontosGanhos;

    feedbackEl.textContent = `✅ Acertou! +${pontosGanhos} pontos${bonus}`;
    feedbackEl.className = 'feedback sucesso';

    // Destaca o botão clicado como correto
    const btnClicado = respostaUsuario ? btnVerdadeiro : btnFalso;
    btnClicado.classList.add('correto');
  } else {
    estado.erros++;
    estado.vidas--;

    feedbackEl.textContent = `❌ Errou! ${pergunta.explicacao}`;
    feedbackEl.className = 'feedback erro';

    // Marca o botão clicado como errado e o correto com destaque
    const btnClicado = respostaUsuario ? btnVerdadeiro : btnFalso;
    const btnCorreto = pergunta.resposta ? btnVerdadeiro : btnFalso;
    btnClicado.classList.add('errado');
    btnCorreto.classList.add('correto');
  }

  atualizarHUD();
  avancar();
}

// ---------- AVANÇAR ----------
function avancar() {
  setTimeout(() => {
    estado.indice++;

    if (estado.vidas <= 0) {
      finalizarJogo();
    } else if (estado.indice >= CONFIG.totalPerguntas) {
      finalizarJogo();
    } else {
      carregarPergunta();
    }
  }, 1800);
}

// ---------- FINALIZAR ----------
function finalizarJogo() {
  limparTimer();
  travarBotoes(true);

  const acertos = estado.acertos;
  const total = CONFIG.totalPerguntas;
  const pct = (acertos / total) * 100;

  fimPontos.textContent = estado.pontos;
  fimAcertos.textContent = acertos;
  fimErros.textContent = estado.erros;

  // Define mensagem conforme desempenho
  if (estado.vidas <= 0 && estado.indice < total) {
    emojiFim.textContent = '💔';
    tituloFim.textContent = 'Suas vidas acabaram!';
    mensagemFim.textContent = `Você chegou até a pergunta ${estado.indice + 1}. Continue tentando!`;
  } else if (pct === 100) {
    emojiFim.textContent = '🏆';
    tituloFim.textContent = 'Perfeito!';
    mensagemFim.textContent = 'Você acertou tudo! É um mestre da matemática! 🧠✨';
  } else if (pct >= 70) {
    emojiFim.textContent = '🥇';
    tituloFim.textContent = 'Muito bem!';
    mensagemFim.textContent = 'Excelente desempenho! Você domina bastante conteúdo.';
  } else if (pct >= 50) {
    emojiFim.textContent = '😊';
    tituloFim.textContent = 'Bom trabalho!';
    mensagemFim.textContent = 'Você está no caminho certo. Continue praticando!';
  } else {
    emojiFim.textContent = '📚';
    tituloFim.textContent = 'Continue estudando!';
    mensagemFim.textContent = 'Não desanime! Revise o conteúdo e tente de novo.';
  }

  mostrarTela(telaFim);
}

// ---------- EVENTOS ----------
btnComecar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', iniciarJogo);

btnVerdadeiro.addEventListener('click', () => responder(true));
btnFalso.addEventListener('click', () => responder(false));

// Atalhos de teclado: V = Verdadeiro, F = Falso, setas
document.addEventListener('keydown', (e) => {
  if (!telaJogo.classList.contains('ativa') || estado.travado) return;

  const tecla = e.key.toLowerCase();
  if (tecla === 'v' || e.key === 'ArrowLeft') {
    responder(true);
  } else if (tecla === 'f' || e.key === 'ArrowRight') {
    responder(false);
  }
});