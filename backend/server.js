import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/whois", async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({
      error: "Domain required",
    });
  }

  try {
    const url = `https://api.domainee.dev/v1/tools/whois-lookup?domain=${encodeURIComponent(domain)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Domainee API returned HTTP ${response.status}`);
    }

    const json = await response.json();

    if (!json.ok || !json.data) {
      throw new Error(
        json.error?.message || "Unable to retrieve domain information"
      );
    }

    const data = json.data;

    // Convert Domainee response into the format
    // expected by the existing React frontend.
    const whoisRecord = {
      domainName: data.domain || null,

      status: Array.isArray(data.status)
        ? data.status
        : data.status
        ? [data.status]
        : [],

      createdDate: data.createdAt || null,
      updatedDate: data.updatedAt || null,
      expiresDate: data.expiresAt || null,

      registrarName: data.registrar || null,

      // Domainee's free lookup does not currently
      // return registrant contact information.
      registrant: null,

      nameServers: {
        hostNames: Array.isArray(data.nameservers)
          ? data.nameservers
          : [],
      },
    };

    res.json(whoisRecord);
  } catch (err) {
    console.error("WHOIS lookup error:", err);

    res.status(500).json({
      error: err.message || "Failed to retrieve domain information",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});