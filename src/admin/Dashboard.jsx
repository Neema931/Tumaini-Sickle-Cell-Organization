import { useEffect, useState } from "react";
import StatCard from "../components/admin/StatCard";
import DonationTable from "../components/admin/DonationTable";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/dashboard`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }
        const data = await response.json();
        const dashboard = data.dashboard || {};

        setStats([
          {
            title: "Total Donations",
            value: `KES ${dashboard.total_donations?.toLocaleString() ?? 0}`,
            accent: "blue",
          },
          {
            title: "Completed Donations",
            value: dashboard.completed_donations?.toString() ?? "0",
            accent: "green",
          },
          {
            title: "Pending Donations",
            value: dashboard.pending_donations?.toString() ?? "0",
            accent: "orange",
          },
          {
            title: "Total Donors",
            value: dashboard.total_donors?.toString() ?? "0",
            accent: "purple",
          },
        ]);

        setRecentDonations(dashboard.recent_donations || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-card-grid">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="admin-section-card">
        <div className="admin-section-heading">
          <h3>Recent Donations</h3>
          <span>Latest activity</span>
        </div>

        {loading ? (
          <p>Loading dashboard data...</p>
        ) : error ? (
          <p className="admin-error-message">{error}</p>
        ) : (
          <DonationTable rows={recentDonations} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;