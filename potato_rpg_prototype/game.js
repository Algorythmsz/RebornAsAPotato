let state = {
  evidence: [],
  flags: {}
};
let currentSceneName = "start";
let dialogueIndex = 0;
const SLIME_MAX_HP = 100;
const ENDING_RINGTONE_PATH = "assets/ringtone.mp3";
const ENDING_BGM_PATH = "assets/ending.mp3";
const ENDING_CALL_VOICE_PATH = "assets/birthday.wav";
const BASE_DIALOGUE_BOX_HEIGHT = 160;
const BASE_CHARACTER_BOTTOM = 190;

const bgColors = {
  room: "assets/start.png",
  livingroom: "assets/livingroom.png",
  childhood: "assets/youthroom.png",
  teen: "assets/karls.png",
  university: "assets/uni.png",
  battle: "assets/battle.png",
  plane: "assets/plane.png",
  seoul: "assets/seoul.png",
  black: "#000"
};

const placeholderImages = {
  earmuff:"earmuff.png",
  woodsword:"woodsword_pixel.png",
  matiz:"matiz.png",
  hoop:"hoop.png",
  maki:"maki.jpg",
  diary:"diary.png",
  graduate:"graduate.png",
  wine:"wine.png",
  potato: "potato.png",
  slime: "slime.png",
  normal: "",
  friend: "",
  annonymous: "annonymous.png",
  annonymous2: "slimeblack.png",
};

const scenes = {
  start: {
    bg: "room",
    dialogues:[
       {speaker: "???", text: "푸데데...푸데데...아우...지금이 몇 시지?", char: "annonymous"},
       {speaker: "나레이션", text: "휴대폰을 켠다."},
       {speaker: "???", text: "아직 12시네...", char: "annonymous"},
       {speaker: "나레이션", text: "휴대폰 액정 위로 비친 내 모습이 심상치 않다."},
       {speaker: "쟈가이모", text: "아니, 이게 뭐야!!! 내 얼굴이 감자잖아??? 어? 이게 대체 어떻게 된 일이지???", char: "potato"},
    ],
    choices: [
      { text: "비명을 지른다", next: "scream" },
      { text: "숨을 고르고 거실로 나간다", next: "livingroom" }
    ]
  },

  scream: {
    bg: "room",
    char: "potato",
    speaker: "쟈가이모",
    text: "으아아악! (하지만 아무 일도 일어나지 않았다.)",
    choices: [
      { text: "거실로 나간다", next: "livingroom" }
    ]
  },

  livingroom: {
    bg: "livingroom",
    dialogues:[
      {speaker: "나레이션", text: "거실에 누군가 있다.", char: "annonymous2"},
       {speaker: "쟈가이모", text: "뭐야! 당신 누군데 왜 우리집에 있는거야!", char: "potato"},
       {speaker: "슬라임 대왕", text: "하하하, 이제서야 날 발견한 모양이군.", char: "slime"},
       {speaker: "슬라임 대왕", text: "나는 위대한 슬라임 대왕님이시다. 너를 감자로 변하게 만든 장본인이시지.", char: "slime"},
       {speaker: "쟈가이모", text: "뭐?? 날 이렇게 만들다니 가만두지 않겠어. 내 별명이 마키인 걸 모르나보구나?", char: "potato"},
       {speaker: "나레이션", text: "마키라는 말에 슬라임 대왕이 살짝 움찔한다."},
       {speaker: "슬라임 대왕", text: "원래 얼굴을 되찾고 싶다면, 방들을 구석구석 뒤져 무기를 모아와서 이 몸을 무찔러야 할 것이야!", char: "slime"},
       {speaker: "슬라임 대왕", text: "그럼 건투를 빌지, 감자여.", char: "slime"},
       {speaker: "나레이션", text: "펑 소리와 함께 슬라임 대왕이 사라졌다."},
       {speaker: "쟈가이모", text: "이게 대체 무슨 일인거지...어이 없네. 너는 가짜 어이 없음. 나는 진짜 어이 없음. 아무튼 얼른 단서들을 찾아 무찔러주지.", char: "potato"},
    ],
    choices: [
      { text: "첫번째 방으로 간다", next: "childhood" }
    ]
  },

  childhood: {
    bg: "childhood",
    speaker: "나레이션",
    text: "첫 번째 방. 어린 시절의 기억들이 어지럽게 흩어져 있다. 먼지 쌓인 액자, 귀마개, 장난감 상자, 긴 나무 상자가 보인다.",
    choices: [
      { text: "액자를 조사한다", next: "youthpic" },
      { text: "귀마개를 조사한다", next: "earmuff" },
      { text: "장난감 상자를 열어본다", next: "matiz" },
      { text: "나무 상자를 열어본다", next: "gumdo" },
      { text: "두번째 방으로 간다", next: "teen", needAll: ["목검", "황금 마티즈", "장꾸력"], autoCollect: ["목검", "황금 마티즈", "장꾸력"] }
    ]
  },

  youthpic: {
    bg: "childhood",
    bgOverlays: [
      {
        src: "assets/baby_jiw.png",
        width: "180px",
        left: "24%",
        top: "16%",
        opacity: 0.9,
        rotation: -8
      },
      {
        src: "assets/baby2.png",
        width: "180px",
        right: "22%",
        top: "18%",
        opacity: 0.9,
        rotation: 7
      }
    ],
    speaker: "나레이션",
    text: "장꾸 사진을 발견했다! 사진이 무지하게 귀엽다...헤헤. 「장꾸력」을 얻었다 ",
    evidence: "장꾸력",
    choices: [
      { text: "돌아간다", next: "childhood" }
    ]
  },

  earmuff: {
    bg: "childhood",
    dialogues: [
      { speaker: "나레이션", text: "귀마개를 끼자 어릴 적 흥얼거리던 노래가 들린다.", char: "earmuff"},
      { speaker: "쟈가이모", text: "오...오랜만에 듣는 노래네. 꽤괜인데? 반갑잖아?!", char: "earmuff"},
    ],
    choices: [
      { text: "돌아간다", next: "childhood" }
    ]
  },

  matiz: {
    bg: "childhood",
    dialogues: [
      {speaker: "나레이션", text: "장난감 상자 안에서 황금색 마티즈 미니카를 발견했다. 「황금 마티즈」를 얻었다.", char: "matiz"}
    ],
    evidence: "황금 마티즈",
    choices: [
      { text: "돌아간다", next: "childhood" }
    ]
  },

  gumdo: {
    bg: "childhood",
    dialogues: [
      {speaker: "나레이션", text: "검도 학원을 다닐 때 사용했던 목검이 들어있다. 왠지 이걸로 슬라임을 벨 수 있을 것 같다. 「목검」을 얻었다.", char: "woodsword"}
    ],
    evidence: "목검",
    choices: [
      { text: "돌아간다", next: "childhood" }
    ]
  },

  teen: {
    bg: "teen",
    speaker: "나레이션",
    text: "두 번째 방. 자세히 보니 칼스루에에서 살던 방이다. 낡은 애니 포스터, 줄넘기와 훌라후프가 놓여 있다.",
    choices: [
      { text: "낡은 애니 포스터를 자세히 들여다 본다", next: "anime" },
      { text: "줄넘기와 훌라후프를 해본다", next: "jump" },
      
      { text: "이전 방으로 돌아간다", next: "childhood" },
      { text: "세번째 방으로 간다", next: "university", needAll: ["천여주박"], autoCollect: ["천여주박"] },
    ]
  },

  anime: {
    bg: "teen",
    dialogues: [
      {char:"maki", speaker: "나레이션", text: "낡은 애니 포스터 뒤에 숨겨진 문구가 있다. '지우야, 사실 너는 피지컬 기프티드야...반드시 명심해.' 「천여주박」을 얻었다."}
    ], 
    evidence: "천여주박",
    choices: [
      { text: "돌아간다", next: "teen" }
    ]
  },

  jump: {
    bg: "teen",
    dialogues: [
      {char: "hoop", speaker: "나레이션", text: "오랜만에 줄넘기를 넘고, 훌라후프를 돌리니 건강해진 기분이다.",}
    ], 
    choices: [
      { text: "돌아간다", next: "teen" }
    ]
  },

  university: {
    bg: "university",
    speaker: "나레이션",
    text: "세 번째 방. 마치 대학생 시절의 방 같다. 일기장, 와인, 대학 졸업장이 있다.",
    choices: [
      { text: "일기장을 펼쳐본다", next: "diary" },
      { text: "와인을 마신다", next: "wine" },
      { text: "대학 졸업장을 펼친다", next: "graduate"},
      { text: "이전 방으로 돌아간다", next: "teen"},
      { text: "결투하러 가기", next: "battleIntro", needAll: ["[메모] 슬라임의 약점 - 볼", "보고싶은 마음"], autoCollect: ["[메모] 슬라임의 약점 - 볼", "보고싶은 마음"] },
    ]
  },

  diary: {
    bg: "university",
    dialogues :[
      { speaker: "나레이션", text: "일기장을 펼쳐보니 메모 한 장이 떨어졌다. 메모에는 '슬라임의 급소는 탱글한 볼이야...마치 나처럼...'라고 적혀있었다.", char: "diary"},
      { speaker: "나레이션", text: "「[메모] 슬라임의 약점 - 볼」을 얻었다.", char: "diary"}
    ],
    evidence: "[메모] 슬라임의 약점 - 볼",
    choices: [
      { text: "돌아간다", next: "university" }
    ]
  },

  graduate: {
    bg: "university",
    dialogues: [
      { speaker: "나레이션", text: "졸업장 안에 승원이가 쓴 축하 편지가 들어있다.", char: "graduate" },
      { speaker: "편지", text: "'졸업 축하해, 지우야. 한국 오면 꼭 맛있는거 같이 먹자. 고생 많이 했어. 난 지우가 잘 해낼 줄 알고 있었어. 그럼 나는 이제 졸업 기념 축하 파티를 기획해보러 갈게 쿸쿸. -승원이가'", char: "graduate" },
    ],
    choices: [
      { text: "돌아간다", next: "university" }
    ]
  },


  wine: {
    bg: "university",
    dialogues:
    [
      {speaker: "나레이션", text: "와인을 마셨다. 취기가 올라 기분이 좋아졌다. 한 병을 더 마시고 싶어졌다.", char: "wine",},
      {speaker: "쟈가이모", text: "아, 지금 승원이가 있다면 같이 마실 수 있어서 참 좋을텐데...보고싶네.", char: "potato",},
      {speaker: "나레이션", text: "「승원이를 보고싶은 마음」을 얻었다.", char: "wine"},
    ],
    evidence: "승원이를 보고싶은 마음",
    choices: [
      { text: "돌아간다", next: "university" }
    ]
  },


  battleIntro: {
    bg: "battle",
    dialogues:[
      { speaker: "슬라임 대왕", text: "쿸쿸. 수미 감자가 된 기분이 어떠냐? 얼굴을 되찾고 싶다면 나를 무찔러 보시지! 결투다!", char: "slime",},
      { speaker: "슬라임 대왕", text: "너는 내가 내는 질문에 대답을 하면 된다. 그럼 시작해볼까?", char: "slime",},
    ],
    choices: [
      { text: "결투 시작", next: "battle1" }
    ]
  },

  battle1: {
    bg: "battle",
    char: "slime",
    speaker: "슬라임 대왕",
    text: "첫 번째 질문이다. 검도 학원에 다닐 때 뭘 찾으면 관장님을 때릴 수 있었지?",
    choices: [
      { text: "목검을 제시한다", next: "badEvidence"},
      { text: "귀마개를 제시한다", next: "badEvidence" },
      { text: "황금 마티즈를 제시한다", next: "battle2", need: "황금 마티즈", damage: 25 }
    ]
  },

  battle2: {
    bg: "battle",
    dialogues:
    [
      {speaker: "쟈가이모", text: "바로 이 황금마티즈지! 일로와, 너도 한 대 맞자 (퍽퍽)", char: "potato",},
      {speaker: "나레이션", text: "슬라임이 코피를 흘린다."},
      {speaker: "쟈가이모", text: "콱, 까불고 있어. 내 이두 맛이 어때?", char: "potato",},
      { speaker: "슬라임 대왕", text: "아니,,,아무렇지도 않다 (코피를 흘리며).", char: "slime",},
      { speaker: "슬라임 대왕", text: "너는 결코 다시 인간으로 돌아갈 수 없다!", char: "slime"},
    ],
    choices: [
      { text: "계속 혼쭐내기", next: "battle3" }
    ]
  },

  battle3: {
    bg: "battle",
    dialogues:
    [
    {speaker: "쟈가이모", text: "어쭈? 내 능력 맛 좀 봐야겠구만? 천여주박 각성!", char: "potato",},
    ],
    
    choices: [
      { text: "천여주박을 각성한다", next: "battle4", need: "천여주박" },
    ]
  },

  funnyAttack1: {
    bg: "battle",
    dialogues: [

    {speaker: "슬라임 대왕", text: "크악!!! 이런..대체 내 약점을 어떻게 알았지? 역시 마키인가... ", char: "slime",},
    {speaker: "쟈가이모", text: "이걸로 끝내긴 부족하지. 다음은 이 공격이다!", char: "potato",},
    ],
    choices: [
      { text: "장꾸력 각성하기", next: "funnyAttack2"},
    ]
  },

  funnyAttack2: {
    bg: "battle",
    dialogues: [
    {speaker: "쟈가이모", text: "너 슬라임이 아니고 사실 퉁퉁이 아니야? 퉁퉁인 줄 알았는데...아, 자세히 보니까 할아버진가?? 흰머리 많잖아.아니면 혹시 타카바? 쿸쿸", char: "potato"},
    {speaker: "나레이션", text: "슬라임이 크게 흔들린다.", damage: 35},
    {speaker: "슬라임 대왕", text: "아니, 갑자기 인신공격하는게 어딨어! 어이 없네. 싸울 맛이 안 나. 나 안싸울래. 그래 네가 이겼다...", char: "slime",},
    ],
    choices: [
      { text: "결투 마무리 짓기", next: "battleWin"},
    ]
  },

  battle4: {
    bg: "battle",
    char: "potato",
    dialogues:
    [
    { speaker: "쟈가이모", text: "나 천여주박인거 몰라?. 넌 이제 죽었다. 나한텐 해동검도 목검도 있다고!", char: "potato",},
    {speaker: "나레이션", text: "첫번째 방에서 찾은 「목검」을 장착했다."},
    { speaker: "쟈가이모", text: "훗, 네 약점은 나처럼 탱글탱글한 볼이지? 다 알고 있다고 ~ 다음은 볼따구 베기 공격 간다!", char: "potato",},
    ],
    
    choices: [
      { text: "볼따구 베기", next: "funnyAttack1", damage: 40},
    ]
  },

  badEvidence: {
    bg: "battle",
    char: "slime",
    speaker: "슬라임 대왕",
    text: "하하, 아무렇지도 않은데? 요아이하군. 역시 넌 다시 돌아갈 수 없어. 다시 해보시지!",
    choices: [
      { text: "다른 공격을 선택하기", next: "battle1" },
    ]
  },

  battleWin: {
    bg: "battle",
    dialogues: [
      {speaker: "슬라임 대왕", text: "크흑...내가 졌으니 약속대로 네 얼굴을 돌려주겠다!", char: "slime",},
      { speaker: "슬라임 대왕", text: "여기 빛 속으로 들어가라. 오랜만에 좋은 싸움이었군. 역시 강하다 넌.", char: "slime",},
      { speaker: "쟈가이모", text: "마키한테 까불면 큰 코 다치는거야. 다음부턴 까불지마. 혼난다. 안녕 ~", char: "potato",},
    ],
    choices: [
      { text: "빛 속으로 들어간다", next: "plane" }
    ]
  },

  plane: {
    bg: "plane",
    char: "normal",
    dialogues: [
      {speaker: "지우", text: "(눈을 떠보니 비행기 안이다. 깜박 졸았던 걸까? 어? 그런데 손에 작은 감자 부스러기가 붙어 있다.)"},
      {speaker: "안내방송", text: "후후 (마이크에 바람부는 소리). 승객 여러분, 저희는 잠시후 인천공항에 착륙하겠습니다."},
    ],
    choices: [
      { text: "인천공항에 착륙하기", next: "seoul" }
    ]
  },

  seoul: {
    bg: "seoul",
    char: "friend",
    dialogues: [
      {speaker: "나레이션", text: "며칠 후..."},
      {speaker: "나레이션", text: "남산타워와 한강이 보이는 한 레스토랑. 지우는 와인을 마시며 비행기에서 있었던 일을 말한다."},
      {speaker: "승원", text: "응? 그게 무슨 말이야 ㅋㅋㅋㅋ 그니까 너가 감자였고, 슬라임이 뭐...?? 그거 참 요상한 꿈이네. 웃기다."},
      {speaker: "지우", text: "(아니, 진짠데...)"},
      {speaker: "승원", text: "그래도 다행이야, 네가 무사히 한국에 돌아와서. 얼마나 보고싶었다고. 이젠 다시 내 곁을 떠나지마."},
      {speaker: "지우", text: "알겠어. 내가 있을게."},
      {speaker: "승원", text: "응 우리 같이 재밌게 놀자. 내가 얼마나 이 시간을 기다려왔다고. 자, 이제 소원 빌고 얼른 초 불어."},
    ],
    choices: [
      { text: "소원을 빌고 생일 케이크에 초를 분다", next: "birthday" }
    ]
  },

  birthday: {
    bg: "seoul",
    char: "normal",
    dialogues: [
      {speaker: "나레이션", text: "케이크의 초가 꺼졌다."},
      {speaker: "승원", text: "생일 축하해, 지우야. 자, 이건 생일 선물이야. 편지 읽어볼래?"},
    ],
    choices: [
      { text: "편지를 읽는다", next: "letter" }
    ]
  },

  letter: {
    bg: "seoul",
    char: "normal",
    dialogues: [
      {speaker: "편지", text: "네 소중한 24번째 생일을 축하해, 지우야. 난 네가 감자가 되어도, 우리 앞에 무서운 슬라임이 나타나도, 언제까지나 네 곁에서 널 사랑할거야. 슬라임을 무찌르는 동안 너와 우리의 추억을 다시 돌아봤었으면 좋겠어. 많이 좋아해. 다시 한 번 더 네 24번째 생일을 축하해. -승원이가"},
      {speaker: "승원", text: "사실 네가 겪은 건 꿈이 아니라 내가 기획한 가상현실이었어. 어땠어? 재밌었어?"},
      {speaker: "승원", text: "하도 너가 자기를 쟈가이모라고 해서 한 번 혼쭐내주고 싶기도 했고, 생일 때 좀 특별한 기억을 만들어 주고 싶었어 ㅎㅎ."},
      {speaker: "승원", text: "자, 우리 짠 하자. 지우의 24번째 생일을 진심으로 축하해!"},
      {speaker: "나레이션", text: "두 와인잔이 부딪친다."},
    ],
    choices: [
      { text: "엔딩 보기", next: "endingCall" }
    ]
  },

  endingCall: {
    bg: "university",
    char: "normal",
    dialogues: [
      { speaker: "나레이션", text: "다시 뮌헨의 어느 자취방." },
      { speaker: "나레이션", text: "갑자기 전화벨이 울린다." },
      { speaker: "지우", text: "어? 누구지...?" }
    ],
    choices: [
      { text: "전화를 받는다", next: "endingBlack", action: "answerCall" }
    ]
  },

  endingBlack: {
    bg: "black",
  },

  ending: {
    bg: "black",
  }
};

function addEvidence(item) {
  if (!state.evidence.includes(item)) {
    state.evidence.push(item);
  }
}

function hasEvidence(item) {
  return state.evidence.includes(item);
}

function hasAllEvidence(items) {
  return items.every(item => state.evidence.includes(item));
}

function showScene(sceneName) {
  currentSceneName = sceneName;
  dialogueIndex = 0;
  const endingScreen = document.getElementById("ending-screen");
  if (endingScreen && sceneName !== "ending") {
    endingScreen.style.display = "none";
  }

  if (sceneName !== "endingCall") {
    stopEndingRingtone();
  }
  if (sceneName !== "ending") {
    stopEndingBgm();
  }

  if (sceneName === "childhood") {
    state.flags.inventoryUnlocked = true;
  }
  if (sceneName === "battleIntro") {
    state.flags.slimeHp = SLIME_MAX_HP;
    triggerBossEntranceFlash();
  }
  if (sceneName === "plane") {
    state.flags.inventoryUnlocked = false;
  }
  if (sceneName === "ending") {
    state.flags.inventoryUnlocked = false;
    showEndingScreen();
  }
  if (sceneName === "endingCall") {
    state.flags.inventoryUnlocked = false;
    state.flags.endingCallRingtoneStarted = false;
    state.flags.endingCallVoiceFinished = false;
  }

  const scene = scenes[currentSceneName];

  if (scene.evidence) {
    addEvidence(scene.evidence);
  }

  renderScene();
}

function renderScene() {
  const scene = scenes[currentSceneName];
  const dialogueBox = document.getElementById("dialogue-box");
  if (scene.evidence) {
  addEvidence(scene.evidence);
}

  if (dialogueBox) {
    dialogueBox.style.display =
      currentSceneName === "endingBlack" || currentSceneName === "ending"
        ? "none"
        : "block";
  }

  const evidencePanel = document.getElementById("evidence-panel");
  evidencePanel.style.display = state.flags.inventoryUnlocked ? "block" : "none";
  renderBattleHud();

  const currentDialogue = scene.dialogues
    ? scene.dialogues[dialogueIndex]
    : { speaker: scene.speaker, text: scene.text };
  applyDialogueEffects(currentDialogue);
  updateEndingCallRingtone();

  const bg = document.getElementById("background");
  const bgValue = bgColors[scene.bg] || scene.bg || bgColors.room;

  if (typeof bgValue === "string" && bgValue.includes("/")) {
    bg.style.backgroundImage = `url('${bgValue}')`;
    bg.style.backgroundSize = scene.bgSize || "cover";
    bg.style.backgroundPosition = scene.bgPosition || "center";
    bg.style.backgroundRepeat = scene.bgRepeat || "no-repeat";
    bg.style.backgroundColor = scene.bgColor || "";
  } else {
    bg.style.backgroundImage = "";
    bg.style.background = bgValue;
  }
  renderBackgroundOverlays(scene);

  const speakerMap = {
    "???": "annonymous",
    "쟈가이모": "potato",
    "슬라임 대왕": "slime",
    "지우": "jiwoo",
    "승원": "seungwon",
    "나레이션": "",
    "안내방송": "",
    "편지": "",
    "시스템": ""
  };

  let resolvedCharName = scene.char || "";
  if (currentDialogue.char !== undefined) {
    resolvedCharName = currentDialogue.char;
  } else if (currentDialogue.speaker && Object.prototype.hasOwnProperty.call(speakerMap, currentDialogue.speaker)) {
    resolvedCharName = speakerMap[currentDialogue.speaker];
  }
  const imagePath = getCharacterImage(resolvedCharName);
  const character = document.getElementById("character");
  let character2 = document.getElementById("character2");
  if (!character2) {
    character2 = document.createElement("img");
    character2.id = "character2";
    character2.alt = "character2";
    character2.style.position = "absolute";
    character2.style.imageRendering = "pixelated";
    character2.style.display = "none";
    document.getElementById("game").appendChild(character2);
  }

  character.style.width = "225px";
  character.style.left = "20%";
  character.style.bottom = `${BASE_CHARACTER_BOTTOM}px`;
  character.style.transform = "translateX(-50%)";
  character2.style.width = "225px";
  character2.style.left = "20%";
  character2.style.bottom = `${BASE_CHARACTER_BOTTOM}px`;
  character2.style.transform = "translateX(-50%)";

  if (scene.charStyle) {
    if (scene.charStyle.width) character.style.width = scene.charStyle.width;
    if (scene.charStyle.left) character.style.left = scene.charStyle.left;
    if (scene.charStyle.bottom) character.style.bottom = scene.charStyle.bottom;
    if (scene.charStyle.transform) character.style.transform = scene.charStyle.transform;
  }

  const nonCharacterSpeakers = ["나레이션", "안내방송", "편지", "시스템"];
  const shouldHideDefaultChar =
    nonCharacterSpeakers.includes(currentDialogue.speaker) &&
    currentDialogue.char === undefined;

  if (!shouldHideDefaultChar && imagePath) {
    character.src = imagePath;
    character.style.display = "block";
  } else {
    character.style.display = "none";
  }

  if (!shouldHideDefaultChar && scene.secondChar) {
    const secondImagePath = getCharacterImage(scene.secondChar);
    if (scene.secondCharStyle) {
      if (scene.secondCharStyle.width) character2.style.width = scene.secondCharStyle.width;
      if (scene.secondCharStyle.left) character2.style.left = scene.secondCharStyle.left;
      if (scene.secondCharStyle.bottom) character2.style.bottom = scene.secondCharStyle.bottom;
      if (scene.secondCharStyle.transform) character2.style.transform = scene.secondCharStyle.transform;
    }

    if (secondImagePath) {
      character2.src = secondImagePath;
      character2.style.display = "block";
    } else {
      character2.style.display = "none";
    }
  } else {
    character2.style.display = "none";
  }

  document.getElementById("speaker").innerText = currentDialogue.speaker;
  document.getElementById("dialogue").innerText = currentDialogue.text;

  document.getElementById("evidence-list").innerText =
    state.evidence.length > 0 ? state.evidence.join(", ") : "없음";

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const hasMoreDialogue =
    scene.dialogues && dialogueIndex < scene.dialogues.length - 1;

  if (currentSceneName !== "endingBlack") {
    state.flags.endingTransitionScheduled = false;
  }

  if (currentSceneName === "endingBlack") {
    document.getElementById("speaker").innerText = "";
    document.getElementById("dialogue").innerText = "";
    if (state.flags.endingCallVoiceFinished) {
      showScene("ending");
    }
    return;
  }

  if (currentSceneName === "ending") {
    document.getElementById("speaker").innerText = "";
    document.getElementById("dialogue").innerText = "";
    return;
  }

  if (hasMoreDialogue) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "다음 ▶";
    nextButton.classList.add("next-button");

    nextButton.onclick = () => {
      dialogueIndex++;
      renderScene();
    };

    choicesDiv.appendChild(nextButton);
    applyAutoCharacterBottom(scene);
    return;
  }

  const visibleChoices = scene.choices.filter(choice => !(choice.condition && !choice.condition()));
  const primaryChoices = visibleChoices.filter(
    (choice) => choice.text !== "이전 방으로 돌아간다" && choice.text !== "돌아간다"
  );
  const backChoices = visibleChoices.filter(
    (choice) => choice.text === "이전 방으로 돌아간다" || choice.text === "돌아간다"
  );

  if (primaryChoices.length > 0) {
    const choiceHeader = document.createElement("div");
    choiceHeader.classList.add("choice-header");
    choiceHeader.innerText = "SELECT";
    choicesDiv.appendChild(choiceHeader);
  }

  const renderChoiceButton = (choice, isMiniBack = false) => {
    const btn = document.createElement("button");
    btn.classList.add("choice-option");
    btn.innerText = choice.text;
    const isBackChoice = choice.text === "이전 방으로 돌아간다" || choice.text === "돌아간다";
    const isForwardChoice =
      /(첫번째|두번째|세번째)\s*방으로 간다|다음 방으로 간다|슬라임 대왕에게 간다/.test(choice.text);
    const isStrongForwardChoice =
      /(첫번째|두번째|세번째)\s*방으로 간다|다음 방으로 간다|슬라임 대왕에게 간다|결투하러 가기/.test(choice.text);

    if (isBackChoice) {
      btn.classList.add("choice-option-back");
      if (isMiniBack) {
        btn.classList.add("choice-option-mini-back");
      }
    }
    if (isForwardChoice) {
      btn.classList.add("choice-option-forward");
    }
    if (isStrongForwardChoice) {
      btn.classList.add("choice-option-forward-strong");
    }
    if (choice.action === "answerCall") {
      btn.classList.add("answer-call-choice");
    }

    btn.onclick = () => {
      if (choice.autoCollect) {
        choice.autoCollect.forEach(item => addEvidence(item));
      }

      if (choice.needAll) {
        const missing = choice.needAll.filter(item => !hasEvidence(item));
        if (missing.length > 0) {
          showMissingEvidence(missing);
          return;
        }
      }

      if (choice.need && !hasEvidence(choice.need)) {
        showMissingEvidence(choice.need);
        return;
      }

      if (choice.damage) {
        applySlimeDamage(choice.damage);
      }

      if (choice.action === "answerCall") {
        answerEndingCall();
      }

      if (choice.reset) {
        state.evidence = [];
        state.flags = {};
      }

      showScene(choice.next);
    };

    return btn;
  };

  primaryChoices.forEach((choice) => {
    const btn = renderChoiceButton(choice);
    choicesDiv.appendChild(btn);
  });

  if (backChoices.length > 0) {
    const secondaryChoices = document.createElement("div");
    secondaryChoices.classList.add("choice-secondary");
    backChoices.forEach((choice) => {
      const btn = renderChoiceButton(choice, true);
      secondaryChoices.appendChild(btn);
    });
    choicesDiv.appendChild(secondaryChoices);
  }

  applyAutoCharacterBottom(scene);
}

function applyAutoCharacterBottom(scene) {
  const dialogueBox = document.getElementById("dialogue-box");
  if (!dialogueBox) return;

  const extraHeight = Math.max(0, dialogueBox.offsetHeight - BASE_DIALOGUE_BOX_HEIGHT);
  const autoBottom = `${BASE_CHARACTER_BOTTOM + extraHeight}px`;

  const character = document.getElementById("character");
  const character2 = document.getElementById("character2");

  if (character && (!scene.charStyle || !scene.charStyle.bottom)) {
    character.style.bottom = autoBottom;
  }

  if (character2 && (!scene.secondCharStyle || !scene.secondCharStyle.bottom)) {
    character2.style.bottom = autoBottom;
  }
}

function renderBackgroundOverlays(scene) {
  const overlayRoot = document.getElementById("background-overlays");
  if (!overlayRoot) return;
  overlayRoot.innerHTML = "";

  if (!scene.bgOverlays || scene.bgOverlays.length === 0) return;

  scene.bgOverlays.forEach((overlay) => {
    if (!overlay || !overlay.src) return;
    const img = document.createElement("img");
    img.className = "bg-overlay";
    img.src = overlay.src;
    img.alt = "background overlay";

    if (overlay.width) img.style.width = overlay.width;
    if (overlay.height) img.style.height = overlay.height;
    if (overlay.top) img.style.top = overlay.top;
    if (overlay.bottom) img.style.bottom = overlay.bottom;
    if (overlay.left) img.style.left = overlay.left;
    if (overlay.right) img.style.right = overlay.right;
    if (overlay.opacity !== undefined) img.style.opacity = String(overlay.opacity);
    if (overlay.borderRadius) img.style.borderRadius = overlay.borderRadius;
    if (overlay.boxShadow) img.style.boxShadow = overlay.boxShadow;
    if (overlay.zIndex !== undefined) img.style.zIndex = String(overlay.zIndex);
    if (overlay.rotation !== undefined) {
      img.style.transform = `rotate(${overlay.rotation}deg)`;
    }

    overlayRoot.appendChild(img);
  });
}

function isBattleScene(sceneName) {
  return ["battleIntro", "battle1", "battle2", "battle3", "funnyAttack1", "funnyAttack2", "badEvidence", "battle4"].includes(sceneName);
}

function applySlimeDamage(damage) {
  if (typeof state.flags.slimeHp !== "number") {
    state.flags.slimeHp = SLIME_MAX_HP;
  }
  triggerDamageFlash();
  if (damage === "all") {
    state.flags.slimeHp = 0;
    return;
  }
  state.flags.slimeHp = Math.max(0, state.flags.slimeHp - damage);
}

function applyDialogueEffects(currentDialogue) {
  if (!sceneHasDialoguesWithEffects(currentSceneName, currentDialogue)) return;

  if (!state.flags.appliedDialogueEffects) {
    state.flags.appliedDialogueEffects = {};
  }

  const effectKey = `${currentSceneName}:${dialogueIndex}`;
  if (state.flags.appliedDialogueEffects[effectKey]) return;

  if (currentDialogue.damage) {
    applySlimeDamage(currentDialogue.damage);
  }

  state.flags.appliedDialogueEffects[effectKey] = true;
  renderBattleHud();
}

function sceneHasDialoguesWithEffects(sceneName, currentDialogue) {
  return Boolean(
    sceneName &&
    currentDialogue &&
    Object.prototype.hasOwnProperty.call(currentDialogue, "damage")
  );
}

function triggerDamageFlash() {
  const game = document.getElementById("game");
  if (!game) return;
  game.classList.remove("damage-flash");
  void game.offsetWidth;
  game.classList.add("damage-flash");
  setTimeout(() => game.classList.remove("damage-flash"), 220);
}

function triggerBossEntranceFlash() {
  const game = document.getElementById("game");
  if (!game) return;
  game.classList.remove("boss-entrance-flash");
  void game.offsetWidth;
  game.classList.add("boss-entrance-flash");
  setTimeout(() => game.classList.remove("boss-entrance-flash"), 820);
}

function renderBattleHud() {
  let battleHud = document.getElementById("battle-hud");
  if (!battleHud) {
    battleHud = document.createElement("div");
    battleHud.id = "battle-hud";
    battleHud.style.position = "absolute";
    battleHud.style.top = "20px";
    battleHud.style.left = "20px";
    battleHud.style.width = "220px";
    battleHud.style.padding = "10px";
    battleHud.style.background = "rgba(0, 0, 0, 0.65)";
    battleHud.style.border = "2px solid #ddd";
    battleHud.style.color = "#fff";
    battleHud.style.fontSize = "14px";
    battleHud.style.zIndex = "3";
    document.getElementById("game").appendChild(battleHud);
  }

  if (!isBattleScene(currentSceneName)) {
    battleHud.style.display = "none";
    return;
  }

  if (typeof state.flags.slimeHp !== "number") {
    state.flags.slimeHp = SLIME_MAX_HP;
  }

  const hp = state.flags.slimeHp;
  const ratio = Math.max(0, Math.min(100, Math.round((hp / SLIME_MAX_HP) * 100)));
  battleHud.style.display = "block";
  battleHud.innerHTML = `
    <strong>슬라임 HP</strong>
    <div style="margin-top:6px; width:100%; height:12px; border:1px solid #aaa; background:#222;">
      <div style="height:100%; width:${ratio}%; background:linear-gradient(90deg,#ffb347,#ff4d4d);"></div>
    </div>
    <div style="margin-top:6px; color:#ffd966;">${hp} / ${SLIME_MAX_HP}</div>
  `;
}

function showMissingEvidence(item) {
  document.getElementById("speaker").innerText = "시스템";
  if (Array.isArray(item)) {
    document.getElementById("dialogue").innerText =
      `아직 뭔가 부족하다!!! 필요한 수집품: ${item.map(x => `「${x}」`).join(", ")}`;
  } else {
    document.getElementById("dialogue").innerText =
      `아직 「${item}」 유의미한 수집품을 얻지 못했다. 다른 방을 조사해보자.`;
  }

  const game = document.getElementById("game");
  game.classList.add("flash");
  setTimeout(() => game.classList.remove("flash"), 1000);
}

function getCharacterImage(charName) {
  const placeholder = placeholderImages[charName];
  if (placeholder) {
    return placeholder.startsWith("assets/") ? placeholder : `assets/${placeholder}`;
  }

  const paths = {
    potato: "assets/char_potato.png",
    slime: "assets/char_slime.png",
    normal: "assets/char_normal.png",
    friend: "assets/char_friend.png",
    annonymous: "assets/char_annonymous.png",
    annonymous2: "assets/char_annonymous2.png",
    youthpic: "assets/baby_jiw.png",
    youthpic2: "assets/baby2.png",
    earmuff: "assets/earmuff.png",
    woodsword: "assets/woodsword_pixel.png",
    matiz: "assets/matiz.png",
    hoop: "assets/hoop.png",
    maki: "assets/maki.jpg",
    diary: "assets/diary.png",
    jiwoo: "assets/jiwoo.png",
    seungwon: "assets/seungwon.png"

  };

  return paths[charName] || "";
}

function getCharacterBySpeaker(speaker) {
  const speakerMap = {
    "???": "annonymous",
    "쟈가이모": "potato",
    "슬라임 대왕": "slime",
    "지우": "jiwoo",
    "승원": "seungwon",
    "나레이션": "",
    "안내방송": "",
    "편지": "",
    "시스템": ""
  };

  return speakerMap[speaker] || "";
}

function startGame() {
  document.getElementById("title-screen").style.display = "none";
  hideEndingScreen();

  state.evidence = [];
  state.flags = {};

  showScene("start");
}

function showEndingScreen() {
  const endingScreen = document.getElementById("ending-screen");
  if (endingScreen) {
    endingScreen.style.display = "flex";
  }
  const result = document.getElementById("ending-choice-result");
  if (result) {
    result.innerText = "";
  }
  const goHomeBtn = document.getElementById("go-home-btn");
  if (goHomeBtn) {
    goHomeBtn.style.display = "none";
  }
}

function hideEndingScreen() {
  const endingScreen = document.getElementById("ending-screen");
  if (endingScreen) {
    endingScreen.style.display = "none";
  }
  stopEndingRingtone();
  stopEndingBgm();
}

function restartGame() {
  hideEndingScreen();
  state.evidence = [];
  state.flags = {};
  showScene("start");
}

function goHome() {
  hideEndingScreen();
  state.evidence = [];
  state.flags = {};
  document.getElementById("title-screen").style.display = "flex";
}

function chooseEndingOption(meetHim) {
  const result = document.getElementById("ending-choice-result");
  if (!result) return;
  result.innerText = meetHim ? "💍" : "틀렸습니다. 쿸쿸";
  const goHomeBtn = document.getElementById("go-home-btn");
  if (goHomeBtn) {
    goHomeBtn.style.display = meetHim ? "inline-block" : "none";
  }
}

function getOrCreateAudio(id, src, loop = false) {
  let audio = document.getElementById(id);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = id;
    audio.src = src;
    audio.preload = "auto";
    audio.loop = loop;
    document.body.appendChild(audio);
  }
  return audio;
}

function playEndingRingtone() {
  const ringtone = getOrCreateAudio("ending-ringtone", "assets/voicetalk_ringtone.mp3", false);
  ringtone.loop = false;
  ringtone.currentTime = 0;
  const playPromise = ringtone.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function updateEndingCallRingtone() {
  if (currentSceneName !== "endingCall") return;

  const ringStartIndex = 1;
  const shouldRing = dialogueIndex >= ringStartIndex;
  const alreadyStarted = Boolean(state.flags.endingCallRingtoneStarted);

  if (shouldRing && !alreadyStarted) {
    playEndingRingtone();
    state.flags.endingCallRingtoneStarted = true;
  }
}

function stopEndingRingtone() {
  const ringtone = document.getElementById("ending-ringtone");
  if (!ringtone) return;
  ringtone.pause();
  ringtone.currentTime = 0;
}

function playEndingBgm() {
  const bgm = getOrCreateAudio("ending-bgm", ENDING_BGM_PATH, false);
  bgm.currentTime = 0;
  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function stopEndingBgm() {
  const bgm = document.getElementById("ending-bgm");
  if (!bgm) return;
  bgm.pause();
  bgm.currentTime = 0;
}

function answerEndingCall() {
  stopEndingRingtone();
  state.flags.endingCallVoiceFinished = false;
  const callVoice = getOrCreateAudio("ending-call-voice", ENDING_CALL_VOICE_PATH, false);
  callVoice.currentTime = 0;
  callVoice.onended = () => {
    state.flags.endingCallVoiceFinished = true;
    if (currentSceneName === "endingBlack") {
      showScene("ending");
    }
  };
  const playPromise = callVoice.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      state.flags.endingCallVoiceFinished = true;
      if (currentSceneName === "endingBlack") {
        showScene("ending");
      }
    });
  }
}
