module.exports = {
  apps : [
  {
    script: 'server.js',
    watch: true,
    ignore_watch: ["node_modules", "logs"],

  env: {
    NODE_ENV: "development",
    PORT: 3099,
    DB_HOST: "localhost",
    DB_NAME: "aula19_db",
    SECRET_KEY: "chave_desenvolvimento_aula19"
  }
  }
  ],

  deploy : {
    production : {
      user : 'Luis Henrique de Souza Torres',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
