import React, { useState } from "react";

function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchDomain = async () => {
    setError("");
    setData(null);

    if (!domain) {
      setError("Please enter a domain name");
      return;
    }

    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      setError("Invalid domain format");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/whois?domain=${encodeURIComponent(domain)}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      if (result.ErrorMessage) throw new Error(result.ErrorMessage.msg || "API error");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A";

  return (
 <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-element absolute text-blue-200 text-2xl animate-float-1">.com</div>
        <div className="floating-element absolute text-indigo-200 text-xl animate-float-2">.org</div>
        <div className="floating-element absolute text-blue-300 text-lg animate-float-3">www</div>
        <div className="floating-element absolute text-indigo-300 text-2xl animate-float-4">.net</div>
        <div className="floating-element absolute text-blue-200 text-xl animate-float-5">https://</div>
        <div className="floating-element absolute text-indigo-200 text-lg animate-float-6">.io</div>
        <div className="floating-element absolute text-blue-300 text-xl animate-float-7">.dev</div>
        <div className="floating-element absolute text-indigo-300 text-lg animate-float-8">DNS</div>
      </div>
      <div className="relative z-10 min-h-screen p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">🔍 Domain Lookup</h1>
        <p className="text-center text-gray-600">Search for domain information and registration details</p>
        <div className="flex flex-col sm:flex-row gap-4 my-6">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchDomain()}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
          />
          <button
            onClick={searchDomain}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {loading && (
          <div className="text-center py-8 bg-white rounded-lg">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Searching domain information...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            ⚠️ {error}
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Domain Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">🌐 Domain Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Domain Name</p>
                  <p className="font-semibold text-gray-800">{data.domainName || "N/A"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <div className="space-y-1 font-semibold">
                    {(
                      Array.isArray(data.status)
                        ? data.status
                        : typeof data.status === "string"
                        ? data.status.split(/\s+/) // <-- split by whitespace (space, tab, etc.)
                        : []
                    ).map((status, idx) => {
                      const s = status.toLowerCase();
                      const color =
                        s.includes("active") || s.includes("ok")
                          ? "text-green-600"
                          : s.includes("expired")
                          ? "text-red-600"
                          : "text-yellow-600";
                      return (
                        <p key={idx} className={color}>
                          {status}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">📅 Registration Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Created Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(data.createdDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Updated Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(data.updatedDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Expires Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(data.expiresDate)}</p>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Registrar</p>
                <p className="font-semibold text-gray-800">{data.registrarName || "N/A"}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">👤 Registrant Information</h2>
              <div className="space-y-4">
                {data.registrant ? (
                  Object.entries({
                    Name: data.registrant.name,
                    Organization: data.registrant.organization,
                    Email: data.registrant.email,
                    Phone: data.registrant.telephone,
                    Country: data.registrant.country,
                    State: data.registrant.state,
                    City: data.registrant.city,
                    Address: data.registrant.street1,
                  })
                    .filter(([_, value]) => value)
                    .map(([label, value]) => (
                      <div key={label} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">{label}</p>
                        <p className="font-semibold text-gray-800">{value}</p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 italic">Contact information not available</p>
                )}
              </div>
            </div>

            {/* Name Servers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">🖥️ Name Servers</h2>
              <div className="space-y-2">
                {data.nameServers?.hostNames?.length ? (
                  data.nameServers.hostNames.map((ns, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-mono text-gray-800">{ns}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Name servers not available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;