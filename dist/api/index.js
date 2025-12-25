import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { matchPath } from 'react-router';
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use('/assets', express.static(resolve(__dirname, '../client/assets')));

app.use(express.static('../client/assets'));

app.use('*all', async (req, res) => {

  try {

    const url = req.originalUrl;

    if (url == "/robots.txt") {
      res.status(200).end(readFileSync(resolve(__dirname, '../robots.txt'), 'utf-8'));
    }
    else if (url == "/sitemap.xml") {
      res.status(200).end(readFileSync(resolve(__dirname, '../sitemap.xml'), 'utf-8'));
    } else {

      let template;
      let render;
  
      template = readFileSync(resolve(__dirname, '../client/index.html'), 'utf-8');
      render = (await import('../server/serverEntry.js')).default;
      
      //*get url language for SEO & SSR
      const language = matchPath({ path: "/:language/*" }, url)?.params?.language || process.env.VITE_DEFAULT_LANGUAGE;
  
      const { html, helmet } = render(url,language);
  
      const cssTags = `<link rel="stylesheet" href="../client/assets/index-Y3g2U8_F.css">`;
  
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
    }

  } catch (e) {
    console.error(e);
    res.status(500).end("internal server error");//
  }

});

export default app;

 app.listen(process.env.PORT, () => {
   console.log('SSR server running at http://localhost:5173');
 });