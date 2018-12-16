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
  } catch (e) {
  
  }

  const response = await fetch(request)

  if (response.status != 200) {

    let body = {
        "fields": {
          "error": response.status,
          // "request-headers": JSON.stringify(request.headers.get('header1')),
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
  }
  return response
}
