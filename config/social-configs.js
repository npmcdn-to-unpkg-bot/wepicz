const socialConfigs = {
  instagram: {
    clientId:'918b24f616b341f6a17e5b1284fa941e',
    clientSecret: 'ae4e4a5df5064c2f943aac556785b427',
    authorizeUrl: 'https://api.instagram.com/oauth/authorize/',
    authorizeUrlCallback: 'http://eventpic.ddns.net:3000/instagram/authorize-callback',
    path: {
      authorize: '/instagram/authorize',
      authorizeCallback: '/instagram/authorize-callback'
    },
    accessToken: '32555735.918b24f.f1b42c28394042d19e9d563ba31275c3'
  }
}

module.exports = socialConfigs;
