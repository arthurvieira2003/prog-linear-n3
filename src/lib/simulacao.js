"use client";

export const simularPartida = (timeA, timeB, eliminatoria = false) => {
  const diferencaForca = Math.abs(timeA.forca - timeB.forca);

  if (eliminatoria) {
    const resultadoTempoNormal = simularPartidaComGols(timeA, timeB);
    const golsTempoNormalA = resultadoTempoNormal.golsA;
    const golsTempoNormalB = resultadoTempoNormal.golsB;

    if (golsTempoNormalA !== golsTempoNormalB) {
      return {
        vencedor: golsTempoNormalA > golsTempoNormalB ? timeA : timeB,
        perdedor: golsTempoNormalA > golsTempoNormalB ? timeB : timeA,
        empate: false,
        gols: {
          tempoNormal: [golsTempoNormalA, golsTempoNormalB],
        },
      };
    }

    const probVitoriaAProrroga =
      0.25 + (timeA.forca > timeB.forca ? diferencaForca * 0.005 : 0);
    const probEmpateProrrogacao = 0.5;

    const randomProrrogacao = Math.random();

    if (randomProrrogacao < probVitoriaAProrroga) {
      return {
        vencedor: timeA,
        perdedor: timeB,
        empate: false,
        gols: {
          tempoNormal: [golsTempoNormalA, golsTempoNormalB],
          prorrogacao: [1, 0],
        },
      };
    } else if (
      randomProrrogacao <
      probVitoriaAProrroga + probEmpateProrrogacao
    ) {
      const basePenaltiA = 3;
      const basePenaltiB = 3;

      const adicionalA = Math.floor((Math.random() * timeA.forca) / 50);
      const adicionalB = Math.floor((Math.random() * timeB.forca) / 50);

      const penaltiRandomA = Math.floor(Math.random() * 2);
      const penaltiRandomB = Math.floor(Math.random() * 2);

      let penaltisA = basePenaltiA + adicionalA;
      let penaltisB = basePenaltiB + adicionalB;

      if (penaltisA === penaltisB) {
        if (penaltiRandomA > penaltiRandomB) {
          penaltisA += 1;
        } else {
          penaltisB += 1;
        }
      }

      return {
        vencedor: penaltisA > penaltisB ? timeA : timeB,
        perdedor: penaltisA > penaltisB ? timeB : timeA,
        empate: false,
        gols: {
          tempoNormal: [golsTempoNormalA, golsTempoNormalB],
          prorrogacao: [0, 0],
        },
        penaltis: {
          timeA: penaltisA,
          timeB: penaltisB,
        },
      };
    } else {
      return {
        vencedor: timeB,
        perdedor: timeA,
        empate: false,
        gols: {
          tempoNormal: [golsTempoNormalA, golsTempoNormalB],
          prorrogacao: [0, 1],
        },
      };
    }
  }

  let probVitoriaTimeA = 0.35;
  let probEmpate = 0.3;

  if (timeA.forca > timeB.forca) {
    probVitoriaTimeA += diferencaForca * 0.0075;
  } else if (timeB.forca > timeA.forca) {
    probVitoriaTimeA -= diferencaForca * 0.0075;
  }

  probVitoriaTimeA = Math.max(0.15, Math.min(0.75, probVitoriaTimeA));

  probEmpate = Math.max(0.1, 0.3 - diferencaForca * 0.005);

  const random = Math.random();
  let resultado;

  if (random < probVitoriaTimeA) {
    resultado = { vencedor: timeA, perdedor: timeB, empate: false };
  } else if (random < probVitoriaTimeA + probEmpate) {
    resultado = { empate: true, timeA, timeB };
  } else {
    resultado = { vencedor: timeB, perdedor: timeA, empate: false };
  }

  return resultado;
};

export const simularPartidaComGols = (timeA, timeB) => {
  const fatorAleatórioA = Math.floor(Math.random() * 25);
  const fatorAleatórioB = Math.floor(Math.random() * 25);

  const forcaEfetivaA = timeA.forca + fatorAleatórioA;
  const forcaEfetivaB = timeB.forca + fatorAleatórioB;

  let probVitoriaTimeA = 0.35;
  let probEmpate = 0.3;

  if (forcaEfetivaA > forcaEfetivaB) {
    probVitoriaTimeA += (forcaEfetivaA - forcaEfetivaB) * 0.006;
  } else if (forcaEfetivaB > forcaEfetivaA) {
    probVitoriaTimeA -= (forcaEfetivaB - forcaEfetivaA) * 0.006;
  }

  probVitoriaTimeA = Math.max(0.1, Math.min(0.75, probVitoriaTimeA));

  probEmpate = Math.max(
    0.1,
    0.3 - Math.abs(forcaEfetivaA - forcaEfetivaB) * 0.004
  );

  const gerarGols = (forca) => {
    const probabilidades = [0.35, 0.3, 0.2, 0.1, 0.03, 0.02];

    const forcaNormalizada = Math.min(99, Math.max(50, forca)) - 50;
    const ajuste = forcaNormalizada / 100;

    probabilidades[0] -= ajuste * 0.2;
    probabilidades[1] -= ajuste * 0.05;
    probabilidades[2] += ajuste * 0.05;
    probabilidades[3] += ajuste * 0.1;
    probabilidades[4] += ajuste * 0.07;
    probabilidades[5] += ajuste * 0.03;

    const random = Math.random();
    let acumulado = 0;

    for (let i = 0; i < probabilidades.length; i++) {
      acumulado += probabilidades[i];
      if (random <= acumulado) {
        if (i === 5) {
          return 5 + Math.floor(Math.random() * 3);
        }
        return i;
      }
    }

    return 0;
  };

  const random = Math.random();
  let resultado, golsA, golsB;

  if (random < probVitoriaTimeA) {
    golsA = gerarGols(forcaEfetivaA);

    const maxGolsB = Math.max(0, golsA - 1);
    golsB = maxGolsB === 0 ? 0 : Math.floor(Math.random() * (maxGolsB + 1));

    if (golsA <= golsB) golsA = golsB + 1;

    resultado = { vencedor: timeA, perdedor: timeB, empate: false };
  } else if (random < probVitoriaTimeA + probEmpate) {
    const golsEmpate = Math.floor(Math.random() * 4);
    golsA = golsEmpate;
    golsB = golsEmpate;

    resultado = { empate: true, timeA, timeB };
  } else {
    golsB = gerarGols(forcaEfetivaB);

    const maxGolsA = Math.max(0, golsB - 1);
    golsA = maxGolsA === 0 ? 0 : Math.floor(Math.random() * (maxGolsA + 1));

    if (golsB <= golsA) golsB = golsA + 1;

    resultado = { vencedor: timeB, perdedor: timeA, empate: false };
  }

  return {
    ...resultado,
    golsA,
    golsB,
    pontuacaoA: resultado.empate ? 1 : resultado.vencedor === timeA ? 3 : 0,
    pontuacaoB: resultado.empate ? 1 : resultado.vencedor === timeB ? 3 : 0,
  };
};

export const simularBrasileirao = (times) => {
  const tabela = times.map((time) => ({
    ...time,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
  }));

  const partidas = [];

  for (let i = 0; i < tabela.length; i++) {
    for (let j = 0; j < tabela.length; j++) {
      if (i !== j) {
        const timeA = tabela[i];
        const timeB = tabela[j];

        const resultado = simularPartidaComGols(timeA, timeB);

        timeA.pontos += resultado.pontuacaoA;
        timeA.jogos += 1;
        timeA.golsPro += resultado.golsA;
        timeA.golsContra += resultado.golsB;

        timeB.pontos += resultado.pontuacaoB;
        timeB.jogos += 1;
        timeB.golsPro += resultado.golsB;
        timeB.golsContra += resultado.golsA;

        if (resultado.empate) {
          timeA.empates += 1;
          timeB.empates += 1;
        } else if (resultado.vencedor === timeA) {
          timeA.vitorias += 1;
          timeB.derrotas += 1;
        } else {
          timeA.derrotas += 1;
          timeB.vitorias += 1;
        }

        timeA.saldoGols = timeA.golsPro - timeA.golsContra;
        timeB.saldoGols = timeB.golsPro - timeB.golsContra;

        partidas.push({
          timeA: timeA.nome,
          timeB: timeB.nome,
          golsA: resultado.golsA,
          golsB: resultado.golsB,
          vencedor: resultado.empate ? "Empate" : resultado.vencedor.nome,
        });
      }
    }
  }

  tabela.sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
    if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
    return b.golsPro - a.golsPro;
  });

  return {
    tabela,
    partidas,
    campeao: tabela[0],
  };
};

export function simularBrasileiraoDetalhado(times) {
  const timesComPontos = times.map((time) => ({
    ...time,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
  }));

  const posicoesAtacantes = [
    "Centroavante",
    "Ponta-direita",
    "Ponta-esquerda",
    "Segundo Atacante",
    "Atacante",
    "Centroavante",
    "Atacante",
    "Ponta",
  ];

  const posicoesMeias = [
    "Meia-atacante",
    "Meia Central",
    "Meia",
    "Meia-armador",
    "Meio-campista",
    "Meia Ofensivo",
    "Meia de Ligação",
  ];

  const numerosAtacantes = [9, 7, 11, 19, 99, 90, 10, 77, 17, 21, 23];

  const numerosMeias = [8, 10, 16, 18, 20, 22, 5, 6, 15, 25];

  const artilheiros = [];

  const gerarNomeAtacante = (numeroCamisa) => {
    const posicao =
      posicoesAtacantes[Math.floor(Math.random() * posicoesAtacantes.length)];
    return `${posicao} #${numeroCamisa}`;
  };

  const gerarNomeMeia = (numeroCamisa) => {
    const posicao =
      posicoesMeias[Math.floor(Math.random() * posicoesMeias.length)];
    return `${posicao} #${numeroCamisa}`;
  };

  const obterNumerosUnicos = (time, quantidade, listaNumeros) => {
    const numeros = [...listaNumeros];
    const numerosEscolhidos = [];

    for (let i = 0; i < quantidade; i++) {
      if (numeros.length === 0) {
        let novoNumero;
        do {
          novoNumero = Math.floor(Math.random() * 99) + 1;
        } while (numerosEscolhidos.includes(novoNumero));

        numerosEscolhidos.push(novoNumero);
      } else {
        const index = Math.floor(Math.random() * numeros.length);
        numerosEscolhidos.push(numeros[index]);
        numeros.splice(index, 1);
      }
    }

    return numerosEscolhidos;
  };

  timesComPontos.forEach((time) => {
    const numerosAtacanteTime = obterNumerosUnicos(time, 3, numerosAtacantes);

    for (let i = 0; i < 3; i++) {
      artilheiros.push({
        id: `${time.id}-atacante-${i}`,
        nome: gerarNomeAtacante(numerosAtacanteTime[i]),
        timeId: time.id,
        timeNome: time.nome,
        timeEscudo: time.escudo,
        gols: 0,
        habilidade: Math.min(
          99,
          time.forca + Math.floor(Math.random() * 10) - 5
        ),
      });
    }

    const numerosMeiaTime = obterNumerosUnicos(time, 4, numerosMeias);

    for (let i = 0; i < 4; i++) {
      artilheiros.push({
        id: `${time.id}-meia-${i}`,
        nome: gerarNomeMeia(numerosMeiaTime[i]),
        timeId: time.id,
        timeNome: time.nome,
        timeEscudo: time.escudo,
        gols: 0,
        habilidade: Math.min(
          99,
          time.forca - 10 + Math.floor(Math.random() * 15) - 5
        ),
      });
    }
  });

  const totalTimes = timesComPontos.length;
  const totalRodadas = (totalTimes - 1) * 2;
  const rodadas = Array.from({ length: totalRodadas }, () => []);

  function gerarRodadas() {
    const timesCopia = [...timesComPontos];

    if (timesCopia.length % 2 !== 0) {
      timesCopia.push(null);
    }

    const n = timesCopia.length;

    for (let rodada = 0; rodada < n - 1; rodada++) {
      for (let i = 0; i < n / 2; i++) {
        const timeA = timesCopia[i];
        const timeB = timesCopia[n - 1 - i];

        if (timeA !== null && timeB !== null) {
          const mandante = rodada % 2 === 0 ? timeA : timeB;
          const visitante = rodada % 2 === 0 ? timeB : timeA;

          rodadas[rodada].push({
            mandante,
            visitante,
            placar: { mandante: 0, visitante: 0 },
            golsMarcados: [],
            turno: 1,
          });
        }
      }

      timesCopia.splice(1, 0, timesCopia.pop());
    }

    for (let rodada = 0; rodada < n - 1; rodada++) {
      const jogosTurno1 = rodadas[rodada];

      jogosTurno1.forEach((jogo) => {
        const jogoReturno = {
          mandante: jogo.visitante,
          visitante: jogo.mandante,
          placar: { mandante: 0, visitante: 0 },
          golsMarcados: [],
          turno: 2,
        };

        rodadas[rodada + n - 1].push(jogoReturno);
      });
    }
  }

  gerarRodadas();

  for (let rodadaIndex = 0; rodadaIndex < rodadas.length; rodadaIndex++) {
    for (
      let jogoIndex = 0;
      jogoIndex < rodadas[rodadaIndex].length;
      jogoIndex++
    ) {
      const jogo = rodadas[rodadaIndex][jogoIndex];
      const mandante = jogo.mandante;
      const visitante = jogo.visitante;

      const resultado = simularJogo(mandante, visitante);
      jogo.placar.mandante = resultado.golsMandante;
      jogo.placar.visitante = resultado.golsVisitante;

      const golsMarcados = [];

      for (let g = 0; g < resultado.golsMandante; g++) {
        const jogadoresTime = artilheiros.filter(
          (j) => j.timeId === mandante.id
        );

        const pesoTotal = jogadoresTime.reduce(
          (sum, j) => sum + j.habilidade,
          0
        );
        let random = Math.random() * pesoTotal;

        let marcador = jogadoresTime[0];
        let acumulado = 0;

        for (const jogador of jogadoresTime) {
          acumulado += jogador.habilidade;
          if (random <= acumulado) {
            marcador = jogador;
            break;
          }
        }

        const jogadorIndex = artilheiros.findIndex((j) => j.id === marcador.id);
        artilheiros[jogadorIndex].gols++;

        golsMarcados.push({
          jogador: artilheiros[jogadorIndex],
          time: "mandante",
        });
      }

      for (let g = 0; g < resultado.golsVisitante; g++) {
        const jogadoresTime = artilheiros.filter(
          (j) => j.timeId === visitante.id
        );

        const pesoTotal = jogadoresTime.reduce(
          (sum, j) => sum + j.habilidade,
          0
        );
        let random = Math.random() * pesoTotal;

        let marcador = jogadoresTime[0];
        let acumulado = 0;

        for (const jogador of jogadoresTime) {
          acumulado += jogador.habilidade;
          if (random <= acumulado) {
            marcador = jogador;
            break;
          }
        }

        const jogadorIndex = artilheiros.findIndex((j) => j.id === marcador.id);
        artilheiros[jogadorIndex].gols++;

        golsMarcados.push({
          jogador: artilheiros[jogadorIndex],
          time: "visitante",
        });
      }

      jogo.golsMarcados = golsMarcados;

      mandante.jogos++;
      mandante.golsPro += resultado.golsMandante;
      mandante.golsContra += resultado.golsVisitante;
      mandante.saldoGols = mandante.golsPro - mandante.golsContra;

      visitante.jogos++;
      visitante.golsPro += resultado.golsVisitante;
      visitante.golsContra += resultado.golsMandante;
      visitante.saldoGols = visitante.golsPro - visitante.golsContra;

      if (resultado.golsMandante > resultado.golsVisitante) {
        mandante.pontos += 3;
        mandante.vitorias++;
        visitante.derrotas++;
      } else if (resultado.golsMandante < resultado.golsVisitante) {
        visitante.pontos += 3;
        visitante.vitorias++;
        mandante.derrotas++;
      } else {
        mandante.pontos += 1;
        visitante.pontos += 1;
        mandante.empates++;
        visitante.empates++;
      }
    }
  }

  const rodasFormatadas = rodadas.map((rodada, rodadaIndex) => {
    return rodada.map((jogo) => {
      return {
        mandante: {
          id: jogo.mandante.id,
          nome: jogo.mandante.nome,
          escudo: jogo.mandante.escudo,
        },
        visitante: {
          id: jogo.visitante.id,
          nome: jogo.visitante.nome,
          escudo: jogo.visitante.escudo,
        },
        placar: jogo.placar,
        golsMarcados: jogo.golsMarcados,
        turno: jogo.turno,
      };
    });
  });

  const classificacao = [...timesComPontos].sort((a, b) => {
    if (a.pontos !== b.pontos) return b.pontos - a.pontos;
    if (a.vitorias !== b.vitorias) return b.vitorias - a.vitorias;
    if (a.saldoGols !== b.saldoGols) return b.saldoGols - a.saldoGols;
    if (a.golsPro !== b.golsPro) return b.golsPro - a.golsPro;
    return 0;
  });

  const artilheirosOrdenados = [...artilheiros].sort((a, b) => b.gols - a.gols);

  return {
    classificacao,
    rodadas: rodasFormatadas,
    artilheiros: artilheirosOrdenados,
  };
}

function simularJogo(mandante, visitante) {
  const vantagemCasa = 5;

  const aleatoriedadeMandante = Math.floor(Math.random() * 21);
  const aleatoriedadeVisitante = Math.floor(Math.random() * 21);

  const forcaMandante = mandante.forca + vantagemCasa + aleatoriedadeMandante;
  const forcaVisitante = visitante.forca + aleatoriedadeVisitante;

  let probVitoriaMandante = 0.45;
  let probEmpate = 0.25;

  const diferencaForca = forcaMandante - forcaVisitante;

  if (diferencaForca > 0) {
    probVitoriaMandante += diferencaForca * 0.01;
  } else {
    probVitoriaMandante += diferencaForca * 0.015;
  }

  probVitoriaMandante = Math.max(0.15, Math.min(0.8, probVitoriaMandante));

  probEmpate = Math.max(0.1, probEmpate - Math.abs(diferencaForca) * 0.005);

  const golsPorForca = (forca) => {
    const forcaNormalizada = Math.min(99, Math.max(50, forca)) / 100;

    const probs = [
      0.3 - forcaNormalizada * 0.15,
      0.35 - forcaNormalizada * 0.05,
      0.2 + forcaNormalizada * 0.05,
      0.1 + forcaNormalizada * 0.08,
      0.03 + forcaNormalizada * 0.05,
      0.02 + forcaNormalizada * 0.02,
    ];

    const random = Math.random();
    let acumulado = 0;

    for (let i = 0; i < probs.length; i++) {
      acumulado += probs[i];
      if (random <= acumulado) {
        if (i === 5) {
          return 5 + Math.floor(Math.random() * 3);
        }
        return i;
      }
    }

    return 1;
  };

  const random = Math.random();
  let golsMandante, golsVisitante;

  if (random < probVitoriaMandante) {
    golsMandante = golsPorForca(forcaMandante);
    golsVisitante =
      golsMandante > 0
        ? Math.min(golsMandante - 1, Math.floor(Math.random() * golsMandante))
        : 0;

    if (golsMandante <= golsVisitante) {
      golsMandante = golsVisitante + 1;
    }
  } else if (random < probVitoriaMandante + probEmpate) {
    const golsEmpate = Math.floor(Math.random() * 4);
    golsMandante = golsEmpate;
    golsVisitante = golsEmpate;
  } else {
    golsVisitante = golsPorForca(forcaVisitante);
    golsMandante =
      golsVisitante > 0
        ? Math.min(golsVisitante - 1, Math.floor(Math.random() * golsVisitante))
        : 0;

    if (golsVisitante <= golsMandante) {
      golsVisitante = golsMandante + 1;
    }
  }

  return {
    golsMandante,
    golsVisitante,
  };
}

export const simularMultiplosBrasileiroes = (
  times,
  numeroSimulacoes = 1000
) => {
  const estatisticas = times.map((time) => ({
    ...time,
    titulos: 0,
    segundosLugares: 0,
    terceirosLugares: 0,
    quartoLugares: 0,
    g4: 0,
    rebaixamentos: 0,
    probabilidadeTitulo: 0,
    probabilidadeG4: 0,
    probabilidadeRebaixamento: 0,
  }));

  for (let i = 0; i < numeroSimulacoes; i++) {
    const resultadoSimulacao = simularBrasileirao([...times]);
    const tabela = resultadoSimulacao.tabela;

    estatisticas.forEach((timeEstatistica) => {
      const posicao = tabela.findIndex((t) => t.id === timeEstatistica.id);

      if (posicao === 0) timeEstatistica.titulos++;
      if (posicao === 1) timeEstatistica.segundosLugares++;
      if (posicao === 2) timeEstatistica.terceirosLugares++;
      if (posicao === 3) timeEstatistica.quartoLugares++;

      if (posicao <= 3) {
        timeEstatistica.g4++;
      }

      if (posicao >= tabela.length - 4) {
        timeEstatistica.rebaixamentos++;
      }
    });
  }

  estatisticas.forEach((time) => {
    time.probabilidadeTitulo = (time.titulos / numeroSimulacoes) * 100;
    time.probabilidadeG4 = (time.g4 / numeroSimulacoes) * 100;
    time.probabilidadeRebaixamento =
      (time.rebaixamentos / numeroSimulacoes) * 100;
  });

  estatisticas.sort((a, b) => b.probabilidadeTitulo - a.probabilidadeTitulo);

  const simulacaoDetalhada = simularBrasileiraoDetalhado([...times]);

  return {
    times: estatisticas,
    simulacaoDetalhada,
  };
};

export const simularFaseGrupos = (grupos) => {
  const resultadosGrupos = {};

  grupos.forEach((grupo) => {
    const letraGrupo = grupo[0].grupo;

    resultadosGrupos[letraGrupo] = grupo.map((time) => ({
      ...time,
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsContra: 0,
      saldoGols: 0,
    }));
  });

  Object.keys(resultadosGrupos).forEach((letraGrupo) => {
    const timesGrupo = resultadosGrupos[letraGrupo];

    for (let i = 0; i < timesGrupo.length; i++) {
      for (let j = i + 1; j < timesGrupo.length; j++) {
        const timeA = timesGrupo[i];
        const timeB = timesGrupo[j];

        const resultado = simularPartidaComGols(timeA, timeB);

        timeA.pontos += resultado.pontuacaoA;
        timeA.jogos += 1;
        timeA.golsPro += resultado.golsA;
        timeA.golsContra += resultado.golsB;

        timeB.pontos += resultado.pontuacaoB;
        timeB.jogos += 1;
        timeB.golsPro += resultado.golsB;
        timeB.golsContra += resultado.golsA;

        if (resultado.empate) {
          timeA.empates += 1;
          timeB.empates += 1;
        } else if (resultado.vencedor === timeA) {
          timeA.vitorias += 1;
          timeB.derrotas += 1;
        } else {
          timeA.derrotas += 1;
          timeB.vitorias += 1;
        }

        timeA.saldoGols = timeA.golsPro - timeA.golsContra;
        timeB.saldoGols = timeB.golsPro - timeB.golsContra;
      }
    }

    resultadosGrupos[letraGrupo].sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
      if (b.golsPro !== a.golsPro) return b.golsPro - a.golsPro;
      return 0;
    });

    resultadosGrupos[letraGrupo].forEach((time) => {
      if (
        time.jogos === 0 ||
        (time.vitorias === 0 && time.empates === 0 && time.derrotas === 0)
      ) {
        console.error(
          `ERRO: Time ${time.nome} no grupo ${letraGrupo} ficou com estatísticas zeradas:`,
          time
        );
      }
    });
  });

  return resultadosGrupos;
};

export const simularFaseEliminatoria = (resultadosGrupos) => {
  const classificados = {};
  Object.keys(resultadosGrupos).forEach((grupo) => {
    classificados[grupo] = resultadosGrupos[grupo].slice(0, 2);
  });

  const oitavas = [
    { id: 1, timeA: classificados["A"][0], timeB: classificados["B"][1] },
    { id: 2, timeA: classificados["C"][0], timeB: classificados["D"][1] },
    { id: 3, timeA: classificados["E"][0], timeB: classificados["F"][1] },
    { id: 4, timeA: classificados["G"][0], timeB: classificados["H"][1] },
    { id: 5, timeA: classificados["B"][0], timeB: classificados["A"][1] },
    { id: 6, timeA: classificados["D"][0], timeB: classificados["C"][1] },
    { id: 7, timeA: classificados["F"][0], timeB: classificados["E"][1] },
    { id: 8, timeA: classificados["H"][0], timeB: classificados["G"][1] },
  ];

  const resultadosOitavas = oitavas.map((partida) => {
    const resultado = simularPartida(partida.timeA, partida.timeB, true);
    const resultadoPartida = {
      ...partida,
      resultado,
      vencedor: resultado.vencedor,
    };

    if (resultado.gols) {
      resultadoPartida.golsA =
        resultado.gols.tempoNormal[0] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[0] : 0);
      resultadoPartida.golsB =
        resultado.gols.tempoNormal[1] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[1] : 0);
    }

    if (resultado.penaltis) {
      resultadoPartida.penaltisA = resultado.penaltis.timeA;
      resultadoPartida.penaltisB = resultado.penaltis.timeB;
    }

    return resultadoPartida;
  });

  const quartas = [
    {
      id: 1,
      timeA: resultadosOitavas[0].vencedor,
      timeB: resultadosOitavas[1].vencedor,
    },
    {
      id: 2,
      timeA: resultadosOitavas[2].vencedor,
      timeB: resultadosOitavas[3].vencedor,
    },
    {
      id: 3,
      timeA: resultadosOitavas[4].vencedor,
      timeB: resultadosOitavas[5].vencedor,
    },
    {
      id: 4,
      timeA: resultadosOitavas[6].vencedor,
      timeB: resultadosOitavas[7].vencedor,
    },
  ];

  const resultadosQuartas = quartas.map((partida) => {
    const resultado = simularPartida(partida.timeA, partida.timeB, true);
    const resultadoPartida = {
      ...partida,
      resultado,
      vencedor: resultado.vencedor,
    };

    if (resultado.gols) {
      resultadoPartida.golsA =
        resultado.gols.tempoNormal[0] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[0] : 0);
      resultadoPartida.golsB =
        resultado.gols.tempoNormal[1] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[1] : 0);
    }

    if (resultado.penaltis) {
      resultadoPartida.penaltisA = resultado.penaltis.timeA;
      resultadoPartida.penaltisB = resultado.penaltis.timeB;
    }

    return resultadoPartida;
  });

  const semifinais = [
    {
      id: 1,
      timeA: resultadosQuartas[0].vencedor,
      timeB: resultadosQuartas[1].vencedor,
    },
    {
      id: 2,
      timeA: resultadosQuartas[2].vencedor,
      timeB: resultadosQuartas[3].vencedor,
    },
  ];

  const resultadosSemifinais = semifinais.map((partida) => {
    const resultado = simularPartida(partida.timeA, partida.timeB, true);
    const resultadoPartida = {
      ...partida,
      resultado,
      vencedor: resultado.vencedor,
      perdedor: resultado.perdedor,
    };

    if (resultado.gols) {
      resultadoPartida.golsA =
        resultado.gols.tempoNormal[0] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[0] : 0);
      resultadoPartida.golsB =
        resultado.gols.tempoNormal[1] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[1] : 0);
    }

    if (resultado.penaltis) {
      resultadoPartida.penaltisA = resultado.penaltis.timeA;
      resultadoPartida.penaltisB = resultado.penaltis.timeB;
    }

    return resultadoPartida;
  });

  const terceiroLugar = {
    timeA: resultadosSemifinais[0].perdedor,
    timeB: resultadosSemifinais[1].perdedor,
  };

  const resultadoTerceiroLugar = (() => {
    const resultado = simularPartida(
      terceiroLugar.timeA,
      terceiroLugar.timeB,
      true
    );
    const resultadoPartida = {
      ...terceiroLugar,
      resultado,
      vencedor: resultado.vencedor,
    };

    if (resultado.gols) {
      resultadoPartida.golsA =
        resultado.gols.tempoNormal[0] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[0] : 0);
      resultadoPartida.golsB =
        resultado.gols.tempoNormal[1] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[1] : 0);
    }

    if (resultado.penaltis) {
      resultadoPartida.penaltisA = resultado.penaltis.timeA;
      resultadoPartida.penaltisB = resultado.penaltis.timeB;
    }

    return resultadoPartida;
  })();

  const final = {
    timeA: resultadosSemifinais[0].vencedor,
    timeB: resultadosSemifinais[1].vencedor,
  };

  const resultadoFinal = (() => {
    const resultado = simularPartida(final.timeA, final.timeB, true);
    const resultadoPartida = {
      ...final,
      resultado,
      vencedor: resultado.vencedor,
    };

    if (resultado.gols) {
      resultadoPartida.golsA =
        resultado.gols.tempoNormal[0] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[0] : 0);
      resultadoPartida.golsB =
        resultado.gols.tempoNormal[1] +
        (resultado.gols.prorrogacao ? resultado.gols.prorrogacao[1] : 0);
    }

    if (resultado.penaltis) {
      resultadoPartida.penaltisA = resultado.penaltis.timeA;
      resultadoPartida.penaltisB = resultado.penaltis.timeB;
    }

    return resultadoPartida;
  })();

  return {
    oitavas: resultadosOitavas,
    quartas: resultadosQuartas,
    semifinais: resultadosSemifinais,
    terceiroLugar: resultadoTerceiroLugar,
    final: resultadoFinal,
    campeao: resultadoFinal.vencedor,
    vice: resultadoFinal.vencedor === final.timeA ? final.timeB : final.timeA,
    terceiro: resultadoTerceiroLugar.vencedor,
  };
};

export const simularCopaMundo = (times) => {
  const grupos = {};
  times.forEach((time) => {
    if (!grupos[time.grupo]) {
      grupos[time.grupo] = [];
    }
    grupos[time.grupo].push(time);
  });

  const gruposArray = Object.values(grupos);

  const resultadosGrupos = simularFaseGrupos(gruposArray);

  const resultadosEliminatorias = simularFaseEliminatoria(resultadosGrupos);

  return {
    faseGrupos: resultadosGrupos,
    faseEliminatoria: resultadosEliminatorias,
    campeao: resultadosEliminatorias.campeao,
    vice: resultadosEliminatorias.vice,
    terceiro: resultadosEliminatorias.terceiro,
  };
};

export const simularMultiplasCopas = (times, numSimulacoes) => {
  const estatisticas = times.map((time) => ({
    ...time,
    titulos: 0,
    vices: 0,
    terceiros: 0,
    semifinais: 0,
    quartas: 0,
    oitavas: 0,
    probabilidadeTitulo: 0,
    probabilidadePodio: 0,
    probabilidadeSemi: 0,
    probabilidadeQuartas: 0,
    probabilidadeOitavas: 0,
    probabilidadeVice: 0,
  }));

  for (let i = 0; i < numSimulacoes; i++) {
    const resultado = simularCopaMundo(times);

    resultado.faseEliminatoria.oitavas.forEach((partida) => {
      const timeA = estatisticas.find((t) => t.id === partida.timeA.id);
      const timeB = estatisticas.find((t) => t.id === partida.timeB.id);
      if (timeA) timeA.oitavas += 1;
      if (timeB) timeB.oitavas += 1;
    });

    resultado.faseEliminatoria.quartas.forEach((partida) => {
      const timeA = estatisticas.find((t) => t.id === partida.timeA.id);
      const timeB = estatisticas.find((t) => t.id === partida.timeB.id);
      if (timeA) timeA.quartas += 1;
      if (timeB) timeB.quartas += 1;
    });

    resultado.faseEliminatoria.semifinais.forEach((partida) => {
      const timeA = estatisticas.find((t) => t.id === partida.timeA.id);
      const timeB = estatisticas.find((t) => t.id === partida.timeB.id);
      if (timeA) timeA.semifinais += 1;
      if (timeB) timeB.semifinais += 1;
    });

    const campeao = estatisticas.find((t) => t.id === resultado.campeao.id);
    campeao.titulos += 1;

    const vice = estatisticas.find((t) => t.id === resultado.vice.id);
    vice.vices += 1;

    const terceiro = estatisticas.find((t) => t.id === resultado.terceiro.id);
    terceiro.terceiros += 1;
  }

  estatisticas.forEach((time) => {
    time.probabilidadeTitulo = (time.titulos / numSimulacoes) * 100;
    time.probabilidadeVice = (time.vices / numSimulacoes) * 100;
    time.probabilidadeSemi = (time.semifinais / numSimulacoes) * 100;
    time.probabilidadeQuartas = (time.quartas / numSimulacoes) * 100;
    time.probabilidadeOitavas = (time.oitavas / numSimulacoes) * 100;
    time.probabilidadePodio =
      ((time.titulos + time.vices + time.terceiros) / numSimulacoes) * 100;
  });

  estatisticas.sort((a, b) => b.probabilidadeTitulo - a.probabilidadeTitulo);

  return estatisticas;
};

export const simularChampionsLeague = (times) => {
  // Cada time joga 8 partidas, enfrentando 2 times de cada pote
  const jogos = gerarJogosChampions(times);

  // Simular os jogos da fase de liga
  const resultadosFaseLiga = simularFaseLigaChampions(jogos);

  // Classificar os times com base nos resultados
  const classificacao = classificarTimesChampions(resultadosFaseLiga);

  // Os 8 primeiros classificam direto para as oitavas
  const classificadosOitavas = classificacao.slice(0, 8);

  // Times entre 9º e 24º disputam playoff
  const classificadosPlayoff = classificacao.slice(8, 24);

  // Os demais são eliminados
  const eliminados = classificacao.slice(24);

  // Simular os playoffs
  const resultadosPlayoff = simularPlayoffChampions(classificadosPlayoff);

  // Juntar os classificados diretos com os vencedores dos playoffs
  const timesOitavas = [
    ...classificadosOitavas,
    ...resultadosPlayoff.classificados,
  ];

  // Simular as fases eliminatórias
  const resultadosEliminatorias =
    simularFasesEliminatoriasChampions(timesOitavas);

  return {
    faseLiga: {
      jogos,
      resultados: resultadosFaseLiga,
      classificacao,
    },
    playoff: resultadosPlayoff,
    eliminados,
    faseEliminatoria: resultadosEliminatorias,
    campeao: resultadosEliminatorias.campeao,
    vice: resultadosEliminatorias.vice,
  };
};

export const simularMultiplasChampions = (times, numSimulacoes = 1000) => {
  const estatisticas = times.map((time) => ({
    ...time,
    titulos: 0,
    vices: 0,
    semifinais: 0,
    quartas: 0,
    oitavas: 0,
    playoff: 0,
    top8: 0,
    eliminadoLiga: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    pontos: 0,
  }));

  let simulacaoDetalhada = null;

  for (let i = 0; i < numSimulacoes; i++) {
    const resultado = simularChampionsLeague(times);

    if (i === 0) {
      simulacaoDetalhada = resultado;
    }

    // Atualizar estatísticas do campeão
    const campeao = estatisticas.find((t) => t.id === resultado.campeao.id);
    campeao.titulos += 1;

    // Atualizar estatísticas do vice
    const vice = estatisticas.find((t) => t.id === resultado.vice.id);
    vice.vices += 1;

    // Atualizar estatísticas de semifinalistas
    resultado.faseEliminatoria.semifinalistas.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.semifinais += 1;
    });

    // Atualizar estatísticas de quartas de final
    resultado.faseEliminatoria.quartasFinalistas.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.quartas += 1;
    });

    // Atualizar estatísticas de oitavas de final
    resultado.faseEliminatoria.oitavasFinalistas.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.oitavas += 1;
    });

    // Atualizar estatísticas de playoff
    resultado.playoff.times.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.playoff += 1;
    });

    // Atualizar estatísticas de top 8
    resultado.faseLiga.classificacao.slice(0, 8).forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.top8 += 1;
    });

    // Atualizar estatísticas de eliminados na fase de liga
    resultado.eliminados.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.eliminadoLiga += 1;
    });

    // Atualizar estatísticas gerais de jogos
    resultado.faseLiga.classificacao.forEach((time) => {
      const timeEstatistica = estatisticas.find((t) => t.id === time.id);
      timeEstatistica.jogos += time.jogos;
      timeEstatistica.vitorias += time.vitorias;
      timeEstatistica.empates += time.empates;
      timeEstatistica.derrotas += time.derrotas;
      timeEstatistica.golsPro += time.golsPro;
      timeEstatistica.golsContra += time.golsContra;
      timeEstatistica.pontos += time.pontos;
    });
  }

  // Calcular probabilidades
  estatisticas.forEach((time) => {
    time.probabilidadeTitulo = (time.titulos / numSimulacoes) * 100;
    time.probabilidadeVice = (time.vices / numSimulacoes) * 100;
    time.probabilidadeSemi = (time.semifinais / numSimulacoes) * 100;
    time.probabilidadeQuartas = (time.quartas / numSimulacoes) * 100;
    time.probabilidadeOitavas = (time.oitavas / numSimulacoes) * 100;
    time.probabilidadePlayoff = (time.playoff / numSimulacoes) * 100;
    time.probabilidadeTop8 = (time.top8 / numSimulacoes) * 100;
    time.probabilidadeEliminacao = (time.eliminadoLiga / numSimulacoes) * 100;

    // Médias
    time.mediaJogos = time.jogos / numSimulacoes;
    time.mediaVitorias = time.vitorias / numSimulacoes;
    time.mediaEmpates = time.empates / numSimulacoes;
    time.mediaDerrotas = time.derrotas / numSimulacoes;
    time.mediaGolsPro = time.golsPro / numSimulacoes;
    time.mediaGolsContra = time.golsContra / numSimulacoes;
    time.mediaPontos = time.pontos / numSimulacoes;
  });

  return {
    times: estatisticas.sort(
      (a, b) => b.probabilidadeTitulo - a.probabilidadeTitulo
    ),
    simulacaoDetalhada,
  };
};

// Função para gerar os jogos da fase de liga da Champions
function gerarJogosChampions(times) {
  const potes = [1, 2, 3, 4].map((pote) =>
    times.filter((time) => time.pote === pote)
  );

  const jogos = [];

  // Para cada time
  times.forEach((time) => {
    const adversarios = [];

    // Selecionar 2 adversários de cada pote
    potes.forEach((pote) => {
      // Filtrar times do mesmo pote, excluindo o próprio time
      const adversariosPote = pote.filter((t) => t.id !== time.id);

      // Embaralhar os times do pote
      const poteSorteado = [...adversariosPote].sort(() => Math.random() - 0.5);

      // Selecionar 2 adversários
      let adversariosSelecionados = 0;
      let i = 0;

      while (adversariosSelecionados < 2 && i < poteSorteado.length) {
        const adversario = poteSorteado[i];

        // Verificar se o adversário já foi selecionado anteriormente
        const jogoExistente = jogos.some(
          (jogo) =>
            (jogo.mandante.id === time.id &&
              jogo.visitante.id === adversario.id) ||
            (jogo.mandante.id === adversario.id &&
              jogo.visitante.id === time.id)
        );

        // Verificar se o time já tem 8 jogos
        const timeTem8Jogos =
          jogos.filter(
            (jogo) =>
              jogo.mandante.id === time.id || jogo.visitante.id === time.id
          ).length >= 8;

        // Verificar se o adversário já tem 8 jogos
        const adversarioTem8Jogos =
          jogos.filter(
            (jogo) =>
              jogo.mandante.id === adversario.id ||
              jogo.visitante.id === adversario.id
          ).length >= 8;

        if (!jogoExistente && !timeTem8Jogos && !adversarioTem8Jogos) {
          adversarios.push(adversario);
          adversariosSelecionados++;

          // Definir quem será mandante (50% de chance para cada)
          const mandante = Math.random() < 0.5 ? time : adversario;
          const visitante = mandante === time ? adversario : time;

          jogos.push({
            mandante,
            visitante,
            resultado: null,
          });
        }

        i++;
      }
    });
  });

  return jogos;
}

// Função para simular os jogos da fase de liga
function simularFaseLigaChampions(jogos) {
  return jogos.map((jogo) => {
    const resultado = simularPartidaComGols(jogo.mandante, jogo.visitante);
    return {
      ...jogo,
      resultado,
      golsMandante: resultado.golsA,
      golsVisitante: resultado.golsB,
    };
  });
}

// Função para classificar os times após a fase de liga
function classificarTimesChampions(resultados) {
  const estatisticas = {};

  // Inicializar estatísticas de todos os times
  resultados.forEach((jogo) => {
    const mandanteId = jogo.mandante.id;
    const visitanteId = jogo.visitante.id;

    if (!estatisticas[mandanteId]) {
      estatisticas[mandanteId] = {
        ...jogo.mandante,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        golsPro: 0,
        golsContra: 0,
        saldoGols: 0,
        pontos: 0,
      };
    }

    if (!estatisticas[visitanteId]) {
      estatisticas[visitanteId] = {
        ...jogo.visitante,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        golsPro: 0,
        golsContra: 0,
        saldoGols: 0,
        pontos: 0,
      };
    }
  });

  // Contabilizar resultados
  resultados.forEach((jogo) => {
    const mandante = estatisticas[jogo.mandante.id];
    const visitante = estatisticas[jogo.visitante.id];

    mandante.jogos += 1;
    visitante.jogos += 1;

    mandante.golsPro += jogo.golsMandante;
    mandante.golsContra += jogo.golsVisitante;

    visitante.golsPro += jogo.golsVisitante;
    visitante.golsContra += jogo.golsMandante;

    if (jogo.golsMandante > jogo.golsVisitante) {
      // Vitória do mandante
      mandante.vitorias += 1;
      mandante.pontos += 3;
      visitante.derrotas += 1;
    } else if (jogo.golsMandante < jogo.golsVisitante) {
      // Vitória do visitante
      visitante.vitorias += 1;
      visitante.pontos += 3;
      mandante.derrotas += 1;
    } else {
      // Empate
      mandante.empates += 1;
      mandante.pontos += 1;
      visitante.empates += 1;
      visitante.pontos += 1;
    }
  });

  // Calcular saldo de gols
  Object.values(estatisticas).forEach((time) => {
    time.saldoGols = time.golsPro - time.golsContra;
  });

  // Ordenar por: pontos, saldo de gols, gols pró, vitorias
  return Object.values(estatisticas).sort((a, b) => {
    if (a.pontos !== b.pontos) return b.pontos - a.pontos;
    if (a.saldoGols !== b.saldoGols) return b.saldoGols - a.saldoGols;
    if (a.golsPro !== b.golsPro) return b.golsPro - a.golsPro;
    if (a.vitorias !== b.vitorias) return b.vitorias - a.vitorias;
    return Math.random() - 0.5; // Desempate aleatório caso todos os critérios sejam iguais
  });
}

// Função para simular os playoffs
function simularPlayoffChampions(times) {
  const timesPrimeiroGrupo = times.slice(0, 8); // 9º-16º
  const timesSegundoGrupo = times.slice(8, 16); // 17º-24º

  const confrontos = [];

  // Gerar os confrontos: Time do 9º-16º vs Time do 17º-24º
  for (let i = 0; i < 8; i++) {
    confrontos.push({
      id: i + 1,
      mandante: timesSegundoGrupo[i],
      visitante: timesPrimeiroGrupo[i],
      golsMandantaIda: null,
      golsVisitanteIda: null,
      golsMandanteVolta: null,
      golsVisitanteVolta: null,
      agregado: null,
      vencedor: null,
    });
  }

  // Simular os jogos de ida (mandante é o time pior classificado)
  confrontos.forEach((confronto) => {
    const resultadoIda = simularPartidaComGols(
      confronto.mandante,
      confronto.visitante
    );
    confronto.golsMandanteIda = resultadoIda.golsA;
    confronto.golsVisitanteIda = resultadoIda.golsB;
  });

  // Simular os jogos de volta (mandante é o time melhor classificado)
  confrontos.forEach((confronto) => {
    const resultadoVolta = simularPartidaComGols(
      confronto.visitante,
      confronto.mandante
    );
    confronto.golsMandanteVolta = resultadoVolta.golsA;
    confronto.golsVisitanteVolta = resultadoVolta.golsB;

    // Calcular o placar agregado
    // Placar agregado correto:
    // - Para o mandante: seus gols como mandante no jogo de ida + seus gols como visitante no jogo de volta
    // - Para o visitante: seus gols como visitante no jogo de ida + seus gols como mandante no jogo de volta
    const golsTotalMandante =
      confronto.golsMandanteIda + confronto.golsVisitanteVolta;
    const golsTotalVisitante =
      confronto.golsVisitanteIda + confronto.golsMandanteVolta;

    // No array agregado, a posição 0 é para o time mandante e a posição 1 é para o time visitante
    confronto.agregado = [golsTotalMandante, golsTotalVisitante];

    // Determinar o vencedor
    if (golsTotalMandante > golsTotalVisitante) {
      confronto.vencedor = confronto.mandante;
    } else if (golsTotalVisitante > golsTotalMandante) {
      confronto.vencedor = confronto.visitante;
    } else {
      // Em caso de empate no placar agregado, simular pênaltis
      const penaltis = [
        Math.floor(Math.random() * 3) + 3, // Entre 3 e 5 gols
        Math.floor(Math.random() * 3) + 3,
      ];

      // Garantir que não haja empate nos pênaltis
      if (penaltis[0] === penaltis[1]) {
        // Adicionar um gol aleatoriamente para um dos times
        const randomTime = Math.random() < 0.5 ? 0 : 1;
        penaltis[randomTime] += 1;
      }

      confronto.penaltis = penaltis;
      confronto.vencedor =
        penaltis[0] > penaltis[1] ? confronto.mandante : confronto.visitante;
    }
  });

  return {
    times: [...timesPrimeiroGrupo, ...timesSegundoGrupo],
    confrontos,
    classificados: confrontos.map((c) => c.vencedor),
  };
}

// Função para simular as fases eliminatórias (oitavas, quartas, semi e final)
function simularFasesEliminatoriasChampions(times) {
  // Embaralhar os times para definir os confrontos de oitavas
  const timesSorteados = [...times].sort(() => Math.random() - 0.5);

  // Confrontos de oitavas de final
  const confrontosOitavas = [];
  for (let i = 0; i < times.length; i += 2) {
    confrontosOitavas.push({
      id: i / 2 + 1,
      mandante: timesSorteados[i],
      visitante: timesSorteados[i + 1],
      resultado: null,
    });
  }

  // Simular oitavas de final (ida e volta)
  const resultadosOitavas = confrontosOitavas.map((confronto) => {
    // Jogo de ida (mandante joga em casa)
    const resultadoIda = simularPartidaComGols(
      confronto.mandante,
      confronto.visitante
    );
    const golsMandanteIda = resultadoIda.golsA; // Gols do mandante no jogo de ida
    const golsVisitanteIda = resultadoIda.golsB; // Gols do visitante no jogo de ida

    // Jogo de volta (visitante joga em casa)
    const resultadoVolta = simularPartidaComGols(
      confronto.visitante,
      confronto.mandante
    );
    const golsMandanteVolta = resultadoVolta.golsA; // Gols do visitante no jogo de volta (agora é mandante)
    const golsVisitanteVolta = resultadoVolta.golsB; // Gols do mandante no jogo de volta (agora é visitante)

    // Calcular o placar agregado por time:
    // - Time mandante (jogos de ida e volta): golsMandanteIda + golsVisitanteVolta
    // - Time visitante (jogos de ida e volta): golsVisitanteIda + golsMandanteVolta
    const golsTotalMandante = golsMandanteIda + golsVisitanteVolta;
    const golsTotalVisitante = golsVisitanteIda + golsMandanteVolta;

    let vencedor;
    let penaltis = null;

    if (golsTotalMandante > golsTotalVisitante) {
      vencedor = confronto.mandante;
    } else if (golsTotalVisitante > golsTotalMandante) {
      vencedor = confronto.visitante;
    } else {
      // Em caso de empate no placar agregado, simular pênaltis
      penaltis = [
        Math.floor(Math.random() * 3) + 3, // Entre 3 e 5 gols
        Math.floor(Math.random() * 3) + 3,
      ];

      // Garantir que não haja empate nos pênaltis
      if (penaltis[0] === penaltis[1]) {
        // Adicionar um gol aleatoriamente para um dos times
        const randomTime = Math.random() < 0.5 ? 0 : 1;
        penaltis[randomTime] += 1;
      }

      vencedor =
        penaltis[0] > penaltis[1] ? confronto.mandante : confronto.visitante;
    }

    return {
      ...confronto,
      golsMandanteIda,
      golsVisitanteIda,
      golsMandanteVolta,
      golsVisitanteVolta,
      agregado: [golsTotalMandante, golsTotalVisitante],
      penaltis,
      vencedor,
    };
  });

  // Lista de times para quartas de final
  const timesQuartas = resultadosOitavas.map((r) => r.vencedor);

  // Confrontos de quartas de final
  const confrontosQuartas = [];
  for (let i = 0; i < timesQuartas.length; i += 2) {
    confrontosQuartas.push({
      id: i / 2 + 1,
      mandante: timesQuartas[i],
      visitante: timesQuartas[i + 1],
      resultado: null,
    });
  }

  // Simular quartas de final (ida e volta)
  const resultadosQuartas = confrontosQuartas.map((confronto) => {
    // Jogo de ida
    const resultadoIda = simularPartidaComGols(
      confronto.mandante,
      confronto.visitante
    );
    const golsMandanteIda = resultadoIda.golsA;
    const golsVisitanteIda = resultadoIda.golsB;

    // Jogo de volta
    const resultadoVolta = simularPartidaComGols(
      confronto.visitante,
      confronto.mandante
    );
    const golsMandanteVolta = resultadoVolta.golsA;
    const golsVisitanteVolta = resultadoVolta.golsB;

    // Placar agregado - corrigido para calcular o total de gols por time
    const golsTotalMandante = golsMandanteIda + golsVisitanteVolta;
    const golsTotalVisitante = golsVisitanteIda + golsMandanteVolta;

    let vencedor;
    let penaltis = null;

    if (golsTotalMandante > golsTotalVisitante) {
      vencedor = confronto.mandante;
    } else if (golsTotalVisitante > golsTotalMandante) {
      vencedor = confronto.visitante;
    } else {
      // Em caso de empate no placar agregado, simular pênaltis
      penaltis = [
        Math.floor(Math.random() * 3) + 3, // Entre 3 e 5 gols
        Math.floor(Math.random() * 3) + 3,
      ];

      // Garantir que não haja empate nos pênaltis
      if (penaltis[0] === penaltis[1]) {
        // Adicionar um gol aleatoriamente para um dos times
        const randomTime = Math.random() < 0.5 ? 0 : 1;
        penaltis[randomTime] += 1;
      }

      vencedor =
        penaltis[0] > penaltis[1] ? confronto.mandante : confronto.visitante;
    }

    return {
      ...confronto,
      golsMandanteIda,
      golsVisitanteIda,
      golsMandanteVolta,
      golsVisitanteVolta,
      agregado: [golsTotalMandante, golsTotalVisitante],
      penaltis,
      vencedor,
    };
  });

  // Lista de times para semifinais
  const timesSemi = resultadosQuartas.map((r) => r.vencedor);

  // Confrontos de semifinais
  const confrontosSemi = [
    {
      id: 1,
      mandante: timesSemi[0],
      visitante: timesSemi[1],
      resultado: null,
    },
    {
      id: 2,
      mandante: timesSemi[2],
      visitante: timesSemi[3],
      resultado: null,
    },
  ];

  // Simular semifinais (ida e volta)
  const resultadosSemi = confrontosSemi.map((confronto) => {
    // Jogo de ida
    const resultadoIda = simularPartidaComGols(
      confronto.mandante,
      confronto.visitante
    );
    const golsMandanteIda = resultadoIda.golsA;
    const golsVisitanteIda = resultadoIda.golsB;

    // Jogo de volta
    const resultadoVolta = simularPartidaComGols(
      confronto.visitante,
      confronto.mandante
    );
    const golsMandanteVolta = resultadoVolta.golsA;
    const golsVisitanteVolta = resultadoVolta.golsB;

    // Placar agregado - corrigido para calcular o total de gols por time
    const golsTotalMandante = golsMandanteIda + golsVisitanteVolta;
    const golsTotalVisitante = golsVisitanteIda + golsMandanteVolta;

    let vencedor;
    let perdedor;
    let penaltis = null;

    if (golsTotalMandante > golsTotalVisitante) {
      vencedor = confronto.mandante;
      perdedor = confronto.visitante;
    } else if (golsTotalVisitante > golsTotalMandante) {
      vencedor = confronto.visitante;
      perdedor = confronto.mandante;
    } else {
      // Em caso de empate no placar agregado, simular pênaltis
      penaltis = [
        Math.floor(Math.random() * 3) + 3, // Entre 3 e 5 gols
        Math.floor(Math.random() * 3) + 3,
      ];

      // Garantir que não haja empate nos pênaltis
      if (penaltis[0] === penaltis[1]) {
        // Adicionar um gol aleatoriamente para um dos times
        const randomTime = Math.random() < 0.5 ? 0 : 1;
        penaltis[randomTime] += 1;
      }

      if (penaltis[0] > penaltis[1]) {
        vencedor = confronto.mandante;
        perdedor = confronto.visitante;
      } else {
        vencedor = confronto.visitante;
        perdedor = confronto.mandante;
      }
    }

    return {
      ...confronto,
      golsMandanteIda,
      golsVisitanteIda,
      golsMandanteVolta,
      golsVisitanteVolta,
      agregado: [golsTotalMandante, golsTotalVisitante],
      penaltis,
      vencedor,
      perdedor,
    };
  });

  // Times para a final
  const timesFinal = resultadosSemi.map((r) => r.vencedor);

  // Final (jogo único)
  const confrontoFinal = {
    mandante: timesFinal[0],
    visitante: timesFinal[1],
  };

  // Simular a final (jogo único em campo neutro)
  const resultadoFinal = simularPartidaComGols(
    confrontoFinal.mandante,
    confrontoFinal.visitante
  );

  let vencedor;
  let vice;
  let penaltis = null;

  if (resultadoFinal.golsA > resultadoFinal.golsB) {
    vencedor = confrontoFinal.mandante;
    vice = confrontoFinal.visitante;
  } else if (resultadoFinal.golsB > resultadoFinal.golsA) {
    vencedor = confrontoFinal.visitante;
    vice = confrontoFinal.mandante;
  } else {
    // Em caso de empate, simular pênaltis
    penaltis = [
      Math.floor(Math.random() * 3) + 3, // Entre 3 e 5 gols
      Math.floor(Math.random() * 3) + 3,
    ];

    // Garantir que não haja empate nos pênaltis
    if (penaltis[0] === penaltis[1]) {
      // Adicionar um gol aleatoriamente para um dos times
      const randomTime = Math.random() < 0.5 ? 0 : 1;
      penaltis[randomTime] += 1;
    }

    if (penaltis[0] > penaltis[1]) {
      vencedor = confrontoFinal.mandante;
      vice = confrontoFinal.visitante;
    } else {
      vencedor = confrontoFinal.visitante;
      vice = confrontoFinal.mandante;
    }
  }

  return {
    oitavas: resultadosOitavas,
    quartas: resultadosQuartas,
    semifinais: resultadosSemi,
    final: {
      ...confrontoFinal,
      golsMandante: resultadoFinal.golsA,
      golsVisitante: resultadoFinal.golsB,
      penaltis,
      vencedor,
      perdedor: vice,
    },
    oitavasFinalistas: [
      ...resultadosOitavas.map((r) => r.mandante),
      ...resultadosOitavas.map((r) => r.visitante),
    ],
    quartasFinalistas: [
      ...resultadosQuartas.map((r) => r.mandante),
      ...resultadosQuartas.map((r) => r.visitante),
    ],
    semifinalistas: [
      ...resultadosSemi.map((r) => r.mandante),
      ...resultadosSemi.map((r) => r.visitante),
    ],
    finalistas: [confrontoFinal.mandante, confrontoFinal.visitante],
    campeao: vencedor,
    vice,
  };
}
