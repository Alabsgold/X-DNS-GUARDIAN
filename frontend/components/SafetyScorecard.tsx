import { cn } from "@/lib/utils";

interface SafetyScorecardProps {
    score: number;
    status: string;
}

export function SafetyScorecard({ score, status }: SafetyScorecardProps) {
    let colorClass = "text-green-600";
    let bgClass = "bg-green-100";
    let barColor = "bg-green-600";

    if (score < 50) {
        colorClass = "text-red-600";
        bgClass = "bg-red-100";
        barColor = "bg-red-600";
    } else if (score < 80) {
        colorClass = "text-yellow-600";
        bgClass = "bg-yellow-100";
        barColor = "bg-yellow-600";
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wide text-xs">Safety Score</h3>
            <div className={cn("text-5xl font-bold mb-2", colorClass)}>
                {score}
            </div>
            <div className={cn("px-3 py-1 rounded-full text-sm font-semibold mb-4", bgClass, colorClass)}>
                {status}
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", barColor)}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}
