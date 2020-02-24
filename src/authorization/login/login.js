import React from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  LinearProgress
} from "@material-ui/core";
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  withStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';


import { CLIENT_BASE_URL } from "../../routes/URLMap";
import { setToken } from "../../utils/auth";
import { login as loginFn } from '../../api/auth';

import styles from "./Style";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#f50057"
    }
  }
});

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: null,
    isLoading: false,
  };

  login = () => {
    const loginInfo = {
      username: this.state.username,
      password: this.state.password,
    }

    this.setState({ error: null, isLoading: true }, () => {
      loginFn(loginInfo)
        .then(data => {
          this.setState({ isLoading: false }, () => {
            setToken(data.token);
            const locationState = this.props.location.state;
            const redirectTo = (locationState && locationState.from) || CLIENT_BASE_URL;
            this.props.history.replace(redirectTo);
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    });
  };

  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.backGround}>
          <Container
            component="main"
            maxWidth="xs"
            className={classes.container}
          >
            <CssBaseline />
            <Box className={classes.box}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h3">
                  Log in
								</Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    label="User Name"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    required
                    margin="normal"
                    type="password"
                    fullWidth
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  {this.state.isLoading ? <LinearProgress /> : <Button
                    onClick={this.login}
                    variant="contained"
                    fullWidth
                    color={"primary"}
                  >Sign In</Button>}
                  {!!this.state.error && (
                    <Alert severity="error">Account not exits or </Alert>)}
                </form>
              </div>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(Login);
