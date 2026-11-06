
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function PlaceholderPage({ title }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-2xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-slate-400">
        This section is coming soon.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/devices"
            element={<PlaceholderPage title="My Devices" />}
          />

          <Route
            path="/shared"
            element={<PlaceholderPage title="Shared Devices" />}
          />

          <Route
            path="/history"
            element={<PlaceholderPage title="Location History" />}
          />

          <Route
            path="/settings"
            element={<PlaceholderPage title="Settings" />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
