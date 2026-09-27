import { useEffect, useState } from "react";
import { getAllTrackingNumbers, type TrackingNumber } from "../api/trackingApi";
import ErrorMessage from "./ErrorMessage";

interface TrackingListProps {
  refreshKey: number;
  onSelect: (trackingNumber: string) => void;
  onCreateClick: () => void;
}

export default function TrackingList({ refreshKey, onSelect, onCreateClick }: TrackingListProps) {
  const [trackingNumbers, setTrackingNumbers] = useState<TrackingNumber[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    getAllTrackingNumbers()
      .then(setTrackingNumbers)
      .catch(() => setError("Could not load tracking numbers."));
  }, [refreshKey]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tracking Numbers</h1>
        <button
          type="button"
          onClick={onCreateClick}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + New
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {!error && trackingNumbers.length === 0 && (
        <p className="text-gray-500">No tracking numbers yet.</p>
      )}

      <ul className="divide-y divide-gray-200 rounded border border-gray-200">
        {trackingNumbers.map((t) => (
          <li key={t.trackingNumber}>
            <button
              type="button"
              onClick={() => onSelect(t.trackingNumber)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
            >
              <span className="font-mono">{t.trackingNumber}</span>
              <span className="text-sm text-gray-500">{t.currentStatus}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
