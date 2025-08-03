import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/whois", async (req, res) => {
  const { domain } = req.query;
  const apiKey = process.env.WHOIS_API_KEY;
  if (!domain) return res.status(400).json({ error: "Domain required" });

  const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json.ErrorMessage) throw new Error(json.ErrorMessage.msg);
    res.json(json.WhoisRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));