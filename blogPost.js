document.addEventListener("DOMContentLoaded", () => {
    const contentElement = document.getElementById("blog-post-content");
    const converter = new showdown.Converter();
    const urlParams = new URLSearchParams(window.location.search);
    const mdFile = urlParams.get("file") || "posts/post1.md";

    // posts/ 配下の .md のみ許可 (任意URL読み込みの防止)
    if (!/^posts\/[A-Za-z0-9._-]+\.md$/.test(mdFile)) {
        contentElement.innerHTML = "<p>指定された記事が見つかりません。</p>";
        return;
    }

    const MONTHS = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
    };

    function parseDate(line) {
        const m = line.trim().match(/^([A-Za-z]+)-(\d{1,2})-(\d{4})$/);
        if (!m) return null;
        const month = MONTHS[m[1].toLowerCase()];
        if (!month) return null;
        return `${m[3]}-${String(month).padStart(2, "0")}-${String(parseInt(m[2], 10)).padStart(2, "0")}`;
    }

    function setMeta(attr, name, content) {
        let tag = document.querySelector(`meta[${attr}="${name}"]`);
        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
    }

    fetch(mdFile)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${mdFile}`);
            return response.text();
        })
        .then(markdown => {
            const lines = markdown.split("\n");
            const title = (lines[0] || "").trim().replace(/^#\s*/, "");
            const dateISO = parseDate(lines[1] || "");
            const body = lines.slice(dateISO ? 2 : 0).join("\n");

            // ページタイトル・メタ情報を記事に合わせて更新
            if (title) {
                document.title = `${title} | Yasuhito Hayashi`;
                setMeta("property", "og:title", title);
            }

            const htmlContent = converter.makeHtml(body);
            const headerHTML = dateISO
                ? `<header class="post-header"><h1></h1><time datetime="${dateISO}" class="blog-date">${dateISO}</time></header>`
                : "";
            contentElement.innerHTML = headerHTML + htmlContent;

            if (title && headerHTML) {
                contentElement.querySelector(".post-header h1").textContent = title;
            }

            // description: 最初の段落から生成
            const firstP = contentElement.querySelector("article > p, p");
            if (firstP) {
                const desc = firstP.textContent.trim().slice(0, 140);
                setMeta("name", "description", desc);
                setMeta("property", "og:description", desc);
            }

            const firstImg = contentElement.querySelector("img");
            if (firstImg) {
                setMeta("property", "og:image", firstImg.src);
            }
        })
        .catch(error => {
            contentElement.innerHTML = "<p>ブログ記事の読み込みに失敗しました。</p>";
            console.error("Error loading markdown file:", error);
        });
});
