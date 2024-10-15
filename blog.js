document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const converter = new showdown.Converter();

    fetch("posts/posts.json")
        .then(response => response.json())
        .then(posts => {
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            posts.forEach(post => {
                fetch(post.url)
                    .then(response => response.text())
                    .then(markdown => {
                        const htmlContent = converter.makeHtml(markdown);
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = htmlContent;

                        const title = tempDiv.querySelector("h1")?.textContent || "No Title";
                        const intro = tempDiv.querySelector("p")?.textContent || "No Content";

                        const article = document.createElement("article");
                        article.classList.add("blog-summary");
                        article.innerHTML = `
                            <h2>${title}</h2>
                            <p class="blog-date">${post.date}</p>
                            <p>${intro}</p>
                            <a href="blogPostTemplate.html?file=${post.url}" class="read-more">Read More</a>
                        `;
                        blogList.appendChild(article);
                    })
                    .catch(error => console.error(`Error loading ${post.url}:`, error));
            });
        })
        .catch(error => console.error("Error loading posts.json:", error));
});