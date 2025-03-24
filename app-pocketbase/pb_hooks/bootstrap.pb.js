onBootstrap((e) => {
  e.next();
  const app = e.app;
  
  const users = app.findCollectionByNameOrId("users");
  users.oauth2.providers = [{
    pkce: null,
    name: "discord",
    clientId: process.env.DISCORD_OAUTH_ID,
    clientSecret: process.env.DISCORD_OAUTH_SECRET,
    authUrl:"",
    tokenUrl:"",
    userApiUrl:"",
    displayName:""
  }];
  users.oauth2.mappedFields = {
    "id": "discord_id",
    "username": "name",
    "avatarURL": "avatar"
  }
  users.oauth2.enabled = true;
  users.passwordAuth.enabled = false;
  app.save(users);


  let settings = app.settings()
  settings.meta.appName = "FireshipQuotes"
  settings.meta.appURL = process.env.PUBLIC_POCKETBASE_URL
  settings.logs.maxDays = 30
  settings.logs.logAuthId = true
  settings.logs.logIP = true
  settings.trustedProxy.headers = ["X-Forwarded-For"]
  settings.trustedProxy.useLeftmostIP = true
  settings.batch.enabled = true;
  
  app.save(settings)
});