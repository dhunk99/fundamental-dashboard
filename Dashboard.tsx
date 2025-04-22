import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [economicEvents, setEconomicEvents] = useState([]);
  const [interestRates, setInterestRates] = useState([]);
  const [marketSentiment, setMarketSentiment] = useState({});
  const [news, setNews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch("/api/economic-calendar")
      .then((res) => res.json())
      .then((data) => setEconomicEvents(data));

    fetch("/api/interest-rates")
      .then((res) => res.json())
      .then((data) => setInterestRates(data));

    fetch("/api/market-sentiment")
      .then((res) => res.json())
      .then((data) => setMarketSentiment(data));

    fetch("/api/fundamental-news?apiKey=0c3d8abc98d24c1aab854f50d4ab75c9")
      .then((res) => res.json())
      .then((data) => setNews(data));

    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => setWatchlist(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      <motion.div whileHover={{ scale: 1.02 }}>
        <Card className="bg-gradient-to-br from-blue-900 to-gray-900 text-white shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Market Sentiment</h2>
            <p>DXY: {marketSentiment.dxy}</p>
            <p>VIX: {marketSentiment.vix}</p>
            <p>US10Y: {marketSentiment.us10y}%</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }}>
        <Card className="bg-gradient-to-br from-purple-800 to-gray-800 text-white shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Interest Rates</h2>
            <ul>
              {interestRates.map((rate, index) => (
                <li key={index} className="mb-1">
                  {rate.country}: {rate.value}%
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }}>
        <Card className="bg-gradient-to-br from-yellow-700 to-yellow-900 text-white shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Watchlist (Forex & Gold)</h2>
            <ul>
              {watchlist.map((item, index) => (
                <li key={index} className="border-b border-white/10 py-1">
                  {item.symbol}: {item.commentary}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div className="col-span-full" whileHover={{ scale: 1.01 }}>
        <Card className="bg-gradient-to-br from-gray-900 to-black text-white shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Upcoming Economic Events</h2>
            <ul>
              {economicEvents.map((event, index) => (
                <li key={index} className="border-b border-white/10 py-2">
                  <span className="font-semibold">{event.country}</span>: {event.title} ({event.impact})<br />
                  <span className="text-sm text-gray-400">{event.date} - {event.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div className="col-span-full" whileHover={{ scale: 1.01 }}>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-950 text-white shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">Latest Fundamental News</h2>
            <ul>
              {news.map((article, index) => (
                <li key={index} className="border-b border-white/10 py-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {article.title}
                  </a>
                  <p className="text-sm text-gray-400">{article.source} - {article.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}