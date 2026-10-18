/* ============================================================
   OFICINA DAS ENGRENAGENS — O ENIGMA DA MÁQUINA DE ENERGIA
   Lógica completa: calibragem, manômetro, ferramentas, peças
   ============================================================ */

const BANCO_CIRCUITOS = [
  {
    afirmacao: "O resultado de 7 × 8 é 56.",
    resposta: true,
    explicacao: "7 × 8 = 56. Circuito estável.",
    passos: [
      "Multiplicar 7 × 8.",
      "7 × 8 = 7 × (2 × 4) = (7 × 2) × 4 = 14 × 4.",
      "14 × 4 = 56.",
      "Afirmação confere: 56 = 56."
    ]
  },
  {
    afirmacao: "A raiz quadrada de 81 é 8.",
    resposta: false,
    explicacao: "A raiz quadrada de 81 é 9, pois 9 × 9 = 81.",
    passos: [
      "Procurar um número que, elevado ao quadrado, resulte em 81.",
      "8 × 8 = 64 (não serve).",
      "9 × 9 = 81 (serve!).",
      "Portanto √81 = 9, e não 8. Há anomalia."
    ]
  },
  {
    afirmacao: "O número 1 é considerado um número primo.",
    resposta: false,
    explicacao: "1 não é primo: primos têm exatamente 2 divisores distintos.",
    passos: [
      "Definição: primo é o número com exatamente 2 divisores (1 e ele mesmo).",
      "Divisores de 1: apenas o próprio 1.",
      "1 tem só 1 divisor, então não é primo.",
      "Anomalia detectada."
    ]
  },
  {
    afirmacao: "A fração 1/2 é maior que 1/3.",
    resposta: true,
    explicacao: "1/2 = 0,5 e 1/3 ≈ 0,333…, logo 1/2 é maior.",
    passos: [
      "Transformar em decimais ou comparar com denominador comum.",
      "1/2 = 0,5.",
      "1/3 ≈ 0,333…",
      "0,5 > 0,333, então 1/2 > 1/3. Estável."
    ]
  },
  {
    afirmacao: "Um ângulo reto mede 90 graus.",
    resposta: true,
    explicacao: "Ângulo reto = 90°. Correto.",
    passos: [
      "Ângulo reto é aquele formado por duas retas perpendiculares.",
      "Por definição, sua medida é 90°.",
      "Afirmação confere."
    ]
  },
  {
    afirmacao: "O perímetro de um quadrado de lado 5 cm é 20 cm.",
    resposta: true,
    explicacao: "Perímetro = 4 × lado = 4 × 5 = 20 cm.",
    passos: [
      "Quadrado tem 4 lados iguais.",
      "Perímetro = 4 × 5 cm.",
      "4 × 5 = 20 cm.",
      "Estável."
    ]
  },
  {
    afirmacao: "O dobro de 15 é 35.",
    resposta: false,
    explicacao: "O dobro de 15 é 30 (15 × 2 = 30).",
    passos: [
      "Dobro significa multiplicar por 2.",
      "15 × 2 = 30.",
      "30 ≠ 35, logo há anomalia."
    ]
  },
  {
    afirmacao: "10% de 200 é igual a 20.",
    resposta: true,
    explicacao: "10% de 200 = 200 ÷ 10 = 20.",
    passos: [
      "10% = 10/100 = 1/10.",
      "1/10 de 200 = 200 ÷ 10.",
      "200 ÷ 10 = 20.",
      "Estável."
    ]
  },
  {
    afirmacao: "Um triângulo pode ter dois ângulos retos.",
    resposta: false,
    explicacao: "A soma dos ângulos internos de um triângulo é 180°; dois retos já somam 180°.",
    passos: [
      "Soma dos ângulos internos de qualquer triângulo = 180°.",
      "Dois ângulos retos: 90° + 90° = 180°.",
      "Sobraria 0° para o terceiro ângulo (impossível).",
      "Anomalia."
    ]
  },
  {
    afirmacao: "O número 0,5 é igual à fração 1/2.",
    resposta: true,
    explicacao: "0,5 = 5/10 = 1/2. Correto.",
    passos: [
      "0,5 significa 5 décimos = 5/10.",
      "Simplificar 5/10 dividindo por 5: 1/2.",
      "0,5 = 1/2. Estável."
    ]
  },
  {
    afirmacao: "A área de um retângulo de 4 cm por 6 cm é 24 cm².",
    resposta: true,
    explicacao: "Área = base × altura = 4 × 6 = 24 cm².",
    passos: [
      "Área do retângulo = base × altura.",
      "4 × 6 = 24.",
      "Unidade: cm².",
      "Estável."
    ]
  },
  {
    afirmacao: "O menor número primo é 2.",
    resposta: true,
    explicacao: "2 é o menor primo e o único par.",
    passos: [
      "Primos: 2, 3, 5, 7, 11…",
      "O 1 não é primo.",
      "O primeiro da lista é o 2.",
      "Estável."
    ]
  },
  {
    afirmacao: "3/4 é maior que 0,8.",
    resposta: false,
    explicacao: "3/4 = 0,75, que é menor que 0,8.",
    passos: [
      "Converter 3/4 em decimal: 3 ÷ 4 = 0,75.",
      "Comparar 0,75 com 0,8.",
      "0,75 < 0,8, logo a afirmação é falsa.",
      "Anomalia."
    ]
  },
  {
    afirmacao: "A soma dos ângulos internos de um quadrilátero é 360°.",
    resposta: true,
    explicacao: "Todo quadrilátero tem soma dos ângulos internos igual a 360°.",
    passos: [
      "Um quadrilátero pode ser dividido em 2 triângulos.",
      "Cada triângulo soma 180°.",
      "2 × 180° = 360°.",
      "Estável."
    ]
  },
  {
    afirmacao: "O resultado de 100 ÷ 4 é 20.",
    resposta: false,
    explicacao: "100 ÷ 4 = 25, e não 20.",
    passos: [
      "Dividir 100 por 4.",
      "4 × 25 = 100.",
      "Portanto 100 ÷ 4 = 25.",
      "25 ≠ 20 → anomalia."
    ]
  }
];

const CONFIG = {
  totalCircuitos: 10,
  tempoPorCircuito: 20,
  celulasIniciais: 3,
  wattsPorAcerto: 15,
  bonusRapido: 10,
  tempoBonus: 6,
  acertosPorPeca: 2,
  usosLente: 3,
  usosBateria: 1,
  usosEsquadro: 2,
  tempoExtraEsquadro: 10
};

const PECAS = [
  { id: "engrenagem", nome: "Engrenagem de Bronze", icone: "⚙️" },
  { id: "cristal",    nome: "Cristal de Plasma",     icone: "💎" },
  { id: "voltimetro", nome: "Voltímetro de Precisão", icone: "🔋" },
  { id: "micro",      nome: "Microprocessador Lógico", icone: "🧠" },
  { id: "nucleo",     nome: "Núcleo Quantum",         icone: "🔮" }
];

let estado = {
  circuitos: [],
  indice: 0,
  watts: 0,
  celulas: CONFIG.celulasIniciais,
  acertos: 0,
  erros: 0,
  tempoRestante: CONFIG.tempoPorCircuito,
  intervaloTimer: null,
  travado: false,
  bonusRapidoUsado: false,
  pecasConquistadas: 0,
  usosLente: CONFIG.usosLente,
  usosBateria: CONFIG.usosBateria,
  usosEsquadro: CONFIG.usosEsquadro,
  bateriaAtiva: false
};

const telaInicio = document.getElementById('tela-inicio');
const telaJogo   = document.getElementById('tela-jogo');
const telaFim    = document.getElementById('tela-fim');

const hudEnergia   = document.getElementById('hud-energia');
const hudWatts     = document.getElementById('hud-watts');
const hudProgresso = document.getElementById('hud-progresso');

const ponteiro        = document.getElementById('ponteiro');
const statusMaquina   = document.getElementById('status-maquina');
const pressaoLeitura  = document.getElementById('pressao-leitura');

const numeroPergunta = document.getElementById('numero-pergunta');
const afirmacaoEl    = document.getElementById('afirmacao');

const barraPreench = document.getElementById('barra-preenchimento');
const tempoTexto   = document.getElementById('tempo-texto');

const btnEstavel = document.getElementById('btn-estavel');
const btnAnomalia = document.getElementById('btn-anomalia');
const btnsResposta = [btnEstavel, btnAnomalia];

const cadernetaConteudo = document.getElementById('caderneta-conteudo');

const toolLente    = document.getElementById('tool-lente');
const toolBateria  = document.getElementById('tool-bateria');
const toolEsquadro = document.getElementById('tool-esquadro');
const usosLenteEl    = document.getElementById('usos-lente');
const usosBateriaEl  = document.getElementById('usos-bateria');
const usosEsquadroEl = document.getElementById('usos-esquadro');

const feedbackEl = document.getElementById('feedback');

const slotsEl        = document.getElementById('slots');
const bancadaContador = document.getElementById('bancada-contador');
const avisoPeca      = document.getElementById('aviso-peca');

const btnComecar   = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const tituloFim    = document.getElementById('titulo-fim');
const mensagemFim  = document.getElementById('mensagem-fim');
const fimWatts     = document.getElementById('fim-watts');
const fimAcertos   = document.getElementById('fim-acertos');
const fimErros     = document.getElementById('fim-erros');
const pecasFinais  = document.getElementById('pecas-finais');
const nucleoVisual = document.getElementById('nucleo-visual');
const maquinaEl    = document.getElementById('maquina');
const faiscasEl    = document.getElementById('faiscas');

/* ============================================================
   ÁUDIO — WEB AUDIO API
   ============================================================ */
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      audioCtx = null;
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function tocarTom(freq, dur, tipo, vol) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = tipo || 'sine';
  osc.frequency.value = freq;
  gain.gain.value = vol || 0.08;
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}

function somEngrenagem() {
  if (!audioCtx) return;
  for (let i = 0; i < 6; i++) {
    setTimeout(() => tocarTom(90 + i * 18, 0.06, 'square', 0.05), i * 45);
  }
}

function somBipAcerto() {
  if (!audioCtx) return;
  tocarTom(880, 0.09, 'sine', 0.1);
  setTimeout(() => tocarTom(1320, 0.13, 'sine', 0.09), 100);
}

function somErro() {
  if (!audioCtx) return;
  tocarTom(200, 0.18, 'sawtooth', 0.09);
  setTimeout(() => tocarTom(140, 0.24, 'sawtooth', 0.08), 120);
}

function somVapor() {
  if (!audioCtx) return;
  const dur = 0.5;
  const bufferSize = audioCtx.sampleRate * dur;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.12;
  const filtro = audioCtx.createBiquadFilter();
  filtro.type = 'highpass';
  filtro.frequency.value = 1200;
  src.connect(filtro);
  filtro.connect(gain);
  gain.connect(audioCtx.destination);
  src.start();
}

function somFaisca() {
  if (!audioCtx) return;
  tocarTom(1800, 0.05, 'square', 0.06);
  setTimeout(() => tocarTom(2400, 0.04, 'square', 0.05), 40);
  setTimeout(() => tocarTom(900, 0.06, 'square', 0.04), 90);
}

function somFerramenta() {
  if (!audioCtx) return;
  tocarTom(600, 0.07, 'triangle', 0.08);
  setTimeout(() => tocarTom(900, 0.09, 'triangle', 0.07), 80);
}

function somPeca() {
  if (!audioCtx) return;
  tocarTom(523, 0.1, 'sine', 0.09);
  setTimeout(() => tocarTom(659, 0.1, 'sine', 0.09), 90);
  setTimeout(() => tocarTom(784, 0.16, 'sine', 0.1), 180);
}

/* ============================================================
   FUNÇÕES AUXILIARES
   ============================================================ */
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
  hudEnergia.textContent = '⚡'.repeat(Math.max(0, estado.celulas)) +
                            '·'.repeat(Math.max(0, CONFIG.celulasIniciais - estado.celulas));
  hudWatts.textContent = estado.watts;
  hudProgresso.textContent = String(estado.indice + 1).padStart(2, '0') + '/' +
                              String(CONFIG.totalCircuitos).padStart(2, '0');
}

function atualizarBarraTempo() {
  const pct = (estado.tempoRestante / CONFIG.tempoPorCircuito) * 100;
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

function moverPonteiro(percentual) {
  // -90° = esquerda (ANOMALIA) | +90° = direita (ESTÁVEL)
  const angulo = -90 + (percentual / 100) * 180;
  ponteiro.style.transform = `rotate(${angulo}deg)`;
}

function resetarPonteiro() {
  moverPonteiro(50);
  statusMaquina.textContent = 'AGUARDANDO LEITURA';
  statusMaquina.style.color = 'var(--neon-azul)';
  pressaoLeitura.textContent = 'Pressão: 50%';
}

function atualizarFerramentas() {
  usosLenteEl.textContent = estado.usosLente;
  usosBateriaEl.textContent = estado.usosBateria;
  usosEsquadroEl.textContent = estado.usosEsquadro;

  toolLente.disabled = estado.usosLente <= 0 || estado.travado;
  toolBateria.disabled = estado.usosBateria <= 0 || estado.bateriaAtiva;
  toolEsquadro.disabled = estado.usosEsquadro <= 0 || estado.travado;
}

function limparCaderneta() {
  cadernetaConteudo.innerHTML = '<p class="caderneta-vazia">Use a Lente de Análise Lógica para revelar o passo a passo do cálculo.</p>';
}

function mostrarPassos(pergunta) {
  cadernetaConteudo.innerHTML = '';
  pergunta.passos.forEach((passo, i) => {
    const p = document.createElement('span');
    p.className = 'passo-calculo';
    if (i === pergunta.passos.length - 1) p.classList.add('passo-resultado');
    p.textContent = passo;
    cadernetaConteudo.appendChild(p);
  });
}

function construirSlots() {
  slotsEl.innerHTML = '';
  for (let i = 0; i < PECAS.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.index = i;
    slot.textContent = '🔩';
    slotsEl.appendChild(slot);
  }
  atualizarBancada();
}

function atualizarBancada() {
  bancadaContador.textContent = `${estado.pecasConquistadas}/${PECAS.length}`;
  const slots = slotsEl.querySelectorAll('.slot');
  slots.forEach((slot, i) => {
    if (i < estado.pecasConquistadas) {
      slot.classList.add('preenchido');
      slot.textContent = PECAS[i].icone;
      slot.title = PECAS[i].nome;
    } else {
      slot.classList.remove('preenchido');
      slot.textContent = '🔩';
      slot.title = 'Slot vazio';
    }
  });
}

function concederPeca() {
  const idx = estado.pecasConquistadas;
  if (idx >= PECAS.length) return;
  estado.pecasConquistadas++;
  atualizarBancada();
  avisoPeca.textContent = `🔧 Peça conquistada: ${PECAS[idx].nome}!`;
  somPeca();
  setTimeout(() => { avisoPeca.textContent = ''; }, 2500);
}

/* ============================================================
   FLUXO DO JOGO
   ============================================================ */
function iniciarJogo() {
  initAudio();

  estado = {
    circuitos: embaralhar(BANCO_CIRCUITOS).slice(0, CONFIG.totalCircuitos),
    indice: 0,
    watts: 0,
    celulas: CONFIG.celulasIniciais,
    acertos: 0,
    erros: 0,
    tempoRestante: CONFIG.tempoPorCircuito,
    intervaloTimer: null,
    travado: false,
    bonusRapidoUsado: false,
    pecasConquistadas: 0,
    usosLente: CONFIG.usosLente,
    usosBateria: CONFIG.usosBateria,
    usosEsquadro: CONFIG.usosEsquadro,
    bateriaAtiva: false
  };

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  avisoPeca.textContent = '';
  limparCaderneta();
  construirSlots();
  resetarPonteiro();

  mostrarTela(telaJogo);
  carregarCircuito();
}

function carregarCircuito() {
  limparTimer();

  if (estado.indice >= CONFIG.totalCircuitos || estado.celulas <= 0) {
    finalizarJogo();
    return;
  }

  estado.travado = false;
  estado.bonusRapidoUsado = false;
  estado.bateriaAtiva = false;
  travarBotoes(false);

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  btnsResposta.forEach(b => b.classList.remove('correto', 'errado'));

  const pergunta = estado.circuitos[estado.indice];
  afirmacaoEl.textContent = pergunta.afirmacao;
  numeroPergunta.textContent = `CIRCUITO ${String(estado.indice + 1).padStart(2, '0')} / ${CONFIG.totalCircuitos}`;

  atualizarHUD();
  atualizarFerramentas();
  resetarPonteiro();
  limparCaderneta();

  estado.tempoRestante = CONFIG.tempoPorCircuito;
  atualizarBarraTempo();

  estado.intervaloTimer = setInterval(() => {
    estado.tempoRestante--;
    atualizarBarraTempo();

    if (estado.tempoRestante <= 0) {
      limparTimer();
      responder(null);
    }
  }, 1000);
}

function responder(respostaUsuario) {
  if (estado.travado) return;
  estado.travado = true;
  limparTimer();
  atualizarFerramentas();

  const pergunta = estado.circuitos[estado.indice];
  const tempoUsado = CONFIG.tempoPorCircuito - estado.tempoRestante;

  travarBotoes(true);

  // ----- TEMPO ESGOTADO -----
  if (respostaUsuario === null) {
    if (estado.bateriaAtiva) {
      estado.bateriaAtiva = false;
      estado.tempoRestante = 5;
      estado.travado = false;
      travarBotoes(false);
      feedbackEl.textContent = '🔋 Bateria absorveu o tempo esgotado! +5s de emergência.';
      feedbackEl.className = 'feedback info';
      iniciarTimer();
      return;
    }

    estado.erros++;
    estado.celulas--;
    estado.watts = Math.max(0, estado.watts - 5);

    feedbackEl.textContent = `⏰ Tempo esgotado! ${pergunta.explicacao}`;
    feedbackEl.className = 'feedback erro';

    const btnCorreto = pergunta.resposta ? btnEstavel : btnAnomalia;
    btnCorreto.classList.add('correto');

    moverPonteiro(pergunta.resposta ? 100 : 0);
    statusMaquina.textContent = pergunta.resposta ? 'SISTEMA ESTÁVEL' : 'SOBRECARGA';
    statusMaquina.style.color = pergunta.resposta ? 'var(--neon-verde)' : 'var(--neon-vermelho)';
    pressaoLeitura.textContent = `Pressão: ${pergunta.resposta ? 100 : 0}%`;

    somErro();
    atualizarHUD();
    avancar();
    return;
  }

  // ----- RESPOSTA DO JOGADOR -----
  const acertou = respostaUsuario === pergunta.resposta;

  if (acertou) {
    estado.acertos++;

    let wattsGanhos = CONFIG.wattsPorAcerto;
    let bonus = '';
    if (tempoUsado <= CONFIG.tempoBonus) {
      wattsGanhos += CONFIG.bonusRapido;
      bonus = ` +${CONFIG.bonusRapido}W bônus rápido! 🔥`;
    }
    estado.watts += wattsGanhos;

    feedbackEl.textContent = `✅ Circuito estável! +${wattsGanhos}W${bonus}`;
    feedbackEl.className = 'feedback sucesso';

    const btnClicado = respostaUsuario ? btnEstavel : btnAnomalia;
    btnClicado.classList.add('correto');

    moverPonteiro(respostaUsuario ? 100 : 0);
    statusMaquina.textContent = respostaUsuario ? 'SISTEMA ESTÁVEL' : 'SOBRECARGA DETECTADA';
    statusMaquina.style.color = respostaUsuario ? 'var(--neon-verde)' : 'var(--neon-vermelho)';
    pressaoLeitura.textContent = `Pressão: ${respostaUsuario ? 100 : 0}%`;

    somBipAcerto();
    somEngrenagem();

    if (estado.acertos % CONFIG.acertosPorPeca === 0) {
      setTimeout(concederPeca, 350);
    }
  } else {
    if (estado.bateriaAtiva) {
      estado.bateriaAtiva = false;
      feedbackEl.textContent = `🔋 Bateria de Emergência absorveu o erro! ${pergunta.explicacao}`;
      feedbackEl.className = 'feedback info';

      const btnCorreto = pergunta.resposta ? btnEstavel : btnAnomalia;
      btnCorreto.classList.add('correto');

      moverPonteiro(pergunta.resposta ? 100 : 0);
      statusMaquina.textContent = pergunta.resposta ? 'SISTEMA ESTÁVEL' : 'SOBRECARGA';
      statusMaquina.style.color = pergunta.resposta ? 'var(--neon-verde)' : 'var(--neon-vermelho)';
      pressaoLeitura.textContent = `Pressão: ${pergunta.resposta ? 100 : 0}%`;

      somFerramenta();
      atualizarHUD();
      avancar();
      return;
    }

    estado.erros++;
    estado.celulas--;
    estado.watts = Math.max(0, estado.watts - 5);

    feedbackEl.textContent = `❌ Anomalia não detectada! ${pergunta.explicacao}`;
    feedbackEl.className = 'feedback erro';

    const btnClicado = respostaUsuario ? btnEstavel : btnAnomalia;
    const btnCorreto = pergunta.resposta ? btnEstavel : btnAnomalia;
    btnClicado.classList.add('errado');
    if (btnCorreto !== btnClicado) btnCorreto.classList.add('correto');

    moverPonteiro(pergunta.resposta ? 100 : 0);
    statusMaquina.textContent = pergunta.resposta ? 'SISTEMA ESTÁVEL' : 'SOBRECARGA';
    statusMaquina.style.color = pergunta.resposta ? 'var(--neon-verde)' : 'var(--neon-vermelho)';
    pressaoLeitura.textContent = `Pressão: ${pergunta.resposta ? 100 : 0}%`;

    somErro();
    somVapor();
  }

  atualizarHUD();
  avancar();
}

function iniciarTimer() {
  limparTimer();
  estado.intervaloTimer = setInterval(() => {
    estado.tempoRestante--;
    atualizarBarraTempo();
    if (estado.tempoRestante <= 0) {
      limparTimer();
      responder(null);
    }
  }, 1000);
}

function avancar() {
  setTimeout(() => {
    estado.indice++;

    if (estado.celulas <= 0) {
      finalizarJogo();
    } else if (estado.indice >= CONFIG.totalCircuitos) {
      finalizarJogo();
    } else {
      carregarCircuito();
    }
  }, 1800);
}

/* ============================================================
   FINALIZAR
   ============================================================ */
function finalizarJogo() {
  limparTimer();
  travarBotoes(true);

  const total = CONFIG.totalCircuitos;
  const pct = (estado.acertos / total) * 100;

  fimWatts.textContent = estado.watts;
  fimAcertos.textContent = estado.acertos;
  fimErros.textContent = estado.erros;

  pecasFinais.innerHTML = '';
  for (let i = 0; i < estado.pecasConquistadas; i++) {
    const tag = document.createElement('span');
    tag.className = 'peca-final';
    tag.textContent = `${PECAS[i].icone} ${PECAS[i].nome}`;
    pecasFinais.appendChild(tag);
  }

  if (estado.celulas <= 0 && estado.indice < total) {
    tituloFim.textContent = 'Energia Esgotada!';
    mensagemFim.textContent = `A máquina parou no circuito ${estado.indice + 1}. Recalibre os cálculos e tente novamente!`;
    nucleoVisual.textContent = '🔒';
    nucleoVisual.classList.remove('ativo');
  } else if (pct === 100) {
    tituloFim.textContent = 'Máquina Reativada com Perfeição!';
    mensagemFim.textContent = 'Você calibrou todos os circuitos sem erros. A cidade brilha novamente! 🏆';
    nucleoVisual.textContent = '💠';
    nucleoVisual.classList.add('ativo');
    gerarFaiscas(30);
  } else if (pct >= 70) {
    tituloFim.textContent = 'Máquina Reativada!';
    mensagemFim.textContent = 'A energia voltou! Excelente trabalho de engenharia. Ainda há espaço para calibrar melhor.';
    nucleoVisual.textContent = '🔷';
    nucleoVisual.classList.add('ativo');
    gerarFaiscas(20);
  } else if (pct >= 50) {
    tituloFim.textContent = 'Máquina Parcialmente Estável';
    mensagemFim.textContent = 'A máquina ligou, mas alguns circuitos ainda oscilam. Continue praticando!';
    nucleoVisual.textContent = '🔹';
    nucleoVisual.classList.remove('ativo');
  } else {
    tituloFim.textContent = 'Máquina Precisa de Reparos';
    mensagemFim.textContent = 'A energia não foi restaurada por completo. Revise os cálculos e volte à oficina!';
    nucleoVisual.textContent = '🔒';
    nucleoVisual.classList.remove('ativo');
  }

  mostrarTela(telaFim);
}

function gerarFaiscas(qtd) {
  faiscasEl.innerHTML = '';
  for (let i = 0; i < qtd; i++) {
    const f = document.createElement('span');
    f.className = 'faisca';
    f.style.left = (20 + Math.random() * 60) + '%';
    f.style.top = (20 + Math.random() * 60) + '%';
    f.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    f.style.setProperty('--dy', (-Math.random() * 100 - 30) + 'px');
    f.style.animationDelay = (Math.random() * 0.6) + 's';
    const cores = ['var(--neon-azul)', 'var(--neon-ambar)', 'var(--neon-verde)', 'var(--neon-roxo)'];
    f.style.background = cores[Math.floor(Math.random() * cores.length)];
    faiscasEl.appendChild(f);
  }
  somFaisca();
}

/* ============================================================
   FERRAMENTAS DO ENGENHEIRO
   ============================================================ */
toolLente.addEventListener('click', () => {
  if (estado.travado || estado.usosLente <= 0) return;
  initAudio();
  estado.usosLente--;
  const pergunta = estado.circuitos[estado.indice];
  mostrarPassos(pergunta);
  feedbackEl.textContent = '🔍 Lente de Análise Lógica ativada!';
  feedbackEl.className = 'feedback info';
  somFerramenta();
  atualizarFerramentas();
});

toolBateria.addEventListener('click', () => {
  if (estado.bateriaAtiva || estado.usosBateria <= 0) return;
  initAudio();
  estado.usosBateria--;
  estado.bateriaAtiva = true;
  feedbackEl.textContent = '⚡ Bateria de Emergência carregada! O próximo erro será absorvido.';
  feedbackEl.className = 'feedback info';
  somFerramenta();
  atualizarFerramentas();
});

toolEsquadro.addEventListener('click', () => {
  if (estado.travado || estado.usosEsquadro <= 0) return;
  initAudio();
  estado.usosEsquadro--;
  estado.tempoRestante += CONFIG.tempoExtraEsquadro;
  atualizarBarraTempo();
  feedbackEl.textContent = `📐 Esquadro de Precisão: +${CONFIG.tempoExtraEsquadro}s para análise!`;
  feedbackEl.className = 'feedback info';
  somFerramenta();
  atualizarFerramentas();
});

/* ============================================================
   EVENTOS GERAIS
   ============================================================ */
btnComecar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', iniciarJogo);

btnEstavel.addEventListener('click', () => responder(true));
btnAnomalia.addEventListener('click', () => responder(false));

document.addEventListener('keydown', (e) => {
  if (!telaJogo.classList.contains('ativa') || estado.travado) return;

  const tecla = e.key.toLowerCase();
  if (tecla === 'e' || e.key === 'ArrowLeft') {
    responder(true);
  } else if (tecla === 'a' || e.key === 'ArrowRight') {
    responder(false);
  } else if (tecla === '1') {
    toolLente.click();
  } else if (tecla === '2') {
    toolBateria.click();
  } else if (tecla === '3') {
    toolEsquadro.click();
  }
});

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
resetarPonteiro();
limparCaderneta();
construirSlots();