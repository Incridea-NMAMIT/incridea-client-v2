import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
import { showToast } from "../../../utils/toast";
import apiClient from "../../../api/client";

interface Props {
  criteria: {
    id: number;
    name: string;
    scoreOutOf?: number;
  };
  teamId: number;
  eventId: number;
  roundNo: number;
  initialScore?: string;
}

export default function CriteriaInputRow({
  criteria,
  teamId,
  eventId,
  roundNo,
  initialScore,
}: Props) {
  const [value, setValue] = useState(initialScore || "");
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setValue(initialScore || "");
    setIsDirty(false);
  }, [initialScore, teamId]);

  const handleSubmit = async () => {
    if (!value) return;
    
    // Client-side validation
    if (criteria.scoreOutOf && Number(value) > criteria.scoreOutOf) {
        showToast(`Score cannot exceed ${criteria.scoreOutOf}`, "error");
        return;
    }

    setLoading(true);
    try {
      await apiClient.post(
        `/judge/events/${eventId}/rounds/${roundNo}/score`,
        {
          teamId,
          criteriaId: criteria.id,
          score: value,
        }
      );
      showToast(`Score for ${criteria.name} saved`, "success");
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to save score", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-300 flex justify-between">
        <span>{criteria.name}</span>
        <span className="text-xs text-slate-500 self-center">Out of {criteria.scoreOutOf || 10}</span>
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder={`max ${criteria.scoreOutOf || 10}`}
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            // Prevent entering more than scoreOutOf (User Experience Enhancement)
            if (criteria.scoreOutOf && Number(val) > criteria.scoreOutOf) return;
            
            setValue(val);
            setIsDirty(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !isDirty}
          className={`px-3 py-2 rounded-lg flex items-center justify-center transition-colors ${
            loading || !isDirty
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          title="Submit Score"
        >
          {loading ? <AiOutlineLoading className="w-4 h-4 animate-spin" /> : <AiOutlineCheck className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
