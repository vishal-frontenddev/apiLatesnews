    const API_KEY = "46423221a6ba4ccf98d52942738cd7df"; // 🔐 Replace this with your NewsAPI key

    async function searchNews() {
      const query = document.getElementById("searchInput").value.trim();
      const container = document.getElementById("newsContainer");
      const loading = document.getElementById("loading");

      if (!query) {
        alert("Please enter a topic to search!");
        return;
      }

      container.innerHTML = "";
      loading.innerText = "🔄 Loading news...";

      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=2025-06-20&sortBy=popularity&apiKey=${API_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        loading.innerText = "";

        if (data.status !== "ok" || data.articles.length === 0) {
          container.innerHTML = "<p>No news found for this topic.</p>";
          return;
        }

        data.articles.forEach(article => {
          const card = document.createElement("div");
          card.className = "news-card";

          card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News Image" />
            <div class="news-content">
              <h3>${article.title}</h3>
              <p>${article.description || "No description available."}</p>
              <a href="${article.url}" target="_blank">Read more →</a>
            </div>
          `;
          container.appendChild(card);
        });

      } catch (error) {
        console.error("Error:", error);
        loading.innerText = "";
        container.innerHTML = "<p>Error fetching news. Please try again later.</p>";
      }
    }