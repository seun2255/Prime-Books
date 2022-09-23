import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Profile/finance.module.css";
import icons from "../../assets/icons/icons";
import { useState } from "react";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { buyTokens } from "../../pages/api/dappAPI";

export default function Finance(props) {
  const { user } = props;
  const [input, setInput] = useState("");

  const toFixed_norounding = (n, p) => {
    var result = n.toFixed(p);
    return result <= n ? result : (result - Math.pow(0.1, p)).toFixed(p);
  };
  const output = Number(input) ? Number(input) * 1000 : "";

  return (
    <div className={styles.container}>
      <div className={styles.balance}>Balance: {user.tokenBalance}</div>
      <div className={styles.books__container}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              border: "1px solid #00008B",
              padding: "10px",
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              alignItems="center"
              columnSpacing={3}
              rowSpacing={2}
            >
              <Grid container item md={12} justifyContent="space-between">
                <Grid item>Input</Grid>
                <Grid item>Balance: {user.ethBalance}</Grid>
                <Grid item md={12} sm={12} xs={12} lg={12} xl={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={(e) => setInput(Number(e.target.value))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ color: "#00008B", fontWeight: "500" }}
                        >
                          ETH
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container item md={12} justifyContent="space-between">
                <Grid item>Output</Grid>
                <Grid item>Balance: {user.tokenBalance}</Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    value={output}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ color: "#00008B", fontWeight: "700" }}
                        >
                          PRI
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container item md={12}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00008B",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={async () => {
                    await buyTokens(input);
                  }}
                >
                  Buy
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}
