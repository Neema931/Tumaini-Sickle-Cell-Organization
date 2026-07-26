import { useEffect, useMemo, useState } from "react";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/donations`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.name.toLowerCase().includes(search.toLowerCase()) ||
        donation.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || donation.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [donations, search, status]);

  return (
    <div className="admin-page">

      <div className="admin-section-heading">
        <div>
          <h2>Donations</h2>
          <p>Manage and monitor all donations.</p>
        </div>
      </div>

      <div className="donation-toolbar">

        <input
          type="text"
          placeholder="Search donor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>PENDING</option>
          <option>COMPLETED</option>
          <option>FAILED</option>
        </select>

      </div>

      <div className="admin-table-card">

        {loading ? (
          <p>Loading donations...</p>
        ) : (
          <table className="admin-table">

            <thead>
              <tr>
                <th>Donor</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No donations found.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.name}</td>
                    <td>{donation.email}</td>
                    <td>{donation.phone}</td>
                    <td>KES {donation.amount}</td>
                    <td>
                      <span
                        className={`status ${donation.status.toLowerCase()}`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td>{donation.date}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Donations;