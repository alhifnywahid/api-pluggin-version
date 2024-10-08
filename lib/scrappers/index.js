
const {
  tiktoks,
  igdl,
  ssweb,
  styleText,
  tiktok,
  fbdl,
  tebakgambar,
  BukaLapak,
  SepakBola,
  HariLibur,
  growtopiaItems,
  chord,
  remini,
  igStory,
  igStoryV3,
  ngl,
  bard
} = require("./scraper1")

const {
  ttSlide,
  terabox,
  twitter,
  cinema,
  dannteam,
  cerpen,
  randomCerpen,
  githubStalk,
  npmStalk,
  randomCersex,
  randomBokep,
  characterAI,
  aioDownloader,
  gptPicture,
  kodepos,
  mediafire,
  soundcloud,
  rumahMisteri,
  rumahHantu,
  sfilemobi,
  ytmp3,
  ytmp4,
  play,
  playaudio,
  playvideo,
  ytSearch,
  threads,
  gptLogic
} = require("./scraper2")

const {
  igStalk,
  ttStalk,
  spotifyDownload,
  spotifySearch,
  pinterest,
  randomGalau,
  xhentai,
  dystopia,
  igStoryV2,
  waifu,
  ChatGpt,
  cartoonify,
  esrgan,
  imageGenerator,
  VirtualGirlfriends,
  igPost,
  igdlV2,
  igdlV3
} = require("./scraper3")

// const {
//   Pixart
// } = require("./dist/pixart")

// const {
//   GPT
// } = require("./dist/gpt")

// const {
//   Emi
// } = require("./dist/emi")

// const {
//   Barbie
// } = require("./dist/barbie")

module.exports = {
  downloader: {
    igdl,
    igdlV2,
    igdlV3,
    tiktok,
    fbdl,
    igStory,
    igStoryV2,
    igStoryV3,
    ttSlide,
    terabox,
    twitter,
    aioDownloader,
    mediafire,
    soundcloud,
    sfilemobi,
    ytmp3,
    ytmp4,
    play,
    playaudio,
    playvideo,
    threads,
    spotifyDownload,
    igPost
  },
  search: {
    tiktoks,
    BukaLapak,
    growtopiaItems,
    chord,
    cerpen,
    kodepos,
    ytSearch,
    pinterest,
    spotifySearch
  },
  game: {
    tebakgambar
  },
  tools: {
    remini,
    ssweb,
    SepakBola,
    HariLibur,
    cinema,
    rumahMisteri,
    rumahHantu,
    ngl
  },
  ai: {
    // Pixart,
    // GPT,
    // Emi,
    // Barbie,
    dannteam,
    characterAI,
    gptPicture,
    gptLogic,
    dystopia,
    waifu,
    ChatGpt,
    cartoonify,
    esrgan,
    imageGenerator,
    VirtualGirlfriends,
    bard
  },
  random: {
    randomCerpen,
    randomCersex,
    randomBokep,
    randomGalau
  },
  stalker: {
    githubStalk,
    npmStalk,
    igStalk,
    ttStalk
  },
  nsfw: {
    xhentai
  }
}