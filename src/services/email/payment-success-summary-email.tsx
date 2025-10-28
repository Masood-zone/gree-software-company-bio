type Props = {
  adminEmail: string;
  purchaserName?: string | null;
  purchaserEmail?: string | null;
  purchaserPhone?: string | null;
  courseName: string;
  currency: string;
  paidMajor: number;
  totalPaidMajor: number;
  agreedMajor: number;
  remainingMajor: number;
  method: string;
  reference: string;
  paidAt?: string;
};

export function PaymentSuccessfulSummaryEmail(props: Props) {
  const {
    adminEmail,
    purchaserName,
    purchaserEmail,
    purchaserPhone,
    courseName,
    currency,
    paidMajor,
    totalPaidMajor,
    agreedMajor,
    remainingMajor,
    method,
    reference,
    paidAt,
  } = props;

  const fmt = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#111827" }}>Payment Verified</h2>
      <p style={{ marginTop: 0 }}>Hello {adminEmail},</p>
      <p>
        A payment was verified for the course <strong>{courseName}</strong>.
      </p>

      <table
        width="100%"
        cellPadding={8}
        style={{
          borderCollapse: "collapse",
          background: "#f9fafb",
          borderRadius: 8,
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: 180, color: "#6b7280" }}>Reference</td>
            <td style={{ fontWeight: 600 }}>{reference}</td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Paid At</td>
            <td style={{ fontWeight: 600 }}>
              {paidAt
                ? new Date(paidAt).toLocaleString()
                : new Date().toLocaleString()}
            </td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Method</td>
            <td style={{ fontWeight: 600 }}>{method}</td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Amount (this payment)</td>
            <td style={{ fontWeight: 600 }}>{fmt.format(paidMajor)}</td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Total Paid</td>
            <td style={{ fontWeight: 600 }}>{fmt.format(totalPaidMajor)}</td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Agreed Fee</td>
            <td style={{ fontWeight: 600 }}>{fmt.format(agreedMajor)}</td>
          </tr>
          <tr>
            <td style={{ color: "#6b7280" }}>Remaining</td>
            <td style={{ fontWeight: 600 }}>{fmt.format(remainingMajor)}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: 24 }}>Purchaser</h3>
      <ul style={{ lineHeight: 1.6 }}>
        <li>
          <strong>Name:</strong> {purchaserName || "—"}
        </li>
        <li>
          <strong>Email:</strong> {purchaserEmail || "—"}
        </li>
        <li>
          <strong>Phone:</strong> {purchaserPhone || "—"}
        </li>
      </ul>

      <p style={{ color: "#6b7280" }}>
        A CSV summary is attached for your records.
      </p>

      <p style={{ marginTop: 24 }}>— Gree Software Academy</p>
    </div>
  );
}
