// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  envName: 'Video Player',
  production: true,
  appMode: 'video',
  wssUrl: 'ws://192.168.0.150:8080',
  proxyUrl: 'http://192.168.0.150/proxy/',
  domainModes: [{
    "id": "kinder",
    "label": "Kindervideos"
  },
  {
    "id": "jahresvideo",
    "label": "Jahresvideos"
  }]
};