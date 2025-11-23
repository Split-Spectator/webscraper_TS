import { argv } from 'node:process';
import { getHTML } from './crawl';


async function main() {
    let arg = process.argv;
    let base = arg[2];
    if (arg.length !== 3 ) {
        console.log("Usage: npm run start <BASE_URL>");
        process.exit(1);
    }
   
    console.log(`Beginning crawl of ${base}`)
    let html = await getHTML(base);
    console.log(html);
    process.exit(0);
   }

  main();
  