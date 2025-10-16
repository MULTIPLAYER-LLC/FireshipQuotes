# FireshipQuotes

 A simple image-sharing platform powered by SvelteKit and Pocketbase

Deployed @ https://fireshipquotes.com (contains NSFW user-submitted content)

## Developer Setup

### Requirements:

#### Operating System
This setup guide assumes that you are working with an **Ubuntu 24.04 environment (non-WSL)**.

It is possible to successfully deploy and/or develop in other environments, but this guide may be inaccurate for those environments. Proceed at your own risk.

Suggestions for achieving an Ubuntu 24.04 environment include:
* Running a virtual machine
* Dual Booting
* Installing on a second machine (old laptop, etc)

#### Hardware
It is suggested to deploy this project on a machine with access to at least **4GB of RAM**, **100GB of HDD space**, and **2 CPU cores**.

Allocating fewer resources than this may result in bad things happening. Buyer beware!

<hr>

### Installing Dependencies

After cloning this repository to the folder of your choice, run the following set of shell commands one at a time:

```bash
sudo ./bin/_init/init-apt-install.sh
./bin/_init/init-asdf.sh
./bin/_init/init-nodejs.sh
sudo ./bin/_init/init-docker.sh
cd app-frontend && ../bin/_init/init-npm.sh && cd -
sudo ./bin/_init/init-hosts.sh
```

### Setting up .env

This project depends on several secrets, most of which are stored in the `env/{environment}/.env` file(s).

To set up a development environment, copy the example `.env` file into its rightful position:
```bash
cp env/development/example.env env/development/.env
```

Once copied, populate the omitted fields (marked with `%%FILL%%`).

#### ENV / PUBLIC_ENV
set these values to the environment as it is named in the directory this `.env` file is within. (probably `development` or `production`).

#### EXPOSE_PORT
the port your app listens on. For development, you want this on port 80.

#### DISCORD_OAUTH_ID / DISCORD_OAUTH_SECRET
these values are the oauth id and secret for the discord application through which the project requests oauth.

You can create a new discord application [here](https://discord.com/developers/applications?new_application=true). 

#### API_USER_PASSWORD / WEB_USER_PASSWORD / GRAFANA_PASSWORD
these passwords can be set to whatever your heart desires!

<hr>

### Deploying

This project uses docker compose for deployment. 

Several convenient scripts are provided to facilitate starting, stopping, and other actions.

#### Starting and Stopping

Each environment has a script to start the application, and a script to stop it:

```bash
./bin/development/up.sh
./bin/development/down.sh
```

#### Misc. Commands

Each environment also provides a script that allows for running docker compose subcommands:
```bash
./bin/development/run.sh <subcommand>
```

For example, to view the logs of the sveltekit service docker container:
```bash
./bin/development/run.sh logs frontend
```

<hr>

## Admin Features

This project exposes several admin panels which are of use for server administration as well as debugging.

### Pocketbase
http://pb.fireshipquotes.local/_/

Pocketbase's admin UI enables developers to edit data, change access rules, perform migrations, and much more.

### Grafana Dashboard
http://logs.fireshipquotes.local/

This project centralizes all service logs within Grafana. 

You may use Grafana's log explorer to filter and locate logs for any of the services we use.

Grafana also has lots of other powerful features, such as emitting alerts triggered by custom events, all configurable through the dashboard.


