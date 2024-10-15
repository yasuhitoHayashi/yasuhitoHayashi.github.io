document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const converter = new showdown.Converter();

    fetch("posts/posts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load posts.json");
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                fetch(post.url)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to load ${post.url}`);
                        return response.text();
                    })
                    .then(markdown => {
                        const lines = markdown.split('\n');
                        const date = lines[1].trim(); // 2行目の日付を取得
                        const contentWithoutDate = lines.slice(2).join('\n'); // 3行目以降を取得
                        
                        // MarkdownをHTMLに変換
                        const htmlContent = converter.makeHtml(contentWithoutDate);
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = htmlContent;

                        // タイトルとイントロを抽出
                        const title = tempDiv.querySelector("h1")?.textContent || "No Title";
                        const intro = tempDiv.querySelector("p")?.textContent || "No Content";

                        // 記事要素を生成
                        const article = document.createElement("article");
                        article.classList.add("blog-summary");
                        
                        article.innerHTML = `
                            <h2>${title}</h2>
                            <p class="blog-date">${date}</p>
                            <p>${intro}</p>
                            <a href="blogPostTemplate.html?file=${post.url}" class="read-more">Read More</a>
                        `;
                        
                        blogList.appendChild(article);
                    })
                    .catch(error => {
                        console.error(`Error loading ${post.url}:`, error);
                        blogList.innerHTML += `<p>記事の読み込みに失敗しました: ${post.url}</p>`;
                    });
            });
        })
        .catch(error => {
            console.error("Error loading posts.json:", error);
            blogList.innerHTML = "<p>ブログ記事のリストの読み込みに失敗しました。</p>";
        });
});