"use client";

import { useState } from "react";
import axios from "axios";
import { SearchBar } from "@/components/SearchBar";
import { SafetyScorecard } from "@/components/SafetyScorecard";
import { ThreatBadges } from "@/components/ThreatBadges";
import { ShieldCheck, Server, Globe, Lock } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (domain: string) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Use localhost for demo if env not set
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/api/v1/scan-domain`, { domain });
      setResult(response.data);
    } catch (err) {
      setError("Failed to scan domain. Please ensure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pb-16 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Official .ng Domain Registry Scanner</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            X-DNS <span className="text-blue-600">Guardian+</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Real-time safety profiling for the Nigerian namespace. Detect phishing, malware, and suspicious activity instantly.
          </p>

          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Column: Score */}
            <div className="md:col-span-1">
              <SafetyScorecard
                score={result.safety_profile.score}
                status={result.safety_profile.status}
              />
            </div>

            {/* Right Column: Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Threats */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Security Analysis
                </h3>
                <ThreatBadges
                  threats={result.safety_profile.threats}
                  status={result.safety_profile.status}
                />
              </div>

              {/* Technical Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DNS Info */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-slate-500">
                    <Server className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase">DNS Records</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">A Records:</span>
                      <span className="font-mono text-slate-700">{result.dns_records.A?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">MX Records:</span>
                      <span className="font-mono text-slate-700">{result.dns_records.MX?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TTL:</span>
                      <span className="font-mono text-slate-700">{result.dns_records.ttl}s</span>
                    </div>
                  </div>
                </div>

                {/* Registrar Info */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-slate-500">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase">Registration</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-500 text-xs">Registrar</span>
                      <span className="font-medium text-slate-900 truncate" title={result.whois_data.registrar}>
                        {result.whois_data.registrar || "Unknown"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-500 text-xs">Created</span>
                      <span className="font-medium text-slate-900">
                        {result.whois_data.creation_date ? new Date(result.whois_data.creation_date).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SSL Info */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-full", result.ssl_info.valid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">SSL Certificate</div>
                    <div className="text-xs text-slate-500">{result.ssl_info.valid ? "Valid & Active" : "Missing or Invalid"}</div>
                  </div>
                </div>
                {result.ssl_info.valid && (
                  <div className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded">Secured</div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}
