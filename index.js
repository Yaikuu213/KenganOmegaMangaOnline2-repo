class KenganManga {
    constructor() {
        this.baseUrl = "https://w15.kengan-manga.com";
    }

    async getChapterList(mangaUrl) {
        const response = await fetch(mangaUrl);
        const html = await response.text();
        const chapterRegex = /<a href="(https:\/\/w15\.kengan-manga\.com\/manga\/[^"]+)">([^<]+)<\/a>/g;
        let chapters = [];
        let match;
        while ((match = chapterRegex.exec(html)) !== null) {
            chapters.push({ url: match[1], name: match[2].trim() });
        }
        return chapters;
    }

    async getPageList(chapterUrl) {
        const response = await fetch(chapterUrl);
        const html = await response.text();
        const imgRegex = /<img [^>]*src="(https:\/\/w15\.kengan-manga\.com\/wp-content\/uploads\/[^"]+)"/g;
        let pages = [];
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            pages.push({ url: match[1] });
        }
        return pages;
    }
}

// LA LIGNE À NE PAS OUBLIER :
export default new KenganManga();
