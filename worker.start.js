addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {  
  // fetch verification status and test
  /**
   * URL: https://us-central1-remixapp-main.cloudfunctions.net/discordverify
   * method: POST
   * body: JSON string with these parameters:
   * - PUBLIC_KEY: your public key from your Discord application settings
   * - signature: request.headers.get('X-Signature-Ed25519')
   * - body: request.headers.get('X-Signature-Timestamp') + (await request.clone().text())
   * 
   * returns: JSON object that looks like this: 
   * {
   *   verified: true | false
   * }
   */

  // If verified is false, return Response with status code 401 unauthorized

  // Get data
  const data = await request.json();

  /**
   * If Discord PING message (data.type == 1), return a Response with an JSON string that looks like this:
   * {
   *    type : 1
   * }
   * 
   * status: 200
   */ 

  
  // Get sides and validate input
  const sides = data.data.options[0].value;
  /**
   * Validation:
   * - Is the number of sides an integer?
   * - Is the integer 1 or above?
   * 
   * If validation fails, send a message Response back. Here's what a message object looks like (JSON string):
   * {
   *    type: 4
   *    data: {
   *      content: messageText
   *    }
   * }
   * 
   * status: 200
   */

  // Roll and return a value, with the same sort of message Response detailed above!
}
