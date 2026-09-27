import { useEffect, useState } from "react";
import { getTrackingNumber, type TrackingNumber } from "../api/trackingApi";
import ErrorMessage from "./ErrorMessage";

interface TrackingDetailProps {
  trackingNumber: string;
  onBack: () => void;
  onEditClick: (trackingNumber: string) => void;
  onDelete: (trackingNumber: string) => void;
}

export default function TrackingDetail({
  trackingNumber,
  onBack,
  onEditClick,
  onDelete,
}: TrackingDetailProps) {
  const [tracking, setTracking] = useState<TrackingNumber | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setTracking(null);
    getTrackingNumber(trackingNumber)
      .then(setTracking)
      .catch(() =>
        setError(
          `Could not load tracking number ${trackingNumber} — it may not exist, or something went wrong.`
        )
      );
  }, [trackingNumber]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <button type="button" onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back to list
      </button>

      {error && <ErrorMessage message={error} />}

      {tracking && (
        <div className="rounded border border-gray-200 p-6">
          <h1 className="mb-4 font-mono text-xl font-semibold">{tracking.trackingNumber}</h1>
          <dl className="grid grid-cols-2 gap-y-2">
            <dt className="text-gray-500">Sent from</dt>
            <dd>{tracking.sentFrom}</dd>
            <dt className="text-gray-500">Sent to</dt>
            <dd>{tracking.sentTo}</dd>
            <dt className="text-gray-500">Current location</dt>
            <dd>{tracking.currentLocation}</dd>
            <dt className="text-gray-500">Current status</dt>
            <dd>{tracking.currentStatus}</dd>
          </dl>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => onEditClick(tracking.trackingNumber)}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(tracking.trackingNumber)}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
