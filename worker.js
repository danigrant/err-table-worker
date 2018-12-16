addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

let airtableUrl = 'https://api.airtable.com/v0/appXXXXXXXXXXXXXX/table-name/'
let airtableKey = 'keyXXXXXXXXXXXXXX'
let postData = ''

async function handleRequest(request) {
  try {
    let clonedRequest = request.clone()
    postData = await clonedRequest.json();
    console.log(postData)
  } catch (e) {

  }

  const response = await fetch(request)

  if (response.status != 200) {

    let body = {
        "fields": {
          "error": response.status,
          "timestamp":  new Date().toString(),
          "url": request.url,
          "request-user-agent": JSON.stringify(request.headers.get('user-agent')),
          "request-ip": JSON.stringify(request.headers.get('cf-connecting-ip')),
          "request-country": JSON.stringify(request.headers.get('Cf-Ipcountry')),
          "request-method": JSON.stringify(request.method),
          "request": JSON.stringify(postData)
        }
    }

    let res = await fetch(`${airtableUrl}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${airtableKey}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body)
    })

    let json = await res.json(); 
    // console.log(json) <-- uncomment this to see response from airtable api
  }
  return response
}
