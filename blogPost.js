document.addEventListener("DOMContentLoaded", () => {
    const contentElement = document.getElementById("blog-post-content");
    const converter = new showdown.Converter();
    const urlParams = new URLSearchParams(window.location.search);
    const mdFile = urlParams.get("file") || "post1.md";

    fetch(mdFile)
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = converter.makeHtml(markdown);
            contentElement.innerHTML = htmlContent;
        })
        .catch(error => {
            contentElement.innerHTML = "<p>ブログ記事の読み込みに失敗しました。</p>";
            console.error("Error loading markdown file:", error);
        });
});