const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/v1', '/v2'],
    createProxyMiddleware({
      target: 'https://api.bitfinex.com/',
      changeOrigin: true,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return responseBuffer;
      }),
    }),
  );
};
