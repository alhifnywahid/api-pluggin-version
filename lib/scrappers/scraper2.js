const axios = require("axios"),
cheerio = require("cheerio"),
qs = require("qs"),
request = require("request"),
formData = require("form-data"),
yt = require("ytdl-core"),
yts = require("yt-search")

// Scraper (all)
async function getLink(payload) {
  try {
    const response = await axios.post('https://terabox-dl.qtcloud.workers.dev/api/get-download', payload);
    return response.data.downloadLink;
  } catch (error) {
    return error.response.data;
  }
}

async function terabox(url) {
  let id = (url.split(/surl=|\/s\//) || [])[1];
  id = `1${id.replace(/^1/, '')}`;

  const infoResponse = await axios.get(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${id}`);
  const info = infoResponse.data;

  if (info.ok !== true) {
    throw new Error(info.message);
  }

  for (const file of info.list) {
    const payload = {
      shareid: info.shareid,
      uk: info.uk,
      sign: info.sign,
      timestamp: info.timestamp,
      fs_id: file.children.length ? file.children[0].fs_id: file.fs_id
    };
    const dlUrl = await getLink(payload);
    file.downloadLink = dlUrl;
  }

  return info;
}

async function twitter(link) {
  try {
    const config = {
      'URL': link
    };
    const response = await axios.post('https://twdown.net/download.php', qs.stringify(config), {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
      }
    });
    const $ = cheerio.load(response.data);
    return {
      desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
      thumb: $('div:nth-child(1) > img').attr('src'),
      video_sd: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
      video_hd: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
      audio: 'https://twdown.net/' + $('body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a').attr('href')
    };
  } catch (error) {
    throw new Error("Failed to fetch Twitter data. Please try again later.");
  }
}

async function ttSlide(url) {
  try {
    const response = await axios.post("https://api.ttsave.app/", {
      id: url,
      hash: '1e3a27c51eb6370b0db6f9348a481d69',
      mode: 'slide',
      locale: 'en',
      loading_indicator_url: 'https://ttsave.app/images/slow-down.gif',
      unlock_url: 'https://ttsave.app/en/unlock'
    }, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const html = response.data
    const $ = cheerio.load(html)

    const results = []

    $('div.flex.flex-col.items-center.justify-center.mt-2.mb-5').each((index, element) => {
      const $element = $(element)
      const data = {
        author: author,
        uniqueId: $element.find('input#unique-id').attr('value'),
        username: $element.find('div.flex.flex-row.items-center.justify-center h2').text(),
        profile: $element.find('a').first().find('img').attr('src'),
        downloads: $element.find('a').first().attr('href'),
        title: $element.find('a').first().text(),
        hashtags: $element.find('p.text-gray-600').text().split(' ').filter(Boolean),
        likes: $element.find('div.flex.flex-row.items-center.justify-center').eq(0).find('span').text(),
        comments: $element.find('div.flex.flex-row.items-center.justify-center').eq(1).find('span').text(),
        shares: $element.find('div.flex.flex-row.items-center.justify-center').eq(2).find('span').text(),
        saveds: $element.find('div.flex.flex-row.items-center.justify-center').eq(3).find('span').text(),
        views: $element.find('div.flex.flex-row.items-center.justify-center').eq(4).find('span').text()
      }
      results.push(data)
    })

    return results
  } catch (error) {
    console.error(error)
  }
}

async function cinema() {
  try {
    const response = await axios.get('https://21cineplex.com/')
    const html = response.data
    const $ = cheerio.load(html)

    const results = []

    $('.col-3 .movie').each((index, element) => {
      const movieTitle = $(element).find('.movie-desc h4').text().trim()
      const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src')
      const moviePoster = $(element).find('.movie-poster img').attr('src')
      const movieLink = $(element).find('a').attr('href')

      const data = {
        title: movieTitle,
        label: movieLabel,
        poster: moviePoster,
        link: movieLink
      }

      results.push(data)
    })

    return results
  } catch (error) {
    console.error(error)
  }
}

async function dannteam(prompt) {
  const response = await axios({
    method: "POST",
    url: "https://chateverywhere.app/api/chat",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "_ga=GA1.1.34196701.1707462626; _ga_ZYMW9SZKVK=GS1.1.1707462625.1.0.1707462625.60.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%225aa4878d-a9b6-40fb-8345-3d686d655483%22%2C%22%24sesid%22%3A%5B1707462733662%2C%22018d8cb4-0217-79f9-99ac-b77f18f82ac8%22%2C1707462623766%5D%7D",
      Origin: "https://chateverywhere.app",
      Referer: "https://chateverywhere.app/id",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    },
    data: {
      model: {
        id: "gpt-3.5-turbo-0613",
        name: "GPT-3.5",
        maxLength: 12000,
        tokenLimit: 4000,
      },
      prompt: prompt,
      messages: [{
        pluginId: null,
        content: prompt,
        role: "user"
      },
        {
          pluginId: null,
          content: "DannTeam adalah programmer yang berasal dari Kalimantan Timur, Indonesia. Ia adalah seorang yang mengembangkan semua aplikasi.",
          role: "assistant"
        }]
    }
  })

  return response.data
}

async function cerpen(category) {
  return new Promise(async (resolve, reject) => {
    let title = category.toLowerCase().replace(/[()*]/g, "")
    let length, judul = title.replace(/\s/g, "-")
    try {
      let res = await axios.get('http://cerpenmu.com/category/cerpen-'+judul)
      let $ = await cheerio.load(res.data)
      length = $('html body div#wrap div#content article.post div.wp-pagenavi a')
      length = length['4'].attribs.href.split('/').pop()
    } catch {
      length = 0
    }
    let page = Math.floor(Math.random() * parseInt(length))
    axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
    .then((get) => {
      let $ = cheerio.load(get.data)
      let link = []
      $('article.post').each(function (a, b) {
        link.push($(b).find('a').attr('href'))
      })
      let random = link[Math.floor(Math.random() * link.length)]
      axios.get(random)
      .then((res) => {
        let $$ = cheerio.load(res.data)
        let hasil = {
          title: $$('#content > article > h1').text(),
          author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
          kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
          lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
          cerita: $$('#content > article > p').text()
        }
        resolve(hasil)
      })
    })
  })
}

async function randomCerpen() {
  try {
    const n = await axios.get("http://cerpenmu.com/"),
    a = cheerio.load(n.data);
    let r = [];
    a("#sidebar > div").each(function (t, e) {
      a(e)
      .find("ul > li")
      .each(function (t, e) {
        let n = a(e).find("a").attr("href");
        r.push(n);
      });
    });
    var t = r[Math.floor(Math.random() * r.length)];
    let o = await axios.get(`${t}`);
    const i = cheerio.load(o.data);
    let c = [];
    i("#content > article > article").each(function (t, e) {
      let n = i(e).find("h2 > a").attr("href");
      c.push(n);
    });
    var e = c[Math.floor(Math.random() * c.length)];
    let s = await axios.get(`${e}`),
    u = cheerio.load(s.data),
    l = u("#content").find("article > h1").text().trim(),
    h = u("#content").find("article > a:nth-child(2)").text().trim(),
    f = [];
    u("#content > article > p").each(function (t, e) {
      let n = u(e).text().trim();
      f.push(n);
    });
    let w = [];
    for (let t of f) w += t;
    return {
      status: !0,
      judul: l,
      penulis: h,
      sumber: e,
      cerita: w
    };
  } catch (t) {
    return {
      status: !1
    };
  }
}

async function githubStalk(user) {
  return new Promise((resolve, reject) => {
    axios.get('https://api.github.com/users/'+user)
    .then(({
      data
    }) => {
      let hasil = {
        username: data.login,
        nickname: data.name,
        bio: data.bio,
        id: data.id,
        nodeId: data.node_id,
        profile_pic: data.avatar_url,
        url: data.html_url,
        type: data.type,
        admin: data.site_admin,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        public_repo: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        ceated_at: data.created_at,
        updated_at: data.updated_at
      }
      return hasil
    })
  })
}

async function npmStalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/"+packageName)
  let versions = stalk.data.versions
  let allver = Object.keys(versions)
  let verLatest = allver[allver.length-1]
  let verPublish = allver[0]
  let packageLatest = versions[verLatest]
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest]
  }
}

async function randomCersex() {
  return new Promise(async (resolve, reject) => {
    try {
      const randPage = Math.floor(Math.random() * 4) + 1;
      const response = await axios.get(`https://www.lensa69.com/cerita-sex/page/${randPage}`);
      const $ = cheerio.load(response.data);
      let hasil = [];
      $(".items > .item").each(function (aa, bb) {
        hasil.push($(this).find("a").attr("href"));
      });
      let filterHasil = hasil.filter((F) => F != undefined);
      const randHasil = filterHasil[Math.floor(Math.random() * filterHasil.length)];
      let final = await axios.get(randHasil);
      if (final instanceof Error) return reject(final.message);
      const cc = cheerio.load(final.data);
      const title = cc("div.sbox > div.entry-content > div > h1").text().trim();
      const thumb = cc("div.sbox > div.entry-content > p > img").attr("src");
      const tanggal = cc("div.sbox > div.entry-content > div > p.fr > span").text().trim();
      const cerita = cc("div.sbox > div.entry-content").find("p").text().replace(tanggal, "").trim();
      const result = {
        title: title,
        thumb: thumb,
        tanggal: tanggal,
        cerita: cerita,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function randomBokep() {
  return new Promise(async (resolve, reject) => {
    try {
      const randPage = Math.floor(Math.random() * 4) + 1;
      const getData = await axios.get(`https://www.lensa69.com/category/video-bokep/page/${randPage}`);
      const $ = cheerio.load(getData.data);
      let resultt = [];
      $(".item").each(function (aa, bb) {
        resultt[aa] = {
          title: $(this).find("a > .image > img").attr("alt"),
          thumb: $(this).find("a > .image > img").attr("src"),
          url: $(this).find("a").attr("href"),
          views: $(this).find(".total-views").text().trim(),
        };
      });
      const filResult = resultt.filter((F) => F != undefined);
      const randResult = filResult[Math.floor(Math.random() * filResult.length)];
      let final = await axios.get(randResult.url);
      const $$ = cheerio.load(final.data);
      const urlLoad = $$(".movieplay > iframe").attr("src");
      const result = {
        title: randResult.title,
        thumb: randResult.thumb,
        views: `${randResult.views} views`,
        url: urlLoad,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function characterAI(query, character) {
  try {
    const response = await axios.post('https://boredhumans.com/api_celeb_chat.php',
      `message=${query}&intro=${character}&name=${character}`,
      {
        headers: {
          'User-Agent': 'Googlebot-News',
        }
      });
    return response.data
  } catch (error) {
    throw error
  }
}

async function aioDownloader(url) {
  try {
    const response = await axios.post("https://aiovd.com/wp-json/aio-dl/video-data",
      {
        url: url
      },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

    const res = response.data;
    const result = {
      data: res.medias
    };

    return result;
  } catch (e) {
    throw e
  }
}

async function gptPicture(query) {
  const playod = {
    captionInput: query,
    captionModel: 'default',
  };
  try {
    const response = await axios.post('https://chat-gpt.pictures/api/generateImage',
      playod,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
        }
      });
    const data = response.data;
    const result = {
      data: data,
    };

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function kodepos(kota) {
  return new Promise((resolve, reject) => {
    let postalcode = 'https://carikodepos.com/';
    let url = postalcode + '?s=' + kota;

    request.get({
      headers: {
        'Accept': 'application/json, text/javascript, */*;',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Origin': postalcode,
        'Referer': postalcode
      },
      url: url
    }, function(error, response, body) {
      if (error) return reject(error);

      let $ = cheerio.load(body);
      var search = $('tr');

      if (!search.length) return reject('No result could be found');

      var results = [];

      search.each(function(i) {
        if (i != 0) {
          var td = $(this).find('td');
          var result = {};

          td.each(function(i) {
            var value = $(this).find('a').html();
            var key = (i == 0) ? 'province': (i == 1) ? 'city': (i == 2) ? 'subdistrict': (i == 3) ? 'urban': 'postalcode';
            result[key] = value;
          });

          results.push(result);
        }
      });

      console.log(results);
      return resolve(results);
    });
  });
}

async function mediafire(url) {
  let res = await axios.get(url)
  let get = cheerio.load(res.data)
  let urlFile = get('a#downloadButton').attr('href')
  let sizeFile = get('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('', '')
  let split = urlFile.split('/')
  let nameFile = split[5]
  mime = nameFile.split('.')
  mime = mime[1]
  let result = {
    title: nameFile,
    size: sizeFile,
    url: urlFile
  }
  return result
}

function soundcloud(url) {
  return new Promise((resolve, reject) => {
    axios.get('https://soundcloudmp3.org/id').then((data) => {
      let a = cheerio.load(data.data)
      let token = a('form#conversionForm > input[type=hidden]').attr('value')
      const options = {
        method: 'POST',
        url: `https://soundcloudmp3.org/converter`,
        headers: {
          "content-type": "application/x-www-form-urlencoded;",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          "Cookie": data["headers"]["set-cookie"],
        },
        formData: {
          _token: token,
          url: url
        }
      };
      request(options,
        async function(error, response, body) {
          if (error) return reject()
          $get = cheerio.load(body)
          const result = {
            title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:', ''),
            duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g, ''),
            quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:', ''),
            thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
            download: $get('#download-btn').attr('href')
          }
          resolve(result)
        });
    })
  })
}

async function rumahMisteri() {
    try {
        const response = await axios.get('https://rumahmisteri.com/')
        const html = response.data;
        const $ = cheerio.load(html)

        const articles = []

        $('#post-8073').each((index, element) => {
            const article = {
                href: $(element).find('div.thumb-cat-wrap > a').attr('href'),
                image: $(element).find('div.thumb-cat-wrap > a > img').attr('src'),
                category: $(element).find('div.thumb-cat-wrap > div > span > a').text(),
                postedOn: $(element).find('div.entry-cat > span.posted-on > a').text(),
                author: $(element).find('div.entry-cat > span.byline > span > a').text(),
                title: $(element).find('header > h2 > a').text(),
                content: $(element).find('div.entry-content > p').text(),
                footer: $(element).find('footer > a').text()
            };
            articles.push(article)
        })

        return articles
    } catch (error) {
        console.error(error)
    }
}

async function rumahHantu() {
    try {
        const response = await axios.get('https://rumahmisteri.com/')
        const $ = cheerio.load(response.data)

        const articles = []

        $('article[id^="post"]').each((index, element) => {
            const article = {}
            const thumb = $(element).find('.thumb-cat-wrap')
            const thumbnail = thumb.find('a.post-thumbnail img').attr('src')
            const category = $(element).find('.post-cats-list a').attr('href')

            article.thumbnail = thumbnail
            article.category = category

            articles.push(article)
        })

        return articles
    } catch (error) {
        console.error(error)
    }
}

function parseFileSize(size) {
    return parseFloat(size) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}

function sfilemobi(url) {
    return new Promise(async(resolve, reject) => {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		if (!/sfile\.mobi/i.test(url)) return resolve()	
		const html = await axios.get(url).catch(function (error) {})
		if (!html) {
			resolve();
		}else{
			const $ = cheerio.load(html.data);
			const $k = (_a = /var z = (.*?);/i.exec($.html())) === null || _a === void 0 ? void 0 : _a[1];
			const urlPage = (((_d = (((_b = /var db = "(.*?)"/i.exec($.html())) === null || _b === void 0 ? void 0 : _b[1]) || ((_c = /var sf = "(.*?)"/i.exec($.html())) === null || _c === void 0 ? void 0 : _c[1]))) === null || _d === void 0 ? void 0 : _d.replace(/\\(\\)?/gi, '')) ||
				$('#download').attr('href')) + `&k=${$k}`;
			const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text();
			const icon = $('div.intro-container > img').attr('src');
			const type = (_e = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _e === void 0 ? void 0 : _e[1];
			const $list = $('div.list');
			const mimetype = (_f = $list.eq(0).text().split('-')[1]) === null || _f === void 0 ? void 0 : _f.trim();
			const aploud = (_g = $list.eq(2).text().split('Uploaded:')[1]) === null || _g === void 0 ? void 0 : _g.trim();
			const $aploud = $list.eq(1).find('a');
			const aploudby = $aploud.eq(0).text();
			const aploudbyUrl = $aploud.eq(0).attr('href');
			const aploudon = $aploud.eq(1).text();
			const aploudonUrl = $aploud.eq(1).attr('href');
			const decs = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(1) > div:nth-child(6) ').text()
			const downloads = parseInt((_h = $list.eq(3).text().split('Downloads:')[1]) === null || _h === void 0 ? void 0 : _h.trim());
			const filesizeH = (_j = /\((.*?)\)/i.exec($('#download').text())) === null || _j === void 0 ? void 0 : _j[1];
			const filesize = filesizeH && (0, parseFileSize)(filesizeH);
			const results = {
			  author: creator,
				url: urlPage,
				decs,
				filename,
				icon,
				type,
				mimetype,
				upload_date: aploud,
				upload_by: aploudby,
				upload_byUrl: aploudbyUrl,
				upload_don: aploudon,
				upload_donUrl: aploudonUrl,
				downloads_count: downloads,
				filesizeH,
				filesize: filesize
			};
		  resolve(results);
		}
	})
}

async function ytmp3(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let audio = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
            let aud = pormat[i]
            audio.push(aud.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: audio[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function ytmp4(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: video[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function play(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function playaudio(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function playvideo(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytSearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                res = data.all
                return res
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function threads(url) {
  try {
  const response = await axios.get(`https://api.threadsphotodownloader.com/v2/media?url=${encodeURIComponent(url)}`)
  return response.data
  } catch (error) {
    console.error(error)
  }
}

async function gptLogic(logic, prompt, model) {
    let data = {
        messages: [
            {
                role: "assistant",
                content: logic
            },
            {
                role: "user",
                content: prompt
            }
        ],
        data: {
            system_prompt: "",
            max_new_tokens: 256,
            repetition_penalty: 1.1,
            temperature: 1,
            top_p: 0.9,
            top_k: 0
        },
        model: model,
        stream: false,
        markdown: false
    }

    try {
        const response = await axios.post('https://nexra.aryahcr.cc/api/chat/complements', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let err = null
        let result = null

        if ((typeof response.data).toString().toLowerCase() === "object") {
            if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                result = response.data
                err = null
            } else {
                result = null
                err = response.data
            }
        } else {
            let js = null
            let count = -1
            for (let i = 0; i < response.data.length; i++) {
                if (count <= -1) {
                    if (response.data[i] === "{") {
                        count = i
                    }
                } else {
                    break
                }
            }

            if (count <= -1) {
                err = {
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                };
                result = null
            } else {
                try {
                    js = response.data.slice(count)
                    js = JSON.parse(js)
                    if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                        result = js
                        err = null
                    } else {
                        err = js
                        result = null
                    }
                } catch (e) {
                    err = {
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }
                    result = null
                }
            }
        }

        if (result === null && err != null) {
            console.log(err)
            throw err
        } else {
            return result
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
  ttSlide,
  twitter,
  terabox,
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
}