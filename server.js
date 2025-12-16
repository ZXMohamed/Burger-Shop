import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { matchPath } from 'react-router';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

const app = express();
let vite;

if (!isProd) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares);
} else {
  app.use('/assets', express.static(resolve(__dirname, 'dist/assets')));
}

app.use('*all', async (req, res) => {

  try {
    const url = req.originalUrl;

    let template;
    let render;

    if (!isProd) {
      template = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/serverEntry.jsx')).default;
    } else {
      template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8');
      render = (await import('./dist/serverEntry.js')).default;
    }
    
    //*get url language for SEO & SSR
    const language = matchPath({ path: "/:language/*" }, url)?.params?.language || process.env.VITE_DEFAULT_LANGUAGE;

    const { html, helmet } = await render(url,language);

    const cssFiles = vite.moduleGraph.urlToModuleMap.get("/src/App.jsx")?.ssrTransformResult?.deps?.filter(f => f.endsWith(".css")) || [];
    const sassFiles = vite.moduleGraph.urlToModuleMap.get("/src/App.jsx")?.ssrTransformResult?.deps?.filter(f => f.endsWith(".scss")) || [];
    const cssTags = [...cssFiles, ...sassFiles].map((href) => `<link rel="stylesheet" href="${href}">`).join("");

    //*send server language for client (for successful hydration match)
    const passServerData = `<script id="serverDataJson" type="application/json" > {"language" : "${language}"}</script >`;

    const finalHtml = template
      .replace(`%--HTMLLanguage--%`, language)
      .replace(`<!--app-html-->`, html)
      .replace(`<!--app-css-->`, cssTags)
      .replace(`<!--helmet-title-->`, helmet.title.toString())
      .replace(`<!--helmet-meta-->`, helmet.meta.toString())
      .replace(`<!--helmet-link-->`, helmet.link.toString())
      .replace(`<!--helmet-script-->`, helmet.script.toString())
      .replace(`<!--app-server-data-->`, passServerData)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (e) {
    vite.ssrFixStacktrace(e)
    console.error(e);
    res.status(500).end(e.message);
  }
});

app.listen(5173, () => {
  console.log('SSR server running at http://localhost:5173');
});