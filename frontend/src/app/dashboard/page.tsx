import LogoutButton from "../../components/LogoutButton";
import ProtectedRoute from "../../components/ProtectedRoute";


export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Welcome to Your Dashboard</h2>
        <p>You're logged in!</p>
        <LogoutButton />
      </div>
    </ProtectedRoute>
  );
}
