document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const converter = new showdown.Converter();

    const monthMap = {
        "January": 0, "February": 1, "March": 2, "April": 3,
        "May": 4, "June": 5, "July": 6, "August": 7,
        "September": 8, "October": 9, "November": 10, "December": 11
    };

    fetch("posts/posts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load posts.json");
            return response.json();
        })
        .then(posts => {
            const postPromises = posts.map(post => 
                fetch(post.url)
                    .then(response => {
                        if (!response.ok) throw new Error(`Failed to load ${post.url}`);
                        return response.text();
                    })
                    .then(markdown => {
                        const lines = markdown.split('\n');
                        let title = lines[0].trim();
                        title = title.replace(/^#\s*/, ''); // #とスペースを削除

                        const dateStr = lines[1].trim();
                        const [monthStr, day, year] = dateStr.split('-');
                        const month = monthMap[monthStr];
                        const date = new Date(year, month, day);

                        const contentWithoutTitleDate = lines.slice(2).join('\n');
                        const htmlContent = converter.makeHtml(contentWithoutTitleDate);
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = htmlContent;
                        const intro = tempDiv.querySelector("p")?.textContent || "No Content";

                        return { title, date, dateStr, intro, url: post.url };
                    })
                    .catch(error => {
                        console.error(`Error loading ${post.url}:`, error);
                        return null;
                    })
            );

            Promise.all(postPromises).then(postDataArray => {
                postDataArray
                    .filter(post => post !== null)
                    .sort((a, b) => b.date - a.date) // Dateオブジェクトでソート
                    .forEach(post => {
                        const article = document.createElement("article");
                        article.classList.add("blog-summary");

                        article.innerHTML = `
                            <h2>${post.title}</h2>
                            <p class="blog-date">${post.dateStr}</p> <!-- ソート済み日付を表示 -->
                            <p>${post.intro}</p>
                            <a href="blogPostTemplate.html?file=${post.url}" class="read-more">Read More</a>
                        `;
                        
                        blogList.appendChild(article);
                    });
            });
        })
        .catch(error => {
            console.error("Error loading posts.json:", error);
            blogList.innerHTML = "<p>ブログ記事のリストの読み込みに失敗しました。</p>";
        });
});