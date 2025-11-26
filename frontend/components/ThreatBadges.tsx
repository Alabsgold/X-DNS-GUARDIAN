import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatBadgesProps {
    threats: string[];
    status: string;
}

export function ThreatBadges({ threats, status }: ThreatBadgesProps) {
    if (status === "Safe" && threats.length === 0) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>No Threats Detected</span>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {threats.map((threat, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{threat}</span>
                </div>
            ))}
        </div>
    );
}
