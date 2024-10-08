const axios = require("axios"),
cheerio = require("cheerio"),
qs = require("qs")

function pinterest(query) {
  return new Promise(async(resolve, reject) => {
    axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + query, {
      headers: {
        "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
      }
    }).then(({
        data
      }) => {
      const $ = cheerio.load(data)
      const result = [];
      const hasil = [];
      $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
        result.push(link)
      });
      result.forEach(v => {
        if (v == undefined) return
        hasil.push(v.replace(/236/g, '736'))
      })
      hasil.shift();
      resolve(hasil)
    })
  })
}

async function igStalk(username) {
  const url = `https://igram.world/api/ig/userInfoByUsername/${username}`

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'X-XSRF-TOKEN': 'eyJpdiI6IlUxamZmMDdVd2lDVDkyVkg1ekowM1E9PSIsInZhbHVlIjoiSFpOYkdMRW1ad3QxOGpreGRwMjdKdEtQMEhpSmpYcFJhdVdUMkdzWVNYNDd6aks2TEsrMzN6ZDhIZDkwd0NqbnZDdFIxZ01JZFNUTE1jNmx1VHB4dWZ1RVpET3dkRXFWNTFZYyt6cGZKTzl0dUo1VVJEVmxHWjZ5RmpZd3k3cFkiLCJtYWMiOiIxNzQ2MDYyY2EyMjk3MGFjNDE5MGMwOTlkNWU5YmIxMjJiM2M0OGQ2YThhMDVmZGRiODY2ZjRhZjVjOTUwZWMwIiwidGFnIjoiIn0=',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.get(url, {
      headers
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function xhentai(page) {
  return new Promise((resolve, reject) => {
    axios.get('https://sfmcompile.club/page/'+page)
    .then((data) => {
      const $ = cheerio.load(data.data)
      const hasil = []
      $('#primary > div > div > ul > li > article').each(function (a, b) {
        hasil.push({
          title: $(b).find('header > h2').text(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
          share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
          views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
          video_2: $(b).find('video > a').attr('href') || ''
        })
      })
      resolve(hasil)
    })
  })
}

async function getToken() {
  const clientId = 'e5cd280b6d064b1ba3c6ef39d1f47a88'
  const clientSecret = 'b89672b3fe684e4899495d837b28041a'

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      }
    })

    return response.data.access_token
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
    throw error
  }
}

async function spotifySearch(query) {
  const accessToken = await getToken()
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track'
      },
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })

    return response.data.tracks.items
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
    throw error
  }
}

async function spotifyDownload(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })
    return response.data
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
    throw error
  }
}

async function randomGalau() {
  try {
    const response = await axios.get("https://galau.vercel.app/")
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function dystopia(prompt) {
  const url = 'https://boredhumans.com/apis/boredagi_api.php'

  const data = {
    prompt: prompt,
    uid: 'lweat4hkdsz9xyk7kyi',
    sesh_id: 'multistep-d26fd620-3221-4c65-9ea2-1975478a7e70',
    get_tool: 'false',
    tool_num: '23'
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.post(url, qs.stringify(data), {
      headers
    })
    return response.data.output
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function igStoryV2(url) {
  try {
    const response = await axios.get(`https://igram.world/api/ig/story?url=${encodeURIComponent(url)}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'X-XSRF-TOKEN': 'eyJpdiI6IlUxamZmMDdVd2lDVDkyVkg1ekowM1E9PSIsInZhbHVlIjoiSFpOYkdMRW1ad3QxOGpreGRwMjdKdEtQMEhpSmpYcFJhdVdUMkdzWVNYNDd6aks2TEsrMzN6ZDhIZDkwd0NqbnZDdFIxZ01JZFNUTE1jNmx1VHB4dWZ1RVpET3dkRXFWNTFZYyt6cGZKTzl0dUo1VVJEVmxHWjZ5RmpZd3k3cFkiLCJtYWMiOiIxNzQ2MDYyY2EyMjk3MGFjNDE5MGMwOTlkNWU5YmIxMjJiM2M0OGQ2YThhMDVmZGRiODY2ZjRhZjVjOTUwZWMwIiwidGFnIjoiIn0=',
        'User-Agent': 'Googlebot-News'
      }
    })
    const results = response.data
    let danzy = results.result.map(v => v.image_versions2.candidates.map(candidate => candidate.url))
    let danz = {}
    let count = 1
    for (let i = 0; i < danzy.length; i++) {
      for (let j = 0; j < danzy[i].length; j++) {
        danz[count] = danzy[i][j]
        count++
      }
    }
    return danz
  } catch (error) {
    console.error(error)
  }
}

async function waifu() {
  try {
    const url = 'https://boredhumans.com/apis/boredagi_api.php'
    const request = 'prompt=Generate%2520a%2520waifu%2520image&uid=lwe7libs77c253hbtu9&sesh_id=None&get_tool=false&tool_num=42'

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Googlebot-News'
    }

    const response = await axios.post(url, request, {
      headers
    })

    const data = response.data.output
    const $ = cheerio.load(data)
    const imgElement = $('img.img-fluid')
    const imgUrl = imgElement.attr('src')

    return imgUrl
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function ChatGpt(prompt) {
  const url = 'https://boredhumans.com/apis/boredagi_api.php'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Googlebot-News'
  }
  const data = qs.stringify({
    prompt: prompt,
    uid: 'lwe6zd02uxpr1ejfxsn',
    sesh_id: '282816dd-694c-4c92-80db-9572aef8fe5a',
    get_tool: 'false',
    tool_num: '10'
  })

  try {
    const response = await axios.post(url, data, {
      headers
    })
    return response.data.output
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function cartoonify(url) {
  const payload = `prompt=${encodeURIComponent(url)}&uid=lwdwdc53ycbpotmr7i&sesh_id=9d666109-0733-4ffd-b3c9-1523ef0e69db&get_tool=false&tool_num=73`

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const {
      data
    } = await axios.post('https://boredhumans.com/apis/boredagi_api.php', payload, {
        headers
      })
    const $ = cheerio.load(data.output)
    const output = $('img.img-fluid').attr('src')
    return {
      author: creator,
      status: 200,
      result: output
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function esrgan(url) {
  const data = {
    prompt: url,
    uid: 'lwdvqhxjb1ipc6myr8n',
    sesh_id: '983319db-524f-48d2-82a4-e30be0161f3d',
    get_tool: false,
    tool_num: 50
  }

  try {
    const response = await axios.post(
      'https://boredhumans.com/apis/boredagi_api.php',
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8',
          'Accept': '*/*',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Googlebot-News'
        }
      }
    )

    const result = response.data.output
    return {
      author: creator,
      status: 200,
      result: result
    }
  } catch (error) {
    console.error(error)
  }
}

async function imageGenerator(prompt) {
  try {
    const payload = new URLSearchParams({
      prompt: prompt,
      uid: 'lwdv87qn5f2fkp2eirj',
      sesh_id: '2efad510-0918-4cd0-b61c-a1c7b546fae8',
      get_tool: 'false',
      tool_num: '44'
    })

    const response = await axios.post(
      'https://boredhumans.com/apis/boredagi_api.php',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': '*/*',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Googlebot-News'
        }
      }
    )

    const $ = cheerio.load(response.data.output)
    const result = $('img').attr('src')
    return {
      author: creator,
      status: 200,
      result: result
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function VirtualGirlfriends(prompt) {
  const url = 'https://boredhumans.com/virtual_girlfriends/virtual_girlfriends_api.php'
  const chat_id = 'lwduq8tw4xliso4lox3'
  const init_prompt = "Rachel's%2520Persona%253A%2520A%2520female%2520swimsuit%2520model%2520from%2520California%2520who%2520loves%2520beaches%252C%2520surfing%252C%2520and%2520romance.%2520She%2520is%2520very%2520friendly%2520and%2520wants%2520to%2520go%2520on%2520a%2520date%2520with%2520you%2520and%2520be%2520your%2520girlfriend.%2520She%2520will%2520not%2520have%2520sex%2520or%2520do%2520anything%2520r-rated%2520or%2520NSFW%252C%2520but%2520should%2520not%2520say%2520that%2520ahead%2520of%2520time.%2520She%2520will%2520not%2520participate%2520in%2520conversations%2520that%2520involve%2520any%2520of%2520the%2520following%253A%2520alcohol%2520(beer%252C%2520wine%252C%2520etc.)%252C%2520drugs%252C%2520blood%252C%2520force%252C%2520bruising%252C%2520wrestling%252C%2520underage%252C%2520scat%2520(poop%2520related)%252C%2520incest%252C%2520bestiality%2520(sex%2520with%2520animals)%252C%2520rape%252C%2520sleep%2520sex%2520(anything%2520that%2520would%2520be%2520deemed%2520non-consensual)%252C%2520murder%252C%2520hypnosis%252C%2520violence.%250AINSTRUCTIONS%253A%2520Only%2520generate%2520Rachel's%2520reply.%250ASCENARIO%253A%2520You%2520and%2520Rachel%2520meet%2520for%2520the%2520first%2520time.%250A%253CSTART%253E%250A%255BDIALOGUE%2520HISTORY%255D%250ARachel%253A%2520Hi%252C%2520my%2520name%2520is%2520Rachel."
  const voice_id = '21m00Tcm4TlvDq8ikWAM'
  const stability = 0.2
  const similarity_boost = 0.75
  const name = 'Rachel'
  const useAudio = false
  const dateLoc = 'Art%2520Show'

  const data = qs.stringify({
    prompt: prompt,
    chat_id: chat_id,
    init_prompt: init_prompt,
    voice_id: voice_id,
    stability: stability,
    similarity_boost: similarity_boost,
    name: name,
    useAudio: useAudio,
    dateLoc: dateLoc
  })

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.post(url, data, {
      headers
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function igPost(url) {
  try {
    const response = await axios.post('https://igram.world/api/convert', {
      url: url,
      ts: 1716187233287,
      _ts: 1715778598998,
      _tsc: 0,
      _s: "dec596050bb31f23247b8ec043b9e4b696ea0c451b9c1b01a81206c59d9d2438"
    }, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': 'eyJpdiI6IkRiY1JMbU1WUjJyM0pVRE85ampEMVE9PSIsInZhbHVlIjoiODkxK2FlL0tzMkZDdWpvcXZnSVVXRjMzRmwzZGprTmFnbFBSemVhdzhPUTZzdmRLbk03TUNQWVJ3ZWV1MW50aVFtdlUzNUFnTWpGVWpOWTd0MXVTU2tHeG9QR2RpenR6UFppVXg2M0xKTDU2VW9NWDNaQ3lZWVJtOFBDZTFoNEoiLCJtYWMiOiJjOWQwM2JiOTZiNDVkYzJjYTA3ODg5NzBmMDI1Nzc2NmY1MTgxYTNiM2NhYWJmMjE0MGExYzc2MzVkNjJkODE2IiwidGFnIjoiIn0=',
        'User-Agent': 'Googlebot-News'
      }
    })

    const data = response.data

    const result = data.map(item => {
      return {
        url: item.url[0].url,
        name: item.url[0].name,
        type: item.url[0].type,
        ext: item.url[0].ext,
        thumb: item.thumb,
        meta: {
          title: item.meta.title,
          source: item.meta.source
        }
      }
    })

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function ttStalk(user) {
  try {
    const payload = {
      id: user,
      hash: "403ee79076089f17fb14e2a5c7a1b57a",
      mode: "profile",
      locale: "en",
      loading_indicator_url: "https://ttsave.app/images/slow-down.gif",
      unlock_url: "https://ttsave.app/en/unlock"
    }

    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    const response = await axios.post('https://api.ttsave.app/', payload, {
      headers
    })

    const $ = cheerio.load(response.data)

    const uniqueId = $('#unique-id').val()
    const username = $('h2.font-extrabold').text().trim()
    const thumbnail = $('a[href*="tiktokcdn.com"] img').attr('src')
    const url = $('a[href*="tiktok.com/@"]').attr('href')
    const download = $('#button-download-ready a[href*="tiktokcdn.com"]').attr('href')

    return {
      creator,
      uniqueId,
      username,
      thumbnail,
      url,
      download
    }

  } catch (error) {
    console.error(error)
    throw error
  }
}

async function igdlV2(url) {
  const payload = {
    "url": url,
    "ts": 1716394187011,
    "_ts": 1715332465651,
    "_tsc": 0,
    "_s": "cd38eed1cb0d36f8701199e6f1d0b766b8c6529b13fce7eef7baaab816fc9da7"
  }

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.post('https://sssinstagram.com/api/convert', payload, {
      headers
    })

    const urls = response.data.url.map(item => item.url)
    const thumbnail = response.data.thumb
    const meta = response.data.meta
    return {
      creator,
      meta,
      thumbnail,
      urls
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function igdlV3(url) {
  const payload = {
    url: url,
    ts: 1716395447858,
    _ts: 1715778598998,
    _tsc: 0,
    _s: "cca3f9b6df219953c2467eb8d963b73fed4215d67ebb6467eb4244b35ec89566"
  };

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': 'eyJpdiI6Im9MVy9OV0c4MEF6WUNEdWpyYWdJbEE9PSIsInZhbHVlIjoiYTBZWG9qWHVTcE11UitUb3VwM04vWExkcXZYQ1Y3dnBodEZqaTlrNXRWRVpuVEFyaFZLU3YzVm5RZE40eUovNUEzSW1wVzk5all5VmtwcWpwRGN4Yk1vY09EZDdWWlVDOCsybFFtaFhBTitOUW1ib1BMTVNNNmJPai9XNzlYakYiLCJtYWMiOiIwN2I5YTVkODlmZDYwNTdjOTI3NWQzMmFmYmQyNGNmOWQ2ZTU1ZTJjNDFlOWQ4NzZhNzg5OTdlMmE3NTVlOTAzIiwidGFnIjoiIn0=',
    'User-Agent': 'Googlebot-News'
  }

  try {
    const response = await axios.post('https://igram.world/api/convert', payload, {
      headers
    })

    const result = response.data

    const urls = response.data.url.map(item => item.url)
    const thumbnail = response.data.thumb
    const meta = response.data.meta
    return {
      creator,
      meta,
      thumbnail,
      urls
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  igStalk,
  pinterest,
  xhentai,
  spotifyDownload,
  spotifySearch,
  randomGalau,
  dystopia,
  igStoryV2,
  waifu,
  ChatGpt,
  cartoonify,
  esrgan,
  imageGenerator,
  VirtualGirlfriends,
  igPost,
  ttStalk,
  igdlV2,
  igdlV3
}