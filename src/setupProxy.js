const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/gradio',
    createProxyMiddleware({
      target: 'https://6c53dc9f862a74805d.gradio.live>', // 예: https://username-space-name.hf.space
      changeOrigin: true,
      ws: true, // Gradio가 WebSocket을 쓴다면 필요
      pathRewrite: { '^/gradio': '' }, // /gradio -> /
      // 필요시 헤더 추가:
      onProxyReq(proxyReq) {
        // 예: 인증이 필요하면 여기서 헤더 설정
        // proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_HF_TOKEN}`);
      },
    })
  );
};
