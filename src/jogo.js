const readlineSync = require('readline-sync');
const colors = require('colors');
const Corrida = require('./corrida');
const SistemaConfronto = require('./confronto');
const { listarPersonagens, criarPersonagem, obterPersonagensAleatorios } = require('./personagens');

class JogoMarioKart {
    constructor() {
        this.corrida = null;
        this.sistemaConfronto = new SistemaConfronto();
        this.personagemJogador = null;
        this.modoJogo = null; // 'solo' ou 'multiplayer'
    }

    // Inicia o jogo
    iniciar() {
        this.mostrarTitulo();
        this.menuPrincipal();
    }

    // Mostra o título do jogo
    mostrarTitulo() {
        console.clear();
        console.log(colors.red('╔══════════════════════════════════════════════════════════════╗'));
        console.log(colors.red('║') + colors.yellow('                    🏁 MARIO KART SIMULATOR 🏁                   ') + colors.red('║'));
        console.log(colors.red('║') + colors.yellow('                     Simulador de Corridas                      ') + colors.red('║'));
        console.log(colors.red('╚══════════════════════════════════════════════════════════════╝'));
        console.log();
    }

    // Menu principal
    menuPrincipal() {
        while (true) {
            console.log(colors.cyan('🎮 MENU PRINCIPAL'));
            console.log('1. 🏃 Corrida Rapida ( vs IA)');
            console.log('2. 🏆 Campeonato');
            console.log('3. ⚙️  Configurações');
            console.log('4. 📊 Estatísticas');
            console.log('5. ❌ Sair');
            console.log();

            const opcao = readlineSync.question(" Escolha uma opcao: ");

            switch (opcao) {
                case '1':
                    this.corridaRapida();
                    break;
                case '2':
                    this.campeonato();
                    break;
                case '3':
                    this.configuracoes();
                    break;
                case '4':
                    this.mostrarEstatisticas();
                    break;
                case '5':
                    console.log(colors.yellow('👋 Obrigado por jogar! Até a próxima!'));
                    process.exit(0);
                    break;
                default:
                    console.log(colors.red('❌ Opção inválida!'));
            }
        }
    }

    // Corrida rápida
    corridaRapida() {
        console.clear();
        console.log(colors.cyan('🏃 CORRIDA RÁPIDA\n'));

        // Seleção de personagem
        this.personagemJogador = this.selecionarPersonagem();
        if (!this.personagemJogador) return;

        // Gera oponentes IA
        const oponentes = obterPersonagensAleatorios(3);
        const todosPersonagens = [this.personagemJogador, ...oponentes];

        console.log(colors.green('\\n🏁 Personagens da corrida:'));
        todosPersonagens.forEach((p, index) => {
            const emoji = index === 0 ? '👤' : '🤖';
            console.log(`${emoji} ${p.nome} - Vel: ${p.velocidade} | Man: ${p.manobrabilidade} | Poder: ${p.poder}`);
        });

        // Inicia a corrida
        this.corrida = new Corrida(todosPersonagens, 100);
        this.executarCorrida();
    }

    // Seleção de personagem
    selecionarPersonagem() {
        console.log(colors.cyan('👤 SELEÇÃO DE PERSONAGEM\n'));
        
        const personagens = listarPersonagens();
        
        console.log('Personagens disponíveis:');
        personagens.forEach((nome, index) => {
            console.log(`${index + 1}. ${nome}`);
        });
        console.log(`${personagens.length + 1}. 🎲 Aleatório`);
        console.log('0. ⬅️ Voltar');
        console.log();

        const opcao = readlineSync.question('Escolha seu personagem: ');
        
        if (opcao === '0') return null;
        
        if (opcao === String(personagens.length + 1)) {
            const personagemAleatorio = obterPersonagensAleatorios(1)[0];
            console.log(colors.yellow(`🎲 Personagem sorteado: ${personagemAleatorio.nome}!`));
            return personagemAleatorio;
        }

        const indice = parseInt(opcao) - 1;
        if (indice >= 0 && indice < personagens.length) {
            const personagemEscolhido = criarPersonagem(personagens[indice]);
            console.log(colors.green(`✅ Você escolheu: ${personagemEscolhido.nome}!`));
            return personagemEscolhido;
        }

        console.log(colors.red('❌ Opção inválida!'));
        return this.selecionarPersonagem();
    }

    // Executa a corrida
    executarCorrida() {
        console.log(colors.yellow('\\n🏁 Preparando para a corrida...'));
        readlineSync.question('Pressione ENTER para comecar!');
        
        this.corrida.iniciar();

        while (!this.corrida.estaFinalizada()) {
            console.log(colors.cyan('\\n⏸️  Pressione ENTER para o próximo turno...'));
            readlineSync.question('');
            
            // Verifica se deve ocorrer confronto
            if (this.sistemaConfronto.deveOcorrerConfronto()) {
                const personagensConfronto = this.sistemaConfronto.selecionarPersonagensParaConfronto(this.corrida.personagens);
                if (personagensConfronto) {
                    this.sistemaConfronto.executarConfronto(
                        personagensConfronto.personagem1,
                        personagensConfronto.personagem2
                    );
                }
            }

            this.corrida.executarTurno();
        }

        this.mostrarResultadoFinal();
    }

    // Mostra o resultado final da corrida
    mostrarResultadoFinal() {
        console.log(colors.rainbow('\\n🎉 RESULTADO FINAL 🎉'));
        console.log('='.repeat(60));
        
        const estado = this.corrida.getEstado();
        
        console.log(colors.yellow(`🏆 VENCEDOR: ${estado.vencedor}!`));
        console.log();
        
        console.log(colors.cyan('📊 CLASSIFICAÇÃO FINAL:'));
        estado.classificacao.forEach((personagem, index) => {
            const posicao = index + 1;
            let cor = colors.white;
            let emoji = '';
            
            switch (posicao) {
                case 1: cor = colors.yellow; emoji = '🥇'; break;
                case 2: cor = colors.gray; emoji = '🥈'; break;
                case 3: cor = colors.red; emoji = '🥉'; break;
                default: emoji = `${posicao}º`; break;
            }
            
            console.log(cor(`${emoji} ${personagem.nome}`));
            console.log(`   Posição: ${personagem.posicao} | Pontos: ${personagem.pontos} | Turbos: ${personagem.turbo}`);
        });

        // Mostra estatísticas dos confrontos
        const stats = this.sistemaConfronto.obterEstatisticas();
        if (stats.totalConfrontos > 0) {
            console.log(colors.magenta('\\n⚔️  ESTATÍSTICAS DE CONFRONTOS:'));
            console.log(`Total de confrontos: ${stats.totalConfrontos}`);
            console.log(`Vitórias decisivas: ${stats.vitorias}`);
            console.log(`Empates: ${stats.empates}`);
        }

        readlineSync.question('\\nPressione ENTER para continuar...');
        this.sistemaConfronto.resetarHistorico();
    }

    // Campeonato (modo mais avançado)
    campeonato() {
        console.log(colors.cyan('🏆 MODO CAMPEONATO'));
        console.log(colors.yellow('🚧 Em desenvolvimento! Volte em breve.'));
        readlineSync.question('Pressione ENTER para voltar...');
    }

    // Configurações
    configuracoes() {
        console.log(colors.cyan('⚙️  CONFIGURAÇÕES'));
        console.log(colors.yellow('🚧 Em desenvolvimento! Volte em breve.'));
        readlineSync.question('Pressione ENTER para voltar...');
    }

    // Mostra estatísticas gerais
    mostrarEstatisticas() {
        console.log(colors.cyan('📊 ESTATÍSTICAS'));
        console.log(colors.yellow('🚧 Em desenvolvimento! Volte em breve.'));
        readlineSync.question('Pressione ENTER para voltar...');
    }
}

module.exports = JogoMarioKart;

