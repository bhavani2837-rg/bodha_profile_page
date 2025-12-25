import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const AdminLogin = () => {
  const [role, setRole] = useState("Admin");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Remove browser default password eye */}
      <style>
        {`
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear {
            display: none;
          }
          input[type="password"]::-webkit-credentials-auto-fill-button {
            visibility: hidden;
            position: absolute;
          }
        `}
      </style>

      <div style={styles.page}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              <div style={styles.logoInner}></div>
            </div>
          </div>

          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to access the admin panel</p>

          {/* Login as */}
          <div
            style={{
              ...styles.fieldBlock,
              marginBottom: dropdownOpen ? 80 : 22,
            }}
          >
            <label style={styles.label}>Login as</label>
            <select
              style={styles.select}
              value={role}
              onMouseDown={() => setDropdownOpen(true)}
              onChange={(e) => {
                setRole(e.target.value);
                setTimeout(() => setDropdownOpen(false), 0);
              }}
            >
              <option>Admin</option>
              <option>Super Admin</option>
            </select>
          </div>

          {/* Username */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color="#9ca3af"
                style={styles.leftIcon}
              />
              <input style={styles.input} placeholder="Enter your username" />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#9ca3af"
                style={styles.leftIcon}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter your password"
              />
              {password && (
                <span
                  style={styles.rightIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#6b7280"
                  />
                </span>
              )}
            </div>
          </div>

          {/* Options */}
          <div style={styles.options}>
            <label style={styles.remember}>
              <input type="checkbox" /> Remember me
            </label>
            <span
              style={styles.link}
              onMouseDown={(e) => (e.currentTarget.style.opacity = 0.6)}
              onMouseUp={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            style={styles.button}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.96)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Login
          </button>

          <p style={styles.footer}>
            Don’t have an account?{" "}
            <span
              style={styles.link}
              onMouseDown={(e) => (e.currentTarget.style.opacity = 0.6)}
              onMouseUp={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    width: 420,
    background: "#ffffff",
    borderRadius: 18,
    padding: 36,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: "2px solid #0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoInner: {
    width: 16,
    height: 16,
    border: "2px solid #0f172a",
    transform: "rotate(45deg)",
  },

  title: { textAlign: "center", margin: "8px 0" },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 28,
  },

  fieldBlock: { marginBottom: 22 },

  label: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 6,
    display: "block",
  },

  inputWrapper: { position: "relative" },

  leftIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },

  rightIcon: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    height: 44,
    padding: "0 44px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    WebkitAppearance: "none",
  },

  select: {
    width: "100%",
    height: 44,
    padding: "0 38px 0 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    appearance: "none",
    backgroundColor: "#fff",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    cursor: "pointer",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 13,
    marginBottom: 24,
  },

  remember: { display: "flex", alignItems: "center", gap: 6 },

  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(180deg, #0f172a, #020617)",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },

  footer: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 20,
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 500,
    transition: "opacity 0.15s ease",
  },
};
