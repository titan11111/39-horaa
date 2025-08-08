class ConvenienceStoreGame {
    // 新しいメソッドを追加
    initHorrorSounds() {
        return {
            flicker: "チカチカ...",
            static: "ザザザ...",
            footsteps: "ドクドク...",
            whisper: "ささやき...",
            scream: "叫び声..."
        };
    }

    initHorrorEffects() {
        // 背景色の変化やエフェクトの準備
        this.originalBgColor = document.body.style.background;
    }

    triggerHorrorEffect(type) {
        const gameScreen = this.screens.game;

        switch (type) {
            case 'flicker':
                this.flickerEffect(gameScreen);
                break;
            case 'static':
                this.staticEffect(gameScreen);
                break;
            case 'bloodStain':
                this.bloodStainEffect();
                break;
            case 'mirror':
                this.mirrorEffect();
                break;
            case 'timeDistortion':
                this.timeDistortionEffect();
                break;
            case 'finalPhase':
                this.finalPhaseEffect();
                break;
            case 'general':
                this.generalHorrorEffect();
                break;
        }
    }

    flickerEffect(element) {
        let count = 0;
        const interval = setInterval(() => {
            element.style.filter = count % 2 === 0 ? 'brightness(0.3)' : 'brightness(1)';
            count++;
            if (count > 8) {
                clearInterval(interval);
                element.style.filter = 'brightness(1)';
            }
        }, 200);
    }

    staticEffect(element) {
        element.style.filter = 'contrast(150%) saturate(0%)';
        setTimeout(() => {
            element.style.filter = 'none';
        }, 2000);
    }

    bloodStainEffect() {
        document.body.style.background = 'linear-gradient(135deg, #1a0000, #330000)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
        }, 3000);
    }

    mirrorEffect() {
        console.log('mirror effect triggered');
    }

    timeDistortionEffect() {
        console.log('time distortion effect triggered');
    }

    finalPhaseEffect() {
        console.log('final phase effect triggered');
    }

    generalHorrorEffect() {
        console.log('general horror effect triggered');
    }

    // ゲーム状態管理
    constructor() {
        this.gameState = 'start'; // start, playing, end
        this.currentTime = 0; // ゲーム内時間（分）
        this.health = 100;
        this.sanity = 100;
        this.score = 0;
        this.events = [];
        this.currentCustomer = null;
        this.customerQueue = [];
        this.workQueue = [];
        this.isEventActive = false;

        // ホラー要素の制御
        this.scaryLevel = 0; // 0-4で段階的に怖さを増す
        this.yamadaCounter = 0; // ヤマダさんの出現回数
        this.mirrorEvents = 0; // 鏡関連イベント
        this.timeAnomalies = 0; // 時間異常の回数
        this.bloodEvents = 0; // 血関連イベント
        this.finalPhase = false; // 最終段階フラグ

        this.eventMessages = this.initEventMessages();
        this.customers = this.initCustomers();
        this.horrorSounds = this.initHorrorSounds();

        this.initElements();
        this.bindEvents();
        this.startGameLoop();
        this.initHorrorEffects();
    }

initElements() {
    // 画面要素の取得
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
        phase1: [ // 0:00-2:59 普通の業務だが不穏な兆候
            "お客さんが来ました... 顔が見えませんね",
            "商品の補充が必要です\n棚の奥に赤い染みが...",
            "店内が汚れています\nこの汚れ... 血のような色ですね",
            "コーヒーを飲んで休憩を\n苦い... いつもより苦い...",
            "レジの音が変です\nピッ... ピッ... ピッ...",
            "電話が鳴っています\n出ても誰も話しません"
        ],
        phase2: [ // 3:00-4:59 明らかな異常
            "客が同じ人ばかり来ます...\n全員同じ顔... 同じ服...",
            "監視カメラに映る影\nあなたの後ろに... 誰かいます",
            "店の電気が点滅しています\nS.O.S... S.O.S... S.O.S...",
            "外から足音が聞こえます\n窓を見ないでください",
            "商品が勝手に動いています\n棚から... 落ちて... 割れて...",
            "バックヤードのドアが開いています\n中から呼ぶ声が聞こえます",
            "レジの画面にメッセージが\n『助けて... 私を... 助けて...』"
        ],
        phase3: [ // 5:00-6:59 恐怖のクライマックス
            "お客が消えません！\n何度レジを通しても... 消えない...",
            "鏡に映る自分が笑っています\nなぜ... 笑っているんですか？",
            "店内に血の跡が...\n足跡が... あなたの足跡です",
            "同僚のヤマダさんが来ました\nでも... ヤマダさんは昨日...",
            "時計が逆回りしています\n時間が... 戻っている...",
            "あなたの声が聞こえます\n『助けて... 誰か... 助けて...』",
            "もうすぐ夜明けです...\nでも... 本当に夜明けは来るのでしょうか？",
            "店の外に人だかりが...\n全員こちらを見ています\n全員... あなたの顔です"
        ],
        yamada_events: [ // ヤマダさん関連の特殊イベント
            "新しい店長のヤマダです\n前のヤマダはどこに行ったのでしょうね？",
            "ヤマダという名前\n何人目のヤマダでしょうか？",
            "あなたもいずれヤマダになります\nみんな... ヤマダになるんです",
            "制服に名札が...\n『ヤマダ』と書いてあります\nいつから？"
        ],
        final_events: [ // 6:30以降の最終段階
            "夜明けまであと30分...\nでも外はまだ真っ暗です",
            "時計の針が震えています\n7時を指すのを拒んでいます",
            "あなたの制服が変わっています\n名札に『ヤマダ』と...",
            "店の入り口から歌声が\n『♪深夜のコンビニ 永遠に♪』",
            "最後のお客様です\nそれは... 鏡の中のあなたでした"
        ]
    };
}

initCustomers() {
    return {
        normal: [
            { sprite: "😊", speech: "こんばんは... 深夜のお仕事大変ですね", reaction: "ありがとう... また来ます" },
            { sprite: "🧑", speech: "いつもここで働いてるんですか？", reaction: "前のヤマダさんはどこに？" },
            { sprite: "👩", speech: "この店、昔から変わらないですね", reaction: "時間が止まったみたい..." },
            { sprite: "👴", speech: "若いのに深夜勤務とは... 気をつけなさい", reaction: "この店は危険だ..." }
        ],
        strange: [
            { sprite: "😐", speech: "...いつも同じ時間に来てます", reaction: "...いつも同じ商品を..." },
            { sprite: "🤔", speech: "この店のヤマダさん、何人いるんですか？", reaction: "みんなヤマダになるんです" },
            { sprite: "😟", speech: "あなた、鏡を見ましたか？", reaction: "鏡の中の自分... 笑ってませんか？" },
            { sprite: "👻", speech: "深夜3時は危険な時間...", reaction: "時間が... 逆に回り始めます" },
            { sprite: "🔴", speech: "監視カメラ、見てますか？", reaction: "映ってはいけない物が..." },
            { sprite: "⚫", speech: "バックヤードに入ってはいけません", reaction: "前のヤマダさんがまだ..." }
        ],
        scary: [
            { sprite: "😨", speech: "助けて... 私もヤマダになってしまう...", reaction: "逃げられない... 逃げられない..." },
            { sprite: "👤", speech: "ここから出られません... もう7年も...", reaction: "あなたも... 仲間になりますね" },
            { sprite: "🩸", speech: "血の匂いがしませんか？", reaction: "バックヤードから... ずっと..." },
            { sprite: "💀", speech: "夜明けは来ません... 永遠に深夜です", reaction: "時計を見てください... 逆回りを" },
            { sprite: "👁️", speech: "あなたを見てる目があります", reaction: "監視カメラの向こうから..." },
            { sprite: "🌑", speech: "外を見てはいけません", reaction: "あなたの顔をした人たちが..." },
            { sprite: "⚰️", speech: "前のヤマダさんを知ってますか？", reaction: "冷凍庫の中に..." },
            { sprite: "😈", speech: "制服の名札... 見てください", reaction: "いつの間に『ヤマダ』に..." }
        ],
        yamada: [
            { sprite: "👨‍💼", speech: "新任のヤマダです... 何代目でしょうか？", reaction: "あなたが次のヤマダです" },
            { sprite: "🤵", speech: "ヤマダという名前... 呪われているんです", reaction: "みんなヤマダになるんです" },
            { sprite: "👔", speech: "この制服を着ると... ヤマダになるんです", reaction: "もう逃れられません" }
        ],
        final_boss: [
            { sprite: "🪞", speech: "鏡の中から来ました... あなたです", reaction: "一緒にヤマダになりましょう" },
            { sprite: "⏰", speech: "時間は止まりました... 永遠の深夜です", reaction: "夜明けは来ません" },
            { sprite: "🔄", speech: "これは夢ではありません... 現実です", reaction: "ようこそ、ヤマダさん" }
        ]
    };
}

bindEvents() {
    // スタートボタン
    this.buttons.start.addEventListener('click', () => {
        this.startGame();
    });
    
    // リスタートボタン
    this.buttons.restart.addEventListener('click', () => {
        this.resetGame();
    });
    
    // イベントOKボタン
    this.buttons.eventOk.addEventListener('click', () => {
        this.closeEvent();
    });
    
    // 作業ボタン
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
    this.scheduleRandomEvents();
    this.audio.bgm.play();
}

resetGame() {
    this.currentTime = 0;
    this.health = 100;
    this.sanity = 100;
    this.score = 0;
    this.scaryLevel = 0;
    this.isEventActive = false;
    this.currentCustomer = null;
    this.gameState = 'start';
    this.showScreen('start');
    this.audio.bgm.pause();
    this.audio.bgm.currentTime = 0;
    this.gameElements.registerScreen.textContent = "ようこそ！";
    this.hideCustomer();
}

showScreen(screenName) {
    Object.values(this.screens).forEach(screen => {
        screen.classList.add('hidden');
    });
    this.screens[screenName].classList.remove('hidden');
}

updateDisplay() {
    // 時間表示の更新
    const hours = Math.floor(this.currentTime / 60);
    const minutes = this.currentTime % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    this.gameElements.timeDisplay.textContent = timeString;
    
    // ステータスバーの更新
    this.gameElements.healthFill.style.width = `${this.health}%`;
    this.gameElements.sanityFill.style.width = `${this.sanity}%`;
    
    // 体力や正気度に応じた色の変化
    if (this.health < 30) {
        this.gameElements.healthFill.style.background = 'linear-gradient(90deg, #ff3742, #ff5722)';
    }
    if (this.sanity < 30) {
        this.gameElements.sanityFill.style.background = 'linear-gradient(90deg, #9c27b0, #e91e63)';
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
    }, 10000); // 10秒 = ゲーム内1分
}

checkGamePhase() {
    const hours = Math.floor(this.currentTime / 60);
    const minutes = this.currentTime % 60;
    
    // フェーズの更新
    if (hours >= 3 && hours < 5 && this.scaryLevel === 0) {
        this.scaryLevel = 1;
        this.showEvent("午前3時になりました...\n\n『魔の時間』の始まりです\n店内の空気が重くなりました");
        this.triggerHorrorEffect('flicker');
    } else if (hours >= 5 && this.scaryLevel === 1) {
        this.scaryLevel = 2;
        this.showEvent("午前5時...\n\n監視カメラの映像が乱れています\n何かがあなたを見ています");
        this.triggerHorrorEffect('static');
    } else if (hours >= 6 && this.scaryLevel === 2) {
        this.scaryLevel = 3;
        this.showEvent("午前6時...\n\n時計の針が震えています\n夜明けが来るのを拒んでいるように...");
        this.triggerHorrorEffect('timeDistortion');
    } else if (hours >= 6 && minutes >= 30 && !this.finalPhase) {
        this.finalPhase = true;
        this.scaryLevel = 4;
        this.showEvent("午前6時30分...\n\n最後の30分です\nでも... 本当に夜明けは来るのでしょうか？\n\n外を見てください...\nまだ真っ暗です");
        this.triggerHorrorEffect('finalPhase');
    }
    
    // 特定時刻のイベント
    if (hours === 3 && minutes === 33) {
        this.triggerSpecialEvent('devil_time');
    } else if (hours === 4 && minutes === 44) {
        this.triggerSpecialEvent('death_time');
    } else if (hours === 6 && minutes === 66) { // 意図的なバグ表現
        this.triggerSpecialEvent('time_bug');
    }
}

scheduleRandomEvents() {
    const scheduleNext = () => {
        if (this.gameState === 'playing') {
            const delay = Math.random() * 30000 + 15000; // 15-45秒
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
    
    // 特殊イベント判定
    if (this.scaryLevel >= 3 && specialEventChance < 0.3) {
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
    
    // 怖いお客さんの場合、SAN値を減らす
    if (this.scaryLevel >= 2) {
        this.sanity -= Math.floor(Math.random() * 10 + 5);
        this.sanity = Math.max(0, this.sanity);
    }
}

showCustomer(customer) {
    this.currentCustomer = customer;
    this.gameElements.customer.classList.remove('hidden');
    this.gameElements.customer.querySelector('.customer-sprite').textContent = customer.sprite;
    this.gameElements.customerSpeech.textContent = customer.speech;
    
    // 自動で去る
    setTimeout(() => {
        if (this.currentCustomer === customer) {
            this.hideCustomer();
        }
    }, 8000);
}

hideCustomer() {
    this.gameElements.customer.classList.add('hidden');
    this.currentCustomer = null;
}

triggerWorkEvent() {
    const messages = this.getPhaseMessages();
    const message = messages[Math.floor(Math.random() * messages.length)];
    this.gameElements.registerScreen.textContent = message;
    
    setTimeout(() => {
        this.gameElements.registerScreen.textContent = "お疲れ様です";
    }, 3000);
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
    
    switch (workType) {
        case 'register':
            if (this.currentCustomer) {
                // ヤマダ関連の特殊処理
                if (this.currentCustomer.sprite === "👨‍💼" || this.currentCustomer.sprite === "🤵" || this.currentCustomer.sprite === "👔") {
                    healthChange = -20;
                    sanityChange = -30;
                    message = `${this.currentCustomer.reaction}\n\nあなたの制服の名札が変わっています...\n『ヤマダ』と書いてあります`;
                    horrorEvent = true;
                } else if (this.currentCustomer.sprite === "🪞" || this.currentCustomer.sprite === "⏰" || this.currentCustomer.sprite === "🔄") {
                    // 最終ボス級の客
                    healthChange = -30;
                    sanityChange = -40;
                    message = `${this.currentCustomer.reaction}\n\n鏡を見てください...\n映っているのは本当にあなたですか？`;
                    horrorEvent = true;
                    this.triggerHorrorEffect('mirror');
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
            healthChange = -5;
            if (this.scaryLevel >= 2 && Math.random() < 0.3) {
                sanityChange = -15;
                message = "商品補充中...\n\n棚の奥に赤い染みが...\nこれは... 血？\n\n商品が勝手に落ちました";
                horrorEvent = true;
                this.bloodEvents++;
            } else {
                sanityChange = this.scaryLevel >= 1 ? 0 : 5;
                message = "商品補充完了";
                if (this.scaryLevel >= 1) {
                    message += "\n\n...誰かに見られている気がします";
                }
            }
            this.score += 5;
            break;
            
        case 'clean':
            healthChange = -10;
            if (this.scaryLevel >= 2 && Math.random() < 0.4) {
                sanityChange = -20;
                message = "清掃中...\n\n床の汚れが血のように見えます\n拭いても拭いても...\n\nバックヤードから足音が...";
                horrorEvent = true;
                this.triggerHorrorEffect('bloodStain');
            } else {
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
    
    // 最終フェーズでは全ての行動が不安定
    if (this.finalPhase) {
        healthChange = Math.floor(healthChange * 0.5);
        sanityChange = Math.floor(sanityChange * 0.3);
        if (!horrorEvent && Math.random() < 0.5) {
            message += "\n\n時計が逆回りしています...\n時間が... 戻っている...";
            this.timeAnomalies++;
        }
    }
    
    this.health = Math.max(0, Math.min(100, this.health + healthChange));
    this.sanity = Math.max(0, Math.min(100, this.sanity + sanityChange));
    
    // SAN値が低いときの追加効果
    if (this.sanity <= 20) {
        message += "\n\n頭がクラクラします...\n現実と幻覚の境界が...\n曖昧になってきました...";
    }
    
    this.updateDisplay();
    this.showEvent(message);
    
    if (horrorEvent) {
        this.triggerHorrorEffect('general');
    }
}

showEvent(message) {
    this.isEventActive = true;
    this.gameElements.eventText.textContent = message;
    this.gameElements.eventMessage.classList.remove('hidden');
}

closeEvent() {
    this.gameElements.eventMessage.classList.add('hidden');
    this.isEventActive = false;
}

checkGameEnd() {
    // 朝7時になったら終了（但し最終フェーズでは時間が歪む）
    if (this.currentTime >= 420 && !this.finalPhase) { 
        this.endGame('success');
        return;
    } else if (this.currentTime >= 450) { // 7時30分まで延長される場合
        if (this.yamadaCounter >= 3) {
            this.endGame('yamada_ending');
        } else {
            this.endGame('true_ending');
        }
        return;
    }
    
    // 体力が0になったら終了
    if (this.health <= 0) {
        this.endGame('death');
        return;
    }
    
    // 正気度が0になったら終了
    if (this.sanity <= 0) {
        this.endGame('insanity');
        return;
    }
    
    // 特殊条件：ヤマダイベントを全て見た場合
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
    
    // エンディングに応じた最終演出
    if (reason === 'yamada_ending' || reason === 'horror_ending' || reason === 'insanity') {
        setTimeout(() => {
            this.finalHorrorEffect();
        }, 2000);
    }
}

finalHorrorEffect() {
    const endScreen = this.screens.end;
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        endScreen.style.filter = flickerCount % 2 === 0 ? 'invert(1)' : 'invert(0)';
        flickerCount++;
        if (flickerCount > 10) {
            clearInterval(flickerInterval);
            endScreen.style.filter = 'invert(0)';
        }
    }, 300);
}
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
new ConvenienceStoreGame();
});