"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    onSearch: (domain: string) => void;
    isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [domain, setDomain] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (domain.trim()) {
            onSearch(domain.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
            <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 transition-shadow duration-300">
                <div className="grid place-items-center h-full w-12 text-gray-400">
                    <Search className="h-6 w-6" />
                </div>

                <input
                    className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Enter domain (e.g., example.com.ng)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        "h-full px-8 text-white font-semibold transition-all duration-300",
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    )}
                >
                    {isLoading ? "Scanning..." : "Scan"}
                </button>
            </div>
        </form>
    );
}
