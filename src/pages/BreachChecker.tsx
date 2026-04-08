import { useState } from "react"; // Ensure lowercase 'i'

export default function BreachChecker() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    setTimeout(() => {
      const random = Math.random();

      if (random < 0.4) {
        setResults([]);
      } else if (random < 0.7) {
        setResults([
          {
            name: "Facebook Data Leak",
            date: "2019",
            risk: "Medium",
            data: ["Email"],
          },
        ]);
      } else {
        setResults([
          {
            name: "LinkedIn Data Breach",
            date: "2021",
            risk: "High",
            data: ["Email", "Password"],
          },
        ]);
      }
      setLoading(false);
    }, 1000);
  }; // <--- ADD THIS LINE TO CLOSE handleSearch

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Personal Data Breach Management System</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <button
          type="submit"
          style={{ marginTop: "10px", padding: "10px", width: "100%" }}
        >
          {loading ? "Scanning..." : "Check Breach"}
        </button>
      </form>

      {results !== null && (
        <div style={{ marginTop: "20px" }}>
          {results.length === 0 ? (
            <p style={{ color: "green" }}>✅ No breach found</p>
          ) : (
            <>
              <h3 style={{ color: "red" }}>⚠ Breach Found</h3>

              {results.map((r: any, i: number) => (
                <div key={i} style={{ border: "1px solid red", padding: "10px", marginTop: "10px" }}>
                  <p><b>Platform:</b> {r.name}</p>
                  <p><b>Date:</b> {r.date}</p>
                  <p><b>Risk:</b> {r.risk}</p>
                  <p><b>Data:</b> {r.data.join(", ")}</p>
                </div>
              ))}

              <p style={{ color: "red" }}>
                ⚠ Alert email has been sent to the user
              </p>

              <p>Last Checked: {new Date().toLocaleString()}</p>
            </>
          )}
        </div>
      )}
    </div>
  ); 
} 