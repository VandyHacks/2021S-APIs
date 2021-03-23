addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {  
  // fetch verification status and test
  const isVerified = (await (await fetch("https://us-central1-remixapp-main.cloudfunctions.net/discordverify", {
    method: "POST",
    body: JSON.stringify({
      "PUBLIC_KEY" : "77a74ad9dc07ab95ab7c2009b1388db6ef591d4ce01b41a78edb4683314a22cf",
      "signature": request.headers.get('X-Signature-Ed25519'),
      "body": request.headers.get('X-Signature-Timestamp') + (await request.clone().text())
    })
  })).json());
  if (!isVerified.verified) return new Response("invalid request signature", {status: 401});

  const data = await request.json();

  // If Discord PING message, reply with PING back
  if (data.type == 1) {
    return new Response(JSON.stringify({
      "type": 1
    }), {status: 200});
  }

  // Get sides and validate input
  const sides = data.data.options[0].value;
  if (parseInt(sides) != sides || sides < 1) {
    return new Response(JSON.stringify({"type": 4,
      "data": {
          "content": `That's not a valid number -- try again!`
      }}), {status: 200});
  }

  // Roll and return
  return new Response(JSON.stringify({
    "type": 4,
    "data": {
        "content": `You rolled a ${(Math.floor((Math.random() * sides)) % sides) + 1}!`
    }}), {status: 200}
  );
}
