import * as cheerio from "cheerio"
import axios from "axios"

export type ExtensionInformation = {
    downloads: number,
    author: string,
    name: string,
    icon?: string,
}

export default class GnomeAPI {
    public async getExtensionInformation(extensionID:string):Promise<ExtensionInformation> {
        let body = await axios.get(`http://extensions.gnome.org/extension/${extensionID}`)
        let parsed = cheerio.load(body.data)
        return {
            downloads: parseInt(parsed(".extension-header span.downloads").text()),
            author: parsed(".extension-header span.author>a").text(),
            name: parsed(".extension-header h3.extension-name").text(),
            icon: parsed(".extension-header img.icon").prop("src"),
        }
    }
}
