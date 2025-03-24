migrate((app) => {
  let superusers = app.findCollectionByNameOrId("_superusers")
  
  // api superuser 
  let api_user = new Record(superusers);
  api_user.set("email", process.env.API_USER_EMAIL);
  api_user.set("password", process.env.API_USER_PASSWORD);
  app.save(api_user);

  // web ui superuser
  let web_user = new Record(superusers);
  web_user.set("email", process.env.WEB_USER_EMAIL);
  web_user.set("password", process.env.WEB_USER_PASSWORD);
  app.save(web_user);
});