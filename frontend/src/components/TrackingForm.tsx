import { useState } from "react";
import { createTrackingNumber, type TrackingNumber } from "../api/trackingApi";
import ErrorMessage from "./ErrorMessage";

interface TrackingFormProps {
  onBack: () => void;
  onCreated: (trackingNumber: string) => void;
}

const emptyForm: TrackingNumber = {
  trackingNumber: "",
  sentFrom: "",
  sentTo: "",
  currentLocation: "",
  currentStatus: "",
};

export default function TrackingForm({ onBack, onCreated }: TrackingFormProps) {
  const [form, setForm] = useState<TrackingNumber>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: keyof TrackingNumber, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const created = await createTrackingNumber(form);
      onCreated(created.trackingNumber);
    } catch {
      setError("Could not create tracking number. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <button type="button" onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back to list
      </button>

      <h1 className="mb-4 text-2xl font-semibold">New Tracking Number</h1>

      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Tracking number</span>
          <input
            required
            value={form.trackingNumber}
            onChange={(e) => handleChange("trackingNumber", e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Sent from</span>
          <input
            required
            value={form.sentFrom}
            onChange={(e) => handleChange("sentFrom", e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Sent to</span>
          <input
            required
            value={form.sentTo}
            onChange={(e) => handleChange("sentTo", e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

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
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
