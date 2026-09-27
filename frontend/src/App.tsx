import { useState } from "react";
import TrackingList from "./components/TrackingList";
import TrackingDetail from "./components/TrackingDetail";
import TrackingForm from "./components/TrackingForm";
import TrackingEditForm from "./components/TrackingEditForm";
import { deleteTrackingNumber } from "./api/trackingApi";

type View = "list" | "create" | "detail" | "edit";

function App() {
  const [view, setView] = useState<View>("list");
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function goToList() {
    setView("list");
    setSelectedTrackingNumber(null);
  }

  function reloadList() {
    setRefreshKey((k) => k + 1);
  }

  async function handleDelete(trackingNumber: string) {
    await deleteTrackingNumber(trackingNumber);
    reloadList();
    goToList();
  }

  return (
    <>
      {view === "list" && (
        <TrackingList
          refreshKey={refreshKey}
          onSelect={(trackingNumber) => {
            setSelectedTrackingNumber(trackingNumber);
            setView("detail");
          }}
          onCreateClick={() => setView("create")}
        />
      )}

      {view === "create" && (
        <TrackingForm
          onBack={goToList}
          onCreated={(trackingNumber) => {
            reloadList();
            setSelectedTrackingNumber(trackingNumber);
            setView("detail");
          }}
        />
      )}

      {view === "detail" && selectedTrackingNumber && (
        <TrackingDetail
          trackingNumber={selectedTrackingNumber}
          onBack={goToList}
          onEditClick={(trackingNumber) => {
            setSelectedTrackingNumber(trackingNumber);
            setView("edit");
          }}
          onDelete={handleDelete}
        />
      )}

      {view === "edit" && selectedTrackingNumber && (
        <TrackingEditForm
          trackingNumber={selectedTrackingNumber}
          onBack={() => setView("detail")}
          onUpdated={(trackingNumber) => {
            reloadList();
            setSelectedTrackingNumber(trackingNumber);
            setView("detail");
          }}
        />
      )}
    </>
  );
}

export default App;
