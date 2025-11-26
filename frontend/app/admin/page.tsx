"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, Activity, Search } from "lucide-react";

export default function AdminDashboard() {
    const [scans, setScans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScans = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                const response = await axios.get(`${apiUrl}/api/v1/report`);
                setScans(response.data);
            } catch (error) {
                console.error("Failed to fetch admin report", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScans();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500">Monitor recent domain scans and threats.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-700">Live Monitoring</span>
                    </div>
                </header>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading dashboard data...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Domain</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Score</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Threats</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {scans.map((scan) => (
                                        <tr key={scan._id || scan.domain} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">{scan.domain}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${scan.safety_profile.status === 'Safe' ? 'bg-green-100 text-green-800' :
                                                        scan.safety_profile.status === 'Dangerous' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {scan.safety_profile.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-slate-600">{scan.safety_profile.score}</td>
                                            <td className="px-6 py-4">
                                                {scan.safety_profile.threats.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {scan.safety_profile.threats.map((t: string, i: number) => (
                                                            <span key={i} className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(scan.created_at || scan.scan_time).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {scans.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                                No scans recorded yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
