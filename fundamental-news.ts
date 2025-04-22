export default async function handler(req, res) {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&q=forex&apiKey=0c3d8abc98d24c1aab854f50d4ab75c9`);
  const news = await response.json();
  const result = news.articles.slice(0, 10).map(article => ({
    title: article.title,
    url: article.url,
    source: article.source.name,
    time: article.publishedAt,
  }));
  res.status(200).json(result);
}