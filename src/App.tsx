import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { SolutionOverview } from './pages/public/SolutionOverview';
import { CongestionMap } from './pages/public/CongestionMap';
import { IncidentAlertsPage } from './pages/public/IncidentAlertsPage';
import { RouteGuidance } from './pages/public/RouteGuidance';
import { ProjectDocs } from './pages/public/ProjectDocs';

// Platform pages
import { TrafficDashboard } from './pages/platform/TrafficDashboard';
import { JunctionMonitoring } from './pages/platform/JunctionMonitoring';
import { CCTVMonitoring } from './pages/platform/CCTVMonitoring';
import { IncidentManagement } from './pages/platform/IncidentManagement';
import { EmergencyPriority } from './pages/platform/EmergencyPriority';
import { ReportsAnalytics } from './pages/platform/ReportsAnalytics';
import { AuditLogs } from './pages/platform/AuditLogs';

// Admin pages
import { UserManagement } from './pages/admin/UserManagement';
import { OptimisationRules } from './pages/admin/OptimisationRules';

function PublicPage({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function PlatformPage({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicPage><HomePage /></PublicPage>} />
        <Route path="/solution" element={<PublicPage><SolutionOverview /></PublicPage>} />
        <Route path="/map" element={<PublicPage><CongestionMap /></PublicPage>} />
        <Route path="/alerts" element={<PublicPage><IncidentAlertsPage /></PublicPage>} />
        <Route path="/routes" element={<PublicPage><RouteGuidance /></PublicPage>} />
        <Route path="/docs" element={<PublicPage><ProjectDocs /></PublicPage>} />

        {/* Platform routes */}
        <Route path="/platform/dashboard" element={<PlatformPage><TrafficDashboard /></PlatformPage>} />
        <Route path="/platform/junctions" element={<PlatformPage><JunctionMonitoring /></PlatformPage>} />
        <Route path="/platform/cctv" element={<PlatformPage><CCTVMonitoring /></PlatformPage>} />
        <Route path="/platform/incidents" element={<PlatformPage><IncidentManagement /></PlatformPage>} />
        <Route path="/platform/emergency" element={<PlatformPage><EmergencyPriority /></PlatformPage>} />
        <Route path="/platform/reports" element={<PlatformPage><ReportsAnalytics /></PlatformPage>} />
        <Route path="/platform/audit" element={<PlatformPage><AuditLogs /></PlatformPage>} />

        {/* Admin routes */}
        <Route path="/admin/users" element={<PlatformPage><UserManagement /></PlatformPage>} />
        <Route path="/admin/rules" element={<PlatformPage><OptimisationRules /></PlatformPage>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
