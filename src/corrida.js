const { sortearItemConfronto, ITENS } = require('./item');
const SistemaConfronto = require('./confronto');

class Corrida {
    constructor(personagens, distanciaTotal = 100) {
        this.personagens = personagens;
        this.distanciaTotal = distanciaTotal;
        this.turnoAtual = 0;
        this.corridaFinalizada = false;
        this.vencedor = null;
        this.sistemaConfronto = new SistemaConfronto();
    }

    // Inicia uma nova corrida
    iniciar() {
        console.log('🏁 CORRIDA INICIADA! 🏁\n');
        this.personagens.forEach(p => p.resetar());
        this.turnoAtual = 0;
        this.corridaFinalizada = false;
        this.vencedor = null;
    }

    // Executa um turno da corrida
    executarTurno() {
        this.turnoAtual++;
        console.log(`\n--- TURNO ${this.turnoAtual} ---`);

        // Cada personagem avança baseado em seu desempenho + aleatoriedade
        this.personagens.forEach(personagem => {
            const desempenho = personagem.calcularDesempenho();
            const aleatorio = Math.floor(Math.random() * 10) + 1;
            const avanco = Math.floor((desempenho + aleatorio) / 3);
            
            personagem.avancar(avanco);
            console.log(`${personagem.nome} avancou ${avanco} posicoes (Total: ${personagem.posicao})`);
        });

        // Verifica confrontos aleatórios usando o sistema integrado
        if (this.sistemaConfronto.deveOcorrerConfronto()) {
            const personagensConfronto = this.sistemaConfronto.selecionarPersonagensParaConfronto(this.personagens);
            if (personagensConfronto) {
                this.sistemaConfronto.executarConfronto(
                    personagensConfronto.personagem1,
                    personagensConfronto.personagem2
                );
            }
        }

        // Ordena personagens por posição
        this.personagens.sort((a, b) => b.posicao - a.posicao);

        // Mostra classificação atual
        this.mostrarClassificacao();

        // Verifica se alguém terminou a corrida
        this.verificarFimDaCorrida();
    }

    // Verifica se a corrida terminou
    verificarFimDaCorrida() {
        const personagemNaFrente = this.personagens[0];
        if (personagemNaFrente.posicao >= this.distanciaTotal) {
            this.corridaFinalizada = true;
            this.vencedor = personagemNaFrente;
            console.log(`\n🏆 CORRIDA FINALIZADA! 🏆`);
            console.log(`Vencedor: ${this.vencedor.nome}!`);
        }
    }

    // Mostra a classificação atual
    mostrarClassificacao() {
        console.log('\n📊 CLASSIFICAÇÃO ATUAL:');
        this.personagens.forEach((personagem, index) => {
            const progresso = Math.min(Math.floor((personagem.posicao / this.distanciaTotal) * 20), 20);
            const barra = '█'.repeat(progresso) + '░'.repeat(20 - progresso);
            
            console.log(`${index + 1}º ${personagem.nome}: [${barra}] ${personagem.posicao}/${this.distanciaTotal}`);
            console.log(`   Pontos: ${personagem.pontos} | Turbos: ${personagem.turbo} | Desempenho: ${personagem.calcularDesempenho()}`);
        });
    }

    // Retorna o estado atual da corrida
    getEstado() {
        return {
            turno: this.turnoAtual,
            finalizada: this.corridaFinalizada,
            vencedor: this.vencedor ? this.vencedor.nome : null,
            classificacao: this.personagens.map(p => p.getInfo())
        };
    }

    // Verifica se a corrida está finalizada
    estaFinalizada() {
        return this.corridaFinalizada;
    }
}

module.exports = Corrida;

