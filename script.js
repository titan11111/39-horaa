class ConvenienceStoreGame {
    // 音声シミュレーション用の効果音システム
    playHorrorSound(type) {
        // Web Audio APIを使用して効果音をシミュレート
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        switch(type) {
            case 'flicker':
                this.createElectricSound(audioContext);
                break;
            case 'static':
                this.createStaticSound(audioContext);
                break;
            case 'footsteps':
                this.createFootstepsSound(audioContext);
                break;
            case 'whisper':
                this.createWhisperSound(audioContext);
                break;
            case 'scream':
                this.createScreamSound(audioContext);
                break;
            case 'heartbeat':
                this.createHeartbeatSound(audioContext);
                break;
            case 'door_creak':
                this.createDoorCreakSound(audioContext);
                break;
            case 'glass_break':
                this.createGlassBreakSound(audioContext);
                break;
        }
    }

    createElectricSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.5);
    }

    createStaticSound(ctx) {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        
        source.buffer = buffer;
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
    }

    createFootstepsSound(ctx) {
        for (let i = 0; i < 5; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 80 + Math.random() * 40;
            
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime + i * 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.4 + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(ctx.currentTime + i * 0.4);
            oscillator.stop(ctx.currentTime + i * 0.4 + 0.2);
        }
    }

    createWhisperSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 2);
    }

    createScreamSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
        oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 1);
    }

    createHeartbeatSound(ctx) {
        for (let i = 0; i < 3; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 60;
            
            gainNode.gain.setValueAtTime(0.6, ctx.currentTime + i * 0.8);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.8 + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(ctx.currentTime + i * 0.8);
            oscillator.stop(ctx.currentTime + i * 0.8 + 0.3);
        }
    }

    createDoorCreakSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.5);
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 1.5);
    }

    createGlassBreakSound(ctx) {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 10);
        }
        
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        source.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        
        gainNode.gain.value = 0.5;
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
    }

    // ホラー効果の初期化
    initHorrorEffects() {
        this.originalBgColor = document.body.style.background;
        this.horrorEventActive = false;
    }

    triggerHorrorEffect(type) {
        const gameScreen = this.screens.game;
        this.horrorEventActive = true;

        switch (type) {
            case 'flicker':
                this.flickerEffect(gameScreen);
                this.playHorrorSound('flicker');
                break;
            case 'static':
                this.staticEffect(gameScreen);
                this.playHorrorSound('static');
                break;
            case 'bloodStain':
                this.bloodStainEffect();
                this.playHorrorSound('heartbeat');
                break;
            case 'mirror':
                this.mirrorEffect();
                this.playHorrorSound('whisper');
                break;
            case 'timeDistortion':
                this.timeDistortionEffect();
                this.playHorrorSound('static');
                break;
            case 'finalPhase':
                this.finalPhaseEffect();
                this.playHorrorSound('scream');
                break;
            case 'ultimateHorror':
                this.ultimateHorrorEffect();
                this.playHorrorSound('scream');
                setTimeout(() => this.playHorrorSound('heartbeat'), 1000);
                break;
            case 'general':
                this.generalHorrorEffect();
                this.playHorrorSound('footsteps');
                break;
        }

        setTimeout(() => {
            this.horrorEventActive = false;
        }, 3000);
    }

    flickerEffect(element) {
        let count = 0;
        const interval = setInterval(() => {
            element.style.filter = count % 2 === 0 ? 'brightness(0.1)' : 'brightness(1.5)';
            count++;
            if (count > 12) {
                clearInterval(interval);
                element.style.filter = 'brightness(1)';
            }
        }, 150);
    }

    staticEffect(element) {
        element.classList.add('static-effect');
        setTimeout(() => {
            element.classList.remove('static-effect');
        }, 3000);
    }

    bloodStainEffect() {
        document.body.classList.add('blood-effect');
        setTimeout(() => {
            document.body.classList.remove('blood-effect');
        }, 5000);
    }

    mirrorEffect() {
        const customer = this.gameElements.customer;
        customer.classList.add('mirror-effect');
        setTimeout(() => {
            customer.classList.remove('mirror-effect');
        }, 2000);
    }

    timeDistortionEffect() {
        this.gameElements.timeDisplay.classList.add('time-distortion');
        setTimeout(() => {
            this.gameElements.timeDisplay.classList.remove('time-distortion');
        }, 4000);
    }

    finalPhaseEffect() {
        document.body.classList.add('final-phase');
        this.gameElements.registerScreen.style.color = '#ff0000';
        setTimeout(() => {
            this.gameElements.registerScreen.style.color = '#00ff00';
        }, 6000);
    }

    ultimateHorrorEffect() {
        // 究極の恐怖演出
        document.body.style.filter = 'invert(1) contrast(200%) saturate(0%)';
        this.gameElements.customer.style.transform = 'scale(2) rotate(180deg)';
        this.gameElements.registerScreen.textContent = '助けて...助けて...助けて...';
        this.gameElements.registerScreen.style.color = '#ff0000';
        
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
            document.body.style.filter = glitchCount % 2 === 0 ? 
                'invert(1) contrast(200%) hue-rotate(180deg)' : 
                'invert(0) contrast(300%) saturate(200%)';
            glitchCount++;
            
            if (glitchCount > 20) {
                clearInterval(glitchInterval);
                document.body.style.filter = 'none';
                this.gameElements.customer.style.transform = 'scale(1) rotate(0deg)';
                this.gameElements.registerScreen.style.color = '#00ff00';
            }
        }, 100);
    }

    generalHorrorEffect() {
        const effects = ['brightness(0.5)', 'contrast(150%)', 'hue-rotate(180deg)', 'saturate(200%)'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        document.body.style.filter = randomEffect;
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }

    // ゲーム状態管理
    constructor() {
        this.gameState = 'start';
        this.currentTime = 0;
        this.health = 100;
        this.sanity = 100;
        this.score = 0;
        this.events = [];
        this.currentCustomer = null;
        this.customerQueue = [];
        this.workQueue = [];
        this.isEventActive = false;

        this.timeMultiplier = 3;

        // ホラー要素の制御
        this.scaryLevel = 0;
        this.yamadaCounter = 0;
        this.mirrorEvents = 0;
        this.timeAnomalies = 0;
        this.bloodEvents = 0;
        this.ultimateHorrorCount = 0;
        this.finalPhase = false;

        this.eventMessages = this.initEventMessages();
        this.customers = this.initCustomers();

        this.initElements();
        this.bindEvents();
        this.startGameLoop();
        this.initHorrorEffects();
    }

    initElements() {
        this.screens = {
            start: document.getElementById('startScreen'),
            game: document.getElementById('gameScreen'),
            end: document.getElementById('endScreen')
        };
        
        this.gameElements = {
            timeDisplay: document.getElementById('timeDisplay'),
            healthFill: document.getElementById('healthFill'),
            sanityFill: document.getElementById('sanityFill'),
            customer: document.getElementById('customer'),
            customerSpeech: document.getElementById('customerSpeech'),
            registerScreen: document.getElementById('registerScreen'),
            eventMessage: document.getElementById('eventMessage'),
            eventText: document.getElementById('eventText'),
            endTitle: document.getElementById('endTitle'),
            endMessage: document.getElementById('endMessage')
        };
        
        this.buttons = {
            start: document.getElementById('startBtn'),
            restart: document.getElementById('restartBtn'),
            eventOk: document.getElementById('eventOk'),
            workBtns: document.querySelectorAll('.work-btn')
        };

        this.audio = {
            bgm: document.getElementById('bgm'),
            sfx: document.getElementById('sfx')
        };
    }

    initEventMessages() {
        return {
            phase1: [
                "お客さんが来ました... 顔が見えませんね",
                "商品の補充が必要です\n棚の奥に赤い染みが...",
                "店内が汚れています\nこの汚れ... 血のような色ですね",
                "コーヒーを飲んで休憩を\n苦い... いつもより苦い...",
                "レジの音が変です\nピッ... ピッ... ピッ...",
                "電話が鳴っています\n出ても誰も話しません",
                "監視カメラの映像が乱れています\n誰かがこちらを見ています",
                "冷凍庫から音がします\nドンドンと... まるで中から叩いているような",
                "バックヤードのドアが少し開いています\n中は真っ暗です"
            ],
            phase2: [
                "客が同じ人ばかり来ます...\n全員同じ顔... 同じ服...",
                "監視カメラに映る影\nあなたの後ろに... 誰かいます",
                "店の電気が点滅しています\nS.O.S... S.O.S... S.O.S...",
                "外から足音が聞こえます\n窓を見ないでください",
                "商品が勝手に動いています\n棚から... 落ちて... 割れて...",
                "バックヤードのドアが開いています\n中から呼ぶ声が聞こえます",
                "レジの画面にメッセージが\n『助けて... 私を... 助けて...』",
                "店内の温度が急に下がりました\n息が白くなっています",
                "壁に手の跡が... 血のような赤い手の跡が...",
                "トイレから水の流れる音が\nでも... 誰も使っていません",
                "天井から何かが落ちてきました\n赤い... 液体が...",
                "店の入り口で人影がゆらゆらと\n入ってこようとしません"
            ],
            phase3: [
                "お客が消えません！\n何度レジを通しても... 消えない...",
                "鏡に映る自分が笑っています\nなぜ... 笑っているんですか？",
                "店内に血の跡が...\n足跡が... あなたの足跡です",
                "同僚のヤマダさんが来ました\nでも... ヤマダさんは昨日...",
                "時計が逆回りしています\n時間が... 戻っている...",
                "あなたの声が聞こえます\n『助けて... 誰か... 助けて...』",
                "もうすぐ夜明けです...\nでも... 本当に夜明けは来るのでしょうか？",
                "店の外に人だかりが...\n全員こちらを見ています\n全員... あなたの顔です",
                "冷凍庫の中に人がいます\n前のヤマダさんが... まだ働いています",
                "あなたの制服が血まみれです\nいつから... なぜ...",
                "店内に子供の笑い声が響いています\n子供なんていないのに...",
                "レジの下から手が伸びています\n冷たい... 青白い手が...",
                "監視カメラに映るのは空っぽの店\nあなたは... どこにいるのですか？",
                "外の街灯が一つずつ消えています\n闇が... 近づいています"
            ],
            yamada_events: [
                "新しい店長のヤマダです\n前のヤマダはどこに行ったのでしょうね？",
                "ヤマダという名前\n何人目のヤマダでしょうか？",
                "あなたもいずれヤマダになります\nみんな... ヤマダになるんです",
                "制服に名札が...\n『ヤマダ』と書いてあります\nいつから？",
                "この店の歴史を知っていますか？\nヤマダさんが... 100人以上...",
                "あなたの前にも後にも\nみんなヤマダという名前になるんです",
                "冷凍庫を見てみてください\n歴代のヤマダさんが眠っています"
            ],
            final_events: [
                "夜明けまであと30分...\nでも外はまだ真っ暗です",
                "時計の針が震えています\n7時を指すのを拒んでいます",
                "あなたの制服が変わっています\n名札に『ヤマダ』と...",
                "店の入り口から歌声が\n『♪深夜のコンビニ 永遠に♪』",
                "最後のお客様です\nそれは... 鏡の中のあなたでした",
                "外の世界が消えています\nコンビニだけが... 残っています",
                "あなたの記憶が曖昧になってきました\n本当の名前は... なんでしたっけ？"
            ],
            ultimate_horror: [
                "店内の全ての商品が血まみれです\n全て... 赤く染まっています",
                "天井から無数の目玉が見下ろしています\n全て... あなたを見つめています",
                "床が肉の塊で出来ています\nぐちゅぐちゅと... 音を立てています",
                "あなたの体が透けて見えます\n幽霊に... なってしまったのですか？",
                "店内に死体が散乱しています\n全て... ヤマダという名札をつけています",
                "壁から血が滴り落ちています\nまるで店全体が... 生きているようです",
                "あなたの影が勝手に動いています\n影があなたを見て笑っています",
                "レジスターが人間の歯で出来ています\n打つ度に... 悲鳴が聞こえます"
            ]
        };
    }

    initCustomers() {
        return {
            normal: [
                { sprite: "😊", speech: "こんばんは... 深夜のお仕事大変ですね", reaction: "ありがとう... また来ます" },
                { sprite: "🧑", speech: "いつもここで働いてるんですか？", reaction: "前のヤマダさんはどこに？" },
                { sprite: "👩", speech: "この店、昔から変わらないですね", reaction: "時間が止まったみたい..." },
                { sprite: "👴", speech: "若いのに深夜勤務とは... 気をつけなさい", reaction: "この店は危険だ..." },
                { sprite: "🧒", speech: "お母さんを探しています", reaction: "お母さんも... ヤマダになりました" }
            ],
            strange: [
                { sprite: "😐", speech: "...いつも同じ時間に来てます", reaction: "...いつも同じ商品を..." },
                { sprite: "🤔", speech: "この店のヤマダさん、何人いるんですか？", reaction: "みんなヤマダになるんです" },
                { sprite: "😟", speech: "あなた、鏡を見ましたか？", reaction: "鏡の中の自分... 笑ってませんか？" },
                { sprite: "👻", speech: "深夜3時は危険な時間...", reaction: "時間が... 逆に回り始めます" },
                { sprite: "🔴", speech: "監視カメラ、見てますか？", reaction: "映ってはいけない物が..." },
                { sprite: "⚫", speech: "バックヤードに入ってはいけません", reaction: "前のヤマダさんがまだ..." },
                { sprite: "😵", speech: "この店で働くと死にます", reaction: "私も... もう死んでいます" },
                { sprite: "👥", speech: "私たちは同じ人間です", reaction: "あなたも... 私になります" }
            ],
            scary: [
                { sprite: "😨", speech: "助けて... 私もヤマダになってしまう...", reaction: "逃げられない... 逃げられない..." },
                { sprite: "👤", speech: "ここから出られません... もう7年も...", reaction: "あなたも... 仲間になりますね" },
                { sprite: "🩸", speech: "血の匂いがしませんか？", reaction: "バックヤードから... ずっと..." },
                { sprite: "💀", speech: "夜明けは来ません... 永遠に深夜です", reaction: "時計を見てください... 逆回りを" },
                { sprite: "👁️", speech: "あなたを見てる目があります", reaction: "監視カメラの向こうから..." },
                { sprite: "🌑", speech: "外を見てはいけません", reaction: "あなたの顔をした人たちが..." },
                { sprite: "⚰️", speech: "前のヤマダさんを知ってますか？", reaction: "冷凍庫の中に..." },
                { sprite: "😈", speech: "制服の名札... 見てください", reaction: "いつの間に『ヤマダ』に..." },
                { sprite: "🔪", speech: "包丁を研いでいます", reaction: "次は... あなたの番です" },
                { sprite: "🕳️", speech: "地下に穴を掘りました", reaction: "あなたの分の穴を..." },
                { sprite: "🪦", speech: "墓石に名前を刻みます", reaction: "『ヤマダ』と刻まれています" },
                { sprite: "🧟", speech: "ゾンビになってしまいました", reaction: "あなたも... 仲間になって..." }
            ],
            yamada: [
                { sprite: "👨‍💼", speech: "新任のヤマダです... 何代目でしょうか？", reaction: "あなたが次のヤマダです" },
                { sprite: "🤵", speech: "ヤマダという名前... 呪われているんです", reaction: "みんなヤマダになるんです" },
                { sprite: "👔", speech: "この制服を着ると... ヤマダになるんです", reaction: "もう逃れられません" },
                { sprite: "🧑‍💼", speech: "100代目のヤマダです", reaction: "あなたは101代目ですね" }
            ],
            final_boss: [
                { sprite: "🪞", speech: "鏡の中から来ました... あなたです", reaction: "一緒にヤマダになりましょう" },
                { sprite: "⏰", speech: "時間は止まりました... 永遠の深夜です", reaction: "夜明けは来ません" },
                { sprite: "🔄", speech: "これは夢ではありません... 現実です", reaction: "ようこそ、ヤマダさん" },
                { sprite: "👥", speech: "私たちは全員あなたです", reaction: "分裂した魂の欠片です" }
            ],
            ultimate_boss: [
                { sprite: "💀👻", speech: "全てのヤマダの怨念です", reaction: "あなたも我々の一部になります" },
                { sprite: "🌑🩸", speech: "深夜の闇そのものです", reaction: "光は二度と戻りません" },
                { sprite: "⚰️💀", speech: "死んだヤマダたちの集合体です", reaction: "安らかに... 永遠に働きなさい" }
            ]
        };
    }

    bindEvents() {
        this.buttons.start.addEventListener('click', () => {
            this.startGame();
        });
        
        this.buttons.restart.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.buttons.eventOk.addEventListener('click', () => {
            this.closeEvent();
        });
        
        this.buttons.workBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.performWork(e.target.dataset.work);
            });
        });
    }

    startGame() {
        this.gameState = 'playing';
        this.showScreen('game');
        this.updateDisplay();
        this.audio.bgm.currentTime = 0;
        this.audio.bgm.play();
        this.scheduleRandomEvents();
    }

    resetGame() {
        this.currentTime = 0;
        this.health = 100;
        this.sanity = 100;
        this.score = 0;
        this.scaryLevel = 0;
        this.yamadaCounter = 0;
        this.ultimateHorrorCount = 0;
        this.isEventActive = false;
        this.currentCustomer = null;
        this.finalPhase = false;
        this.gameState = 'start';
        this.showScreen('start');
        this.gameElements.registerScreen.textContent = "ようこそ！";
        this.hideCustomer();
        
        // スタイルリセット
        document.body.style.background = '';
        document.body.style.filter = '';
        document.body.className = '';

        this.audio.bgm.pause();
        this.audio.bgm.currentTime = 0;
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        this.screens[screenName].classList.remove('hidden');
    }

    updateDisplay() {
        const hours = Math.floor(this.currentTime / 60);
        const minutes = this.currentTime % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.gameElements.timeDisplay.textContent = timeString;
        
        this.gameElements.healthFill.style.width = `${this.health}%`;
        this.gameElements.sanityFill.style.width = `${this.sanity}%`;
        
        if (this.health < 30) {
            this.gameElements.healthFill.classList.add('critical-health');
        }
        if (this.sanity < 30) {
            this.gameElements.sanityFill.style.background = 'linear-gradient(90deg, #9c27b0, #e91e63)';
            document.body.classList.add('low-sanity');
        } else {
            document.body.classList.remove('low-sanity');
        }
    }

    startGameLoop() {
        setInterval(() => {
            if (this.gameState === 'playing') {
                this.currentTime++;
                this.updateDisplay();
                this.checkGamePhase();
                this.checkGameEnd();
            }
        }, 10000 / this.timeMultiplier);
    }

    checkGamePhase() {
        const hours = Math.floor(this.currentTime / 60);
        const minutes = this.currentTime % 60;
        
        if (hours >= 3 && hours < 5 && this.scaryLevel === 0) {
            this.scaryLevel = 1;
            this.showEvent("午前3時になりました...\n\n『魔の時間』の始まりです\n店内の空気が重くなりました\n\n何かが... 始まります");
            this.triggerHorrorEffect('flicker');
        } else if (hours >= 5 && this.scaryLevel === 1) {
            this.scaryLevel = 2;
            this.showEvent("午前5時...\n\n監視カメラの映像が乱れています\n何かがあなたを見ています\n\n後ろを振り返らないでください");
            this.triggerHorrorEffect('static');
        } else if (hours >= 6 && this.scaryLevel === 2) {
            this.scaryLevel = 3;
            this.showEvent("午前6時...\n\n時計の針が震えています\n夜明けが来るのを拒んでいるように...\n\nもう逃れられません");
            this.triggerHorrorEffect('timeDistortion');
        } else if (hours >= 6 && minutes >= 30 && !this.finalPhase) {
            this.finalPhase = true;
            this.scaryLevel = 4;
            this.showEvent("午前6時30分...\n\n最後の30分です\nでも... 本当に夜明けは来るのでしょうか？\n\n外を見てください...\nまだ真っ暗です\n\n永遠の深夜が始まります");
            this.triggerHorrorEffect('finalPhase');
        }
        
        if (hours === 3 && minutes === 33) {
            this.triggerSpecialEvent('devil_time');
        } else if (hours === 4 && minutes === 44) {
            this.triggerSpecialEvent('death_time');
        } else if (hours === 6 && minutes === 66) {
            this.triggerSpecialEvent('time_bug');
        }
    }

    triggerSpecialEvent(type) {
        let message = "";
        switch(type) {
            case 'devil_time':
                message = "午前3時33分...\n\n悪魔の時間です\n店内に硫黄の匂いが...\n\n地獄の扉が開きました";
                this.triggerHorrorEffect('ultimateHorror');
                this.sanity -= 20;
                break;
            case 'death_time':
                message = "午前4時44分...\n\n死の時間です\n冷凍庫から呻き声が...\n\n死者が蘇ります";
                this.triggerHorrorEffect('ultimateHorror');
                this.health -= 15;
                break;
            case 'time_bug':
                message = "時計がバグしています\n6時66分...\n\n時間が壊れました\n現実が崩壊しています";
                this.triggerHorrorEffect('ultimateHorror');
                this.sanity -= 25;
                break;
        }
        this.showEvent(message);
    }

    scheduleRandomEvents() {
        const scheduleNext = () => {
            if (this.gameState === 'playing') {
                const delay = (Math.random() * 30000 + 15000) / this.timeMultiplier;
                setTimeout(() => {
                    this.triggerRandomEvent();
                    scheduleNext();
                }, delay);
            }
        };
        scheduleNext();
    }

    triggerRandomEvent() {
        if (this.isEventActive) return;
        
        const eventType = Math.random();
        
        if (eventType < 0.6) {
            this.spawnCustomer();
        } else if (eventType < 0.8) {
            this.triggerWorkEvent();
        } else {
            this.triggerStoryEvent();
        }
    }

    spawnCustomer() {
        if (this.currentCustomer) return;
        
        let customerPool;
        let specialEventChance = Math.random();
        
        if (this.scaryLevel >= 4 && specialEventChance < 0.2) {
            customerPool = this.customers.ultimate_boss;
        } else if (this.scaryLevel >= 3 && specialEventChance < 0.3) {
            if (this.yamadaCounter < 3 && specialEventChance < 0.15) {
                customerPool = this.customers.yamada;
                this.yamadaCounter++;
            } else if (this.finalPhase && specialEventChance < 0.1) {
                customerPool = this.customers.final_boss;
            } else {
                customerPool = this.customers.scary;
            }
        } else if (this.scaryLevel === 0) {
            customerPool = this.customers.normal;
        } else if (this.scaryLevel === 1) {
            customerPool = this.customers.strange;
        } else {
            customerPool = this.customers.scary;
        }
        
        const customer = customerPool[Math.floor(Math.random() * customerPool.length)];
        this.showCustomer(customer);
        
        if (this.scaryLevel >= 2) {
            this.sanity -= Math.floor(Math.random() * 15 + 5);
            this.sanity = Math.max(0, this.sanity);
        }
    }

    showCustomer(customer) {
        this.currentCustomer = customer;
        this.gameElements.customer.classList.remove('hidden');
        this.gameElements.customer.querySelector('.customer-sprite').textContent = customer.sprite;
        this.gameElements.customerSpeech.textContent = customer.speech;
        
        // 怖い客の特殊演出
        if (this.scaryLevel >= 2) {
            this.gameElements.customer.classList.add('customer-scary');
        }
        
        // コメント表示時間を300％長く（24秒）
        setTimeout(() => {
            if (this.currentCustomer === customer) {
                this.hideCustomer();
            }
        }, 24000 / this.timeMultiplier);
    }

    hideCustomer() {
        this.gameElements.customer.classList.add('hidden');
        this.gameElements.customer.classList.remove('customer-scary');
        this.currentCustomer = null;
    }

    triggerWorkEvent() {
        const messages = this.getPhaseMessages();
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.gameElements.registerScreen.textContent = message;
        
        // メッセージ表示時間も300％長く
        setTimeout(() => {
            this.gameElements.registerScreen.textContent = "お疲れ様です";
        }, 9000 / this.timeMultiplier);
    }

    triggerStoryEvent() {
        if (this.isEventActive) return;
        
        const messages = this.getPhaseMessages();
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.showEvent(message);
    }

    getPhaseMessages() {
        if (this.scaryLevel === 0) {
            return this.eventMessages.phase1;
        } else if (this.scaryLevel === 1) {
            return this.eventMessages.phase2;
        } else if (this.scaryLevel >= 4) {
            return this.eventMessages.ultimate_horror;
        } else {
            return this.eventMessages.phase3;
        }
    }

    performWork(workType) {
        if (this.isEventActive) return;
        
        let healthChange = 0;
        let sanityChange = 0;
        let message = "";
        let horrorEvent = false;
        let ultimateHorror = false;
        
        switch (workType) {
            case 'register':
                if (this.currentCustomer) {
                    if (this.currentCustomer.sprite.includes("💀") || this.currentCustomer.sprite.includes("🌑")) {
                        // 究極恐怖ボス
                        healthChange = -40;
                        sanityChange = -50;
                        message = `${this.currentCustomer.reaction}\n\n店内が地獄に変わります\n血の海が足元に広がり\n天井から死体が降ってきます\n\nあなたはもう人間ではありません`;
                        ultimateHorror = true;
                        this.ultimateHorrorCount++;
                    } else if (this.currentCustomer.sprite === "👨‍💼" || this.currentCustomer.sprite === "🤵" || this.currentCustomer.sprite === "👔") {
                        healthChange = -20;
                        sanityChange = -30;
                        message = `${this.currentCustomer.reaction}\n\nあなたの制服の名札が変わっています...\n『ヤマダ』と書いてあります`;
                        horrorEvent = true;
                    } else {
                        healthChange = this.scaryLevel >= 2 ? -5 : 5;
                        sanityChange = this.scaryLevel >= 2 ? -10 : 10;
                        message = `${this.currentCustomer.reaction}`;
                        if (this.scaryLevel >= 2) {
                            message += "\n\n...なぜかゾクゾクします";
                        }
                    }
                    this.score += 10;
                    this.hideCustomer();
                } else {
                    message = "お客様がいません\n\nでも... レジの音が聞こえます\nピッ... ピッ... ピッ...";
                    sanityChange = this.scaryLevel >= 1 ? -5 : 5;
                }
                break;
                
            case 'restock':
                // 究極恐怖イベント追加
                if (this.scaryLevel >= 3 && Math.random() < 0.25) {
                    const ultimateMessages = this.eventMessages.ultimate_horror;
                    healthChange = -30;
                    sanityChange = -35;
                    message = "商品補充中...\n\n" + ultimateMessages[Math.floor(Math.random() * ultimateMessages.length)] + "\n\n商品が全て肉の塊に変わりました\nあなたの手も... 血まみれです";
                    ultimateHorror = true;
                    this.ultimateHorrorCount++;
                } else if (this.scaryLevel >= 2 && Math.random() < 0.3) {
                    sanityChange = -15;
                    message = "商品補充中...\n\n棚の奥に赤い染みが...\nこれは... 血？\n\n商品が勝手に落ちました";
                    horrorEvent = true;
                    this.bloodEvents++;
                } else {
                    healthChange = -5;
                    sanityChange = this.scaryLevel >= 1 ? 0 : 5;
                    message = "商品補充完了";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n...誰かに見られている気がします";
                    }
                }
                this.score += 5;
                break;
                
            case 'clean':
                // 究極恐怖イベント追加
                if (this.scaryLevel >= 3 && Math.random() < 0.3) {
                    const ultimateMessages = this.eventMessages.ultimate_horror;
                    healthChange = -35;
                    sanityChange = -40;
                    message = "清掃中...\n\n" + ultimateMessages[Math.floor(Math.random() * ultimateMessages.length)] + "\n\nモップが人間の髪の毛で出来ています\n床から手が伸びてきます";
                    ultimateHorror = true;
                    this.ultimateHorrorCount++;
                } else if (this.scaryLevel >= 2 && Math.random() < 0.4) {
                    healthChange = -10;
                    sanityChange = -20;
                    message = "清掃中...\n\n床の汚れが血のように見えます\n拭いても拭いても...\n\nバックヤードから足音が...";
                    horrorEvent = true;
                    this.triggerHorrorEffect('bloodStain');
                } else {
                    healthChange = -10;
                    sanityChange = this.scaryLevel >= 1 ? 5 : 15;
                    message = "清掃完了";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n掃除してるのに... なぜか汚れが増えてる？";
                    }
                }
                this.score += 8;
                break;
                
            case 'coffee':
                if (this.scaryLevel >= 3 && Math.random() < 0.2) {
                    healthChange = -10;
                    sanityChange = -15;
                    message = "コーヒーを飲みました\n\n苦い... いつもより苦い...\n底に何か沈んでいます\n\n赤い... 何かが...";
                    horrorEvent = true;
                } else {
                    healthChange = this.scaryLevel >= 2 ? 5 : 15;
                    sanityChange = this.scaryLevel >= 2 ? 10 : 20;
                    message = "コーヒーで一休み";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n少し落ち着きましたが...\n誰かがこちらを見ています";
                    } else {
                        message += "\n元気が回復しました！";
                    }
                }
                break;
        }
        
        if (this.finalPhase) {
            healthChange = Math.floor(healthChange * 0.5);
            sanityChange = Math.floor(sanityChange * 0.3);
            if (!horrorEvent && !ultimateHorror && Math.random() < 0.5) {
                message += "\n\n時計が逆回りしています...\n時間が... 戻っている...";
                this.timeAnomalies++;
            }
        }
        
        this.health = Math.max(0, Math.min(100, this.health + healthChange));
        this.sanity = Math.max(0, Math.min(100, this.sanity + sanityChange));
        
        if (this.sanity <= 20) {
            message += "\n\n頭がクラクラします...\n現実と幻覚の境界が...\n曖昧になってきました...";
        }
        
        this.updateDisplay();
        this.showEvent(message);
        
        if (ultimateHorror) {
            this.triggerHorrorEffect('ultimateHorror');
        } else if (horrorEvent) {
            this.triggerHorrorEffect('general');
        }
    }

    showEvent(message) {
        this.isEventActive = true;
        this.gameElements.eventText.textContent = message;
        this.gameElements.eventMessage.classList.remove('hidden');
        
        // ホラーイベントの場合は特殊スタイリング
        if (this.scaryLevel >= 2) {
            this.gameElements.eventMessage.classList.add('horror');
        }
    }

    closeEvent() {
        this.gameElements.eventMessage.classList.add('hidden');
        this.gameElements.eventMessage.classList.remove('horror');
        this.isEventActive = false;
    }

    checkGameEnd() {
        if (this.currentTime >= 420 && !this.finalPhase) { 
            this.endGame('success');
            return;
        } else if (this.currentTime >= 450) {
            if (this.ultimateHorrorCount >= 3) {
                this.endGame('ultimate_horror_ending');
            } else if (this.yamadaCounter >= 3) {
                this.endGame('yamada_ending');
            } else {
                this.endGame('true_ending');
            }
            return;
        }
        
        if (this.health <= 0) {
            this.endGame('death');
            return;
        }
        
        if (this.sanity <= 0) {
            this.endGame('insanity');
            return;
        }
        
        if (this.ultimateHorrorCount >= 5) {
            this.endGame('ultimate_nightmare_ending');
            return;
        }
        
        if (this.yamadaCounter >= 3 && this.bloodEvents >= 2 && this.timeAnomalies >= 3) {
            this.endGame('horror_ending');
            return;
        }
    }

    endGame(reason) {
        this.gameState = 'end';
        
        let title = "";
        let message = "";
        
        switch (reason) {
            case 'success':
                title = "🌅 普通のエンディング";
                message = `無事に夜勤を完了しました\nスコア: ${this.score}点\n\nでも... 明日もここで働くのですか？\nまた深夜に... 一人で...`;
                break;
                
            case 'true_ending':
                title = "✨ 真のエンディング";
                message = `恐怖に打ち勝ちました！\nスコア: ${this.score}点\n\n朝日が昇ります\n店の呪いが解けたようです\n\nあなたは生還者です\n二度とここで働く必要はありません`;
                break;
                
            case 'yamada_ending':
                title = "👨‍💼 ヤマダエンディング";
                message = `スコア: ${this.score}点\n\n気がつくと制服の名札が...\n『ヤマダ』と書き換わっています\n\nあなたは何代目のヤマダでしょうか？\n\n明日もここで働きます\n深夜に... 永遠に...`;
                document.body.style.background = 'linear-gradient(135deg, #000000, #1a0000)';
                break;
                
            case 'horror_ending':
                title = "🩸 ホラーエンディング";
                message = `スコア: ${this.score}点\n\n全ての真実を知ってしまいました\n\n店の地下には...\n前のヤマダさんたちが...\n\nあなたも仲間入りです\n\n深夜のコンビニへ\nようこそ...`;
                document.body.style.background = 'linear-gradient(135deg, #330000, #660000)';
                break;
                
            case 'ultimate_horror_ending':
                title = "💀🩸 究極ホラーエンディング";
                message = `スコア: ${this.score}点\n\n究極の恐怖を体験しました\n\n店は地獄の入り口でした\n血の海に沈む店舗\n天井から降り注ぐ死体\n\nあなたは悪魔の従者となり\n永遠に魂を集め続けます\n\n次の獲物を... 待っています`;
                document.body.style.background = 'linear-gradient(135deg, #660000, #990000, #330000)';
                this.playHorrorSound('scream');
                break;
                
            case 'ultimate_nightmare_ending':
                title = "👹🔥 悪夢の極致エンディング";
                message = `スコア: ${this.score}点\n\n悪夢が現実となりました\n\n店全体が生きた肉塊となり\nあなたを消化しようとしています\n\n意識は残ったまま\n永遠に苦痛を味わい続けます\n\n助けを呼んでも...\n誰も来ません\n\nここは地獄の最下層\n絶望の淵です`;
                document.body.style.background = 'radial-gradient(circle, #990000, #660000, #330000, #000000)';
                this.playHorrorSound('scream');
                setTimeout(() => this.playHorrorSound('heartbeat'), 2000);
                break;
                
            case 'death':
                title = "💀 死亡エンディング";
                message = `体力が尽きました...\nスコア: ${this.score}点\n\n店内で倒れたあなたを\n翌朝、新しいヤマダさんが発見します\n\n『また一人... 消えたな』\n\nそしてヤマダさんは\nあなたの制服を片付けます`;
                document.body.style.background = 'linear-gradient(135deg, #1a0000, #000000)';
                break;
                
            case 'insanity':
                title = "🤪 狂気エンディング";
                message = `正気を失いました...\nスコア: ${this.score}点\n\n鏡の中の自分と会話しています\n『君も僕らの仲間だね』\n\nあなたは笑い続けています\n\n深夜のコンビニで\n永遠に...`;
                document.body.style.background = 'linear-gradient(135deg, #4a0080, #1a0040)';
                break;
        }
        
        this.gameElements.endTitle.textContent = title;
        this.gameElements.endMessage.textContent = message;
        this.showScreen('end');
        
        if (reason.includes('ultimate') || reason === 'yamada_ending' || reason === 'horror_ending' || reason === 'insanity') {
            setTimeout(() => {
                this.finalHorrorEffect();
            }, 2000);
        }
    }

    finalHorrorEffect() {
        const endScreen = this.screens.end;
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
            endScreen.style.filter = flickerCount % 2 === 0 ? 'invert(1) contrast(200%)' : 'invert(0)';
            flickerCount++;
            if (flickerCount > 20) {
                clearInterval(flickerInterval);
                endScreen.style.filter = 'invert(0)';
            }
        }, 200);
        
        this.playHorrorSound('static');
    }
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    new ConvenienceStoreGame();
});
