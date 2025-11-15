import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n/i18n";
import { supabase } from "../supabaseClient"; // adjust path as needed
import { countries } from "../types/interfaces";

const SignUpPage: React.FC = () => {
  /**
   * We are using the translation hook gets the t function and i18n instance inside our functional component.
   * However, i18n is already embedded into the <LanguageSwitcher /> component
   * https://react.i18next.com/latest/usetranslation-hook
   */
  //   const { t } = useTranslation();
  //   console.log("Current language:", i18n.language);

  /**
   * This is the browser title
   * https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react?
   */
  useEffect(() => {
    // document.title = `${t("sign_up")} | MoviesApp`;
    document.title = `Sign up | GuestEase`;
    //   }, [t]);
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  /**
   * As we would like to handle empty field errors, we will set an error and
   * handle it in the handleSignUp function below.
   * https://muhimasri.com/blogs/mui-validation/
   */
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      zipCode.trim() === "" ||
      country === ""
    ) {
      setNameError(true);
      return;
    } else if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    } else {
      setNameError(false);
      setPasswordError(false);
    }

    // Call Supabase signUp
    // https://supabase.com/docs/guides/auth/managing-user-data
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          country,
          zip_code: zipCode,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      // Optionally display this error to the user
      return;
    }

    console.log("User signed up:", data);

    // Store data in the local storage
    // localStorage.setItem("userFirstName", firstName);
    // localStorage.setItem("userLastName", lastName);
    // localStorage.setItem("userEmail", email);
    // localStorage.setItem("userPassword", password);

    // Simulate sign-up logic
    console.log("User registered:", { firstName, lastName, email });

    // Redirect to login page once signed up
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "50vh",
          padding: 10,
          paddingTop: 5,
          margin: 0,
          backgroundColor: "#ffffff",
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            {/* {t("create_account")} */}
            Create account
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              required
              id="outlined-required"
              //   label={t("first_name")}
              label="First name"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={nameError}
              //   helperText={nameError ? t("first_name_text") : ""}
              helperText={
                nameError
                  ? "Please enter your first name (letters and spaces only)"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              id="outlined-required"
              //   label={t("last_name")}
              label="Last name"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={nameError}
              //   helperText={nameError ? t("last_name_text") : ""}
              helperText={
                nameError
                  ? "Please enter your last name (letters and spaces only)"
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              id="outlined-required"
              //   label={t("email")}
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={nameError}
              //   helperText={nameError ? t("email_text") : ""}
              helperText={nameError ? "Please enter your email" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              id="outlined-required"
              //   label={t("password")}
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              //   helperText={nameError ? t("password_text") : ""}
              helperText={passwordError ? "Passwords do not match" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Confirm Password"
              type="password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Passwords do not match" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Country Dropdown */}
            <TextField
              select
              fullWidth
              required
              label="Country"
              margin="normal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={nameError && country === ""}
              helperText={
                nameError && country === "" ? "Please select your country" : ""
              }
            >
              {countries.map((c) => (
                <MenuItem key={c.code} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Zip Code Field */}
            <TextField
              fullWidth
              required
              label="Zip Code"
              margin="normal"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              error={nameError && zipCode === ""}
              helperText={
                nameError && zipCode === "" ? "Please enter your zip code" : ""
              }
            />

            <Button
              variant="contained"
              // color="primary"
              fullWidth
              sx={{
                mt: 3,
                bgcolor: "#8E4585",
                color: "#ffffff",
              }}
              onClick={handleSignUp}
            >
              {/* {t("sign_up")} */}
              Sign up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#8E4585",
              }}
            >
              {/* {t("account_exist")} */}
              Already have an account? Log in
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignUpPage;
