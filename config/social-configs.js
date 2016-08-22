const socialConfigs = {
  instagram: {
    clientId:'918b24f616b341f6a17e5b1284fa941e',
    clientSecret: 'ae4e4a5df5064c2f943aac556785b427',
    authorizeUrl: 'https://api.instagram.com/oauth/authorize/',
    authorizeUrlCallback: 'http://eventpic.ddns.net:3000/instagram/authorize-callback',
    path: {
      authorize: '/instagram/authorize',
      authorizeCallback: '/instagram/authorize-callback'
    }
  }
}

module.exports = socialConfigs;
