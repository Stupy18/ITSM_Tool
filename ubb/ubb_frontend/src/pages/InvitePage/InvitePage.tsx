import React, { useState } from "react";
import api from "../../api/AxiosConfig.ts"
import { motion } from "framer-motion";
import "./InvitePage.css";

const InvitePage = () => {
  const [emailDetails, setEmailDetails] = useState({
    to: "",
    clientName: "",
    projectId: "",
    userCredentials: "",
    passwordCredentials: "",
  });
  const [recipientType, setRecipientType] = useState("client");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    to: "",
    passwordCredentials: "",
  });

  // Validation rules
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) && // At least one uppercase letter
    /[a-z]/.test(password) && // At least one lowercase letter
    /\d/.test(password); // At least one number

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmailDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate inputs as user types
    if (name === "to") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        to: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "passwordCredentials") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordCredentials: validatePassword(value)
          ? ""
          : "Password must include 8 characters, a number, an uppercase, and a lowercase letter.",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateEmail(emailDetails.to)) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (
      recipientType === "developer" &&
      !validatePassword(emailDetails.passwordCredentials)
    ) {
      setMessage(
        "Please enter a valid password for the developer. Password must meet the criteria."
      );
      return;
    }

    const endpoint =
      recipientType === "client" ? "/email/to/client" : "/email/to/developer";
    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post(
        `http://localhost:8080${endpoint}`,
        emailDetails
      );
      setMessage(response.data);
    } catch (error) {
      setMessage(
        error.response?.data || "An error occurred while sending the email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="invite-wrapper">
        <motion.div
            className="invite-page"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
      <h1>Invite Management</h1>
      <div className="recipient-toggle">
        <button
          className={recipientType === "client" ? "active" : ""}
          onClick={() => setRecipientType("client")}
        >
          Client
        </button>
        <button
          className={recipientType === "developer" ? "active" : ""}
          onClick={() => setRecipientType("developer")}
        >
          Developer
        </button>
      </div>
      <motion.div
        className="form-container"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form>
          <label>
            <span>Recipient Email:</span>
            <input
              type="email"
              name="to"
              value={emailDetails.to}
              onChange={handleChange}
              className={errors.to ? "error-input" : ""}
              placeholder="Enter recipient email"
              required
            />
            {errors.to && <span className="error">{errors.to}</span>}
          </label>
          {recipientType === "client" && (
            <>
              <label>
                <span>Project ID:</span>
                <input
                  type="number"
                  name="projectId"
                  value={emailDetails.projectId}
                  onChange={handleChange}
                  placeholder="Enter project ID"
                />
              </label>
            </>
          )}
          {recipientType === "client" && (
            <>
              <label>
                <span>Client Name:</span>
                <input
                  type="text"
                  name="clientName"
                  value={emailDetails.clientName}
                  onChange={handleChange}
                  placeholder="Enter client's name"
                />
              </label>
            </>
          )}
          {recipientType === "developer" && (
            <>
              <label>
                <span>Username:</span>
                <input
                  type="text"
                  name="userCredentials"
                  value={emailDetails.userCredentials}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </label>
              <label>
                <span>Temporary Password:</span>
                <input
                  type="password"
                  name="passwordCredentials"
                  value={emailDetails.passwordCredentials}
                  onChange={handleChange}
                  className={errors.passwordCredentials ? "error-input" : ""}
                  placeholder="Enter temporary password"
                />
                {errors.passwordCredentials && (
                  <span className="error">{errors.passwordCredentials}</span>
                )}
              </label>
            </>
          )}
          <motion.div
            className="button-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || errors.to || errors.passwordCredentials}
            >
              Send Email
            </button>
          </motion.div>
        </form>
        {isLoading && (
          <motion.div
            className="loading"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            Sending...
          </motion.div>
        )}
        {message && <div className="message">{message}</div>}
      </motion.div>
    </motion.div>
      </div>
  );
};

export default InvitePage;
