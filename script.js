document.addEventListener('DOMContentLoaded', () => {
  const eye = document.getElementById('eye');
  const universeCanvas = document.getElementById('universeCanvas');
  const universeText = document.getElementById('universeText');
  const floatingStar = document.getElementById('floatingStar');
  const desertScene = document.getElementById('desertScene');
  const heartConstellation = document.getElementById('heartConstellation');
  const desertText = document.getElementById('desertText');
  const galaxyScene = document.getElementById('galaxyScene');
  const loveStars = document.getElementById('loveStars');
  const bgMusic = document.getElementById('bgMusic');

  if (!eye) {
    console.error('Eye element not found!');
    return;
  }

  const ctx = universeCanvas.getContext('2d');

  // Ajusta canvas ao tamanho da tela
  function resizeCanvas() {
    universeCanvas.width = window.innerWidth;
    universeCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Estrelas para universo
  class Star {
    constructor(isDesert = false) {
      this.x = Math.random() * universeCanvas.width;
      this.y = Math.random() * universeCanvas.height;
      this.radius = Math.random() * 1.5 + 0.5;
      this.speed = Math.random() * 0.4 + 0.1;
      this.color = isDesert ? `rgba(255,255,255,${Math.random() * 0.2})` : `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`;
    }
    move() {
      this.x -= this.speed; // Movimento para a esquerda
      if (this.x < 0) this.x = universeCanvas.width;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 5;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let stars = [];
  function resetStars(isDesert = false) {
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push(new Star(isDesert));
    }
  }
  resetStars(); // Inicializa estrelas normais

  function drawUniverse() {
    ctx.clearRect(0, 0, universeCanvas.width, universeCanvas.height);
    stars.forEach(s => {
      s.move();
      s.draw();
    });
  }

  // Iniciar animação do universo
  let universeAnimId;
  function animateUniverse() {
    drawUniverse();
    if (state !== 'initial' && state !== 'boom' && state !== 'starFloating' && state !== 'infinite') {
      universeAnimId = requestAnimationFrame(animateUniverse);
    } else if (state === 'infinite') {
      universeAnimId = requestAnimationFrame(animateUniverse);
    } else {
      cancelAnimationFrame(universeAnimId);
      universeCanvas.style.display = 'none';
      universeText.style.display = 'none';
    }
  }

  // Frases universo
  const universeMessages = [
    "Feliz Dia dos Namorados, minha deusa egípcia!",
    "Quero te levar numa viagem pelo espaço, e não só isso —",
    "Quero te fazer sentir a mesma sensação mágica de flutuar entre as estrelas,",
    "Que é exatamente o que eu sinto toda vez que estou com você."
  ];

  // História para o deserto
  const storyMessages = [
    "Lembra, amor, daquele nosso primeiro encontro na CMDBR? Você toda meiga, com esse jeitinho fofo que só você tem… E eu, todo encantado, sem nem saber direito como me aproximar. Mas ali começou algo. Começou uma conexão que foi além das palavras.",
    "Foi só o começo… Aos poucos, a amizade virou desejo. E o desejo virou vontade — vontade de te ter por perto, de te conhecer de verdade, de te sentir, de mergulhar no universo que é você.",
    "Cada conversa, cada riso, cada olhadinha sua fazia meu coração bater mais forte. Quando você soltou aquele “vapo vapo” — ai meu Deus 😂 — eu senti que ali tinha algo especial.",
    "E não deu outra: naquele instante, eu soube que queria você. Que ia te conquistar. Que ia lutar, custasse o que custasse.",
    "E olha onde estamos hoje… Quem diria, hein? Adivinha só quem é a dona do meu coração? Quem eu chamo de amor? Quem é a minha namorada, minha companheira, meu motivo de sorrir todo dia? Sim, é você, amor. Só você.",
    "Você está comigo em tudo: em cada momento, em cada risada, em cada lágrima que escorre no silêncio, em cada sonho que cresce dentro de mim. Você é minha fortaleza, minha inspiração, meu carinho diário.",
    "E eu te amo. Eu te amo com força, com alma, com intensidade. Não é exagero — é verdade pura, sentida, vivida.",
    "Eu sou seu. Completamente. Inteiramente. E você é minha. Nossa ligação é como uma constelação única no céu: memorável, eterna, linda demais pra ser explicada com palavras.",
    "Obrigado por tudo que você é. Por me acolher, por me cuidar, por me amar. Por fazer de mim um homem melhor só com a sua presença.",
    "Hoje é o nosso primeiro Dia dos Namorados juntos, e ele é só o primeiro de muitos — muitos momentos, muitas conquistas, muitos abraços apertados e muitos “eu te amo” sussurrados ao pé do ouvido.",
    "Vamos viver esse dia intensamente, do nosso jeitinho, com o nosso amor. Porque com você, qualquer momento vira eternidade.",
    "Te amo, minha deusa egípcia. Te amo com tudo o que sou."
  ];

  // Estado do site
  let state = 'initial'; // initial, boom, universe, starFloating, desert, galaxy, loveStars, infinite
  let msgIndex = 0;
  let textVisible = false;

  // Boom: cores e giro
  function doBoomEffect() {
    console.log('Boom effect triggered');
    eye.style.animation = 'boomFlash 2s linear infinite, spin 3s linear';
    setTimeout(() => {
      eye.style.animation = '';
      eye.style.display = 'none';
      state = 'universe';
      startUniverseScene();
    }, 3000);
  }

  // Mostrar frases em sequência (universo)
  function showNextMessage() {
    if (msgIndex >= universeMessages.length) {
      setTimeout(() => {
        msgIndex = 0;
        textVisible = false;
        universeText.style.opacity = 0;
        universeText.textContent = "";
        showFloatingStar();
      }, 2000);
      return;
    }
    universeText.textContent = universeMessages[msgIndex];
    universeText.style.opacity = 1;
    msgIndex++;
    setTimeout(() => {
      universeText.style.opacity = 0;
      setTimeout(showNextMessage, 2000);
    }, 10000); // 10s para exibir
  }

  // Start da cena universo
  function startUniverseScene() {
    console.log('Starting universe scene');
    resetStars(); // Estrelas normais
    universeCanvas.style.display = 'block';
    universeCanvas.classList.remove('desert-mode');
    universeText.style.display = 'block';
    showNextMessage();
    bgMusic.play().catch(err => console.error('Audio play failed:', err));
    animateUniverse();
  }

  // Mostrar estrela flutuante
  function showFloatingStar() {
    console.log('Showing floating star');
    floatingStar.style.display = 'block';
    state = 'starFloating';
  }

  // Criar constelação em forma de coração
  function createHeartConstellation() {
    heartConstellation.innerHTML = '';
    const points = [
      { x: 150, y: 50 },  // Ponto superior do coração
      { x: 100, y: 100 }, // Lado esquerdo inferior
      { x: 50, y: 150 },  // Base esquerda
      { x: 100, y: 200 }, // Ponta inferior esquerda
      { x: 150, y: 150 }, // Centro inferior
      { x: 200, y: 200 }, // Ponta inferior direita
      { x: 250, y: 150 }, // Base direita
      { x: 200, y: 100 }  // Lado direito inferior
    ];
    points.forEach(point => {
      const star = document.createElement('div');
      star.classList.add('star-dot');
      star.style.left = point.x + 'px';
      star.style.top = point.y + 'px';
      heartConstellation.appendChild(star);
    });
  }

  // Mostrar história no deserto
  function showStoryMessages() {
    if (msgIndex >= storyMessages.length) {
      setTimeout(() => {
        msgIndex = 0;
        textVisible = false;
        desertText.style.opacity = 0;
        desertText.textContent = "";
        showGalaxyScene();
      }, 2000);
      return;
    }
    desertText.textContent = storyMessages[msgIndex];
    desertText.style.opacity = 1;
    msgIndex++;
    setTimeout(() => {
      desertText.style.opacity = 0;
      setTimeout(showStoryMessages, 2000);
    }, 10000); // 10s para exibir
  }

  // Mostrar cena deserto
  function showDesertScene() {
    console.log('Showing desert scene');
    floatingStar.style.display = 'none';
    desertScene.style.display = 'flex';
    resetStars(true); // Estrelas fraquinhas
    universeCanvas.style.display = 'block';
    universeCanvas.classList.add('desert-mode');
    createHeartConstellation();
    msgIndex = 0;
    showStoryMessages();
    state = 'desert';
    animateUniverse(); // Garantir que a animação continua
  }

  // Criar galáxia
  function createGalaxy() {
    galaxyScene.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const dot = document.createElement('div');
      dot.classList.add('galaxy-dot');
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.3;
      dot.style.left = (50 + Math.cos(angle) * radius) + 'vw';
      dot.style.top = (50 + Math.sin(angle) * radius) + 'vh';
      galaxyScene.appendChild(dot);
    }
    // Adicionar texto final e opções (estático e centralizado)
    galaxyScene.innerHTML += `
      <div id="finalMessage" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: none;">
        <div class="finalHeader">EU TE AMO MEU AMOR</div>
        <div class="finalSub">Obrigado por tudo mesmo!! Obrigado por estar comigo</div>
        <div class="finalFromTo">
          <div>De: <strong>Matheus Eduardo (Zezinho)</strong></div>
          <div>Para: <strong>Crisllayne Kerolayne (Minha cabrita)</strong></div>
        </div>
      </div>
      <div id="choiceButtons" style="position: absolute; top: 60%; left: 50%; transform: translateX(-50%);">
        <button class="choiceBtn" id="yesBtn">[ SIM ]</button> <span class="choiceText">ACEITA NAMORAR COMIGO</span> <button class="choiceBtn" id="noBtn">[ NÃO ]</button>
      </div>
    `;
    document.getElementById('yesBtn').onclick = () => showInfiniteScene();
    document.getElementById('noBtn').onclick = () => {};
  }

  // Mostrar cena galáxia
  function showGalaxyScene() {
    console.log('Showing galaxy scene');
    desertScene.style.display = 'none';
    resetStars(); // Estrelas normais
    universeCanvas.style.display = 'block';
    universeCanvas.classList.remove('desert-mode');
    galaxyScene.style.display = 'block';
    createGalaxy();
    state = 'galaxy';
    animateUniverse(); // Garantir que a animação continua
  }

  // Estrelas cadentes com palavras e coração
  function showLoveStars() {
    console.log('Showing love stars scene');
    resetStars(); // Estrelas normais
    universeCanvas.style.display = 'block';
    universeCanvas.classList.remove('desert-mode');
    loveStars.style.display = 'flex';
    state = 'loveStars';

    loveStars.innerHTML = `
      <div id="finalMessage">
        <div class="finalHeader">EU TE AMO MEU AMOR</div>
        <div class="finalSub">Obrigado por tudo mesmo!! Obrigado por estar comigo</div>
        <div class="finalFromTo">
          <div>De: <strong>Matheus Eduardo (Zezinho)</strong></div>
          <div>Para: <strong>Crisllayne Kerolayne (Minha cabrita)</strong></div>
        </div>
      </div>
    `;

    bgMusic.onended = () => {
      console.log('Music ended, resetting to initial state');
      loveStars.style.display = 'none';
      universeCanvas.style.display = 'none';
      state = 'initial';
      eye.style.display = 'block';
      bgMusic.currentTime = 0;
    };

    function createMeteors() {
      loveStars.innerHTML = '';
      const count = 10;
      for (let i = 0; i < count; i++) {
        const isHeart = Math.random() < 0.1;
        const element = document.createElement('div');
        element.classList.add(isHeart ? 'heart' : 'loveStar');
        element.textContent = isHeart ? 'ღ' : phrases[Math.floor(Math.random() * phrases.length)];
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = Math.random() * window.innerHeight + 'px';
        element.style.fontSize = (Math.random() * 8 + 10) + 'px';
        element.style.animationDelay = (i * 0.4) + 's';
        element.style.animationDuration = '6s';
        loveStars.appendChild(element);
        element.addEventListener('animationend', () => element.remove());
      }
    }

    createMeteors();
    const meteorInterval = setInterval(createMeteors, 6000);

    bgMusic.onended = () => {
      console.log('Music ended, resetting to initial state');
      clearInterval(meteorInterval);
      loveStars.style.display = 'none';
      universeCanvas.style.display = 'none';
      state = 'initial';
      eye.style.display = 'block';
      bgMusic.currentTime = 0;
    };
  }

  // Mostrar cena infinita
  function showInfiniteScene() {
    console.log('Showing infinite scene');
    state = 'infinite';
    let blinkInterval = setInterval(() => {
      document.body.style.background = document.body.style.background === 'black' ? 'white' : 'black';
      universeCanvas.style.background = universeCanvas.style.background === 'black' ? 'white' : 'black';
    }, 500);
    setTimeout(() => {
      clearInterval(blinkInterval);
      document.body.style.background = 'black';
      universeCanvas.style.background = 'black';
      universeCanvas.style.display = 'block';
      galaxyScene.style.display = 'none';
      resetStars();
      animateUniverse();
      galaxyScene.innerHTML = `<div id="infiniteMessage">AGORA SOMOS INFINITO!!</div>`;
      galaxyScene.style.display = 'flex';
      galaxyScene.style.justifyContent = 'center';
      galaxyScene.style.alignItems = 'center';
    }, 3000);
  }

  // Click handler para o olho
  eye.onclick = () => {
    console.log('Eye clicked, state:', state);
    if (state !== 'initial') return;
    state = 'boom';
    doBoomEffect();
  };

  floatingStar.onclick = () => {
    console.log('Floating star clicked, state:', state);
    if (state !== 'starFloating') return;
    showDesertScene();
  };
});

// Frases para estrelas cadentes
const phrases = ["Te amo", "Minha deusa", "Eterno", "Juntos", "Amor"];
