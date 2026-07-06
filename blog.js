document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");

    fetch("posts/posts.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load posts.json");
            return response.json();
        })
        .then(posts => {
            const fragment = document.createDocumentFragment();

            posts.forEach(post => {
                const article = document.createElement("article");
                article.classList.add("blog-summary");
                if (post.highlighted) {
                    article.classList.add("highlight");
                }

                const imageHTML = post.image
                    ? `<img src="${post.image}" alt="" class="thumbnail-original" loading="lazy">`
                    : '';

                const postLink = `blogPostTemplate.html?file=${encodeURIComponent(post.url)}`;

                article.innerHTML = `
                    <div class="thumbnail-container">
                        ${imageHTML}
                    </div>
                    <div class="content-container">
                        <h2><a href="${postLink}" class="post-title-link"></a></h2>
                        <time class="blog-date" datetime="${post.dateISO}">${post.dateISO}</time>
                        <p class="blog-excerpt"></p>
                        <a href="${postLink}" class="read-more">Read More →</a>
                    </div>
                `;

                // タイトルと抜粋はtextContentで挿入 (HTMLとして解釈させない)
                article.querySelector(".post-title-link").textContent = post.title;
                article.querySelector(".blog-excerpt").textContent = post.excerpt || "";

                fragment.appendChild(article);
            });

            blogList.appendChild(fragment);
        })
        .catch(error => {
            console.error("Error loading posts.json:", error);
            blogList.innerHTML = "<p>ブログ記事のリストの読み込みに失敗しました。</p>";
        });
});
