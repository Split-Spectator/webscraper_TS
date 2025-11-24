import * as fs from 'fs';
import * as path from 'path';

export function writeCSVReport(
    pageData: Record<string, any>,
    filename = "report.csv",
): void {
    const filePath = path.resolve(process.cwd(), filename);
    const headers = ["page_url", "h1", "first_paragraph", "outgoing_link_urls", "image_urls"];
    const rows: string[] = [headers.join(",")];

    for (const page of Object.values(pageData)) {
        console.log("PAGE IN REPORT:", page); // degugging. REMOVE 
        const outgoing = Array.isArray(page.outgoing_links)
        ? page.outgoing_links
        : [];
        const images = Array.isArray(page.image_urls)
        ? page.image_urls
        : [];
        

        console.log(
            "VALUES:",
            page.url,
            page.h1,
            page.first_paragraph,
            outgoing,
            images,
          ); // degugging. REMOVE 


        const row = [
            csvEscape(page.url),
            csvEscape(page.h1),
            csvEscape(page.first_paragraph),
            csvEscape(outgoing.join(";")),
            csvEscape(images.join(";")),
          ];
          rows.push(row.join(","));
        }
     

    fs.writeFileSync(filePath, rows.join("\n"), { encoding: 'utf8' });
}

function csvEscape(field: string) {
    const str = field ?? "";
    const needsQuoting = /[",\n]/.test(str);
    const escaped = str.replace(/"/g, '""');
    return needsQuoting ? `"${escaped}"` : escaped;
}