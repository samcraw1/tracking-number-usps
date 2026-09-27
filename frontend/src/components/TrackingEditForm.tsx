import { useEffect, useState } from "react";
import { getTrackingNumber, updateTrackingNumber, type TrackingUpdate } from "../api/trackingApi";
import ErrorMessage from "./ErrorMessage";

interface TrackingEditFormProps {
  trackingNumber: string;
  onBack: () => void;
  onUpdated: (trackingNumber: string) => void;
}

export default function TrackingEditForm({ trackingNumber, onBack, onUpdated }: TrackingEditFormProps) {
  const [form, setForm] = useState<TrackingUpdate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setError(null);
    setForm(null);
    getTrackingNumber(trackingNumber)
      .then((t) => setForm({ currentLocation: t.currentLocation, currentStatus: t.currentStatus }))
      .catch(() =>
        setError(
          `Could not load tracking number ${trackingNumber} — it may not exist, or something went wrong.`
        )
      );
  }, [trackingNumber]);

  function handleChange(field: keyof TrackingUpdate, value: string) {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError(null);
    setSubmitting(true);
    try {
      await updateTrackingNumber(trackingNumber, form);
      onUpdated(trackingNumber);
    } catch {
      setError("Could not save changes. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <button type="button" onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>

      <h1 className="mb-4 font-mono text-xl font-semibold">Edit {trackingNumber}</h1>

      {error && <ErrorMessage message={error} />}

      {form && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Current location</span>
            <input
              required
              value={form.currentLocation}
              onChange={(e) => handleChange("currentLocation", e.target.value)}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Current status</span>
            <input
              required
              value={form.currentStatus}
              onChange={(e) => handleChange("currentStatus", e.target.value)}
              className="rounded border border-gray-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
}
