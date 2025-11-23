import { argv } from 'node:process';
import { getHTML, crawlPage } from './crawl';


async function main() {
    let arg = process.argv;
    let base = arg[2];
    if (arg.length !== 3 ) {
        console.log("Usage: npm run start <BASE_URL>");
        process.exit(1);
    }
   
    console.log(`Beginning crawl of ${base}`)
    const pages = await crawlPage(base);

    console.log(pages);;
   }

  main();
  