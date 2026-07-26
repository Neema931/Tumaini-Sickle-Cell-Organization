function DonationTable({ rows }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Donor</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{typeof row.amount === 'number' ? `KES ${row.amount.toLocaleString()}` : row.amount}</td>
              <td>
                <span className={`admin-tag ${row.status.toLowerCase()}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationTable;
