import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <ThemeProvider theme={darkTheme}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          ina
        </Typography >
        <GraphicEqIcon className={'ml-2'} />
        <Button>
          <Link color="inherit" href='/'>Home</Link>
        </Button>
        <Button>
          <Link color="inherit" href={'mailto:steve21johnson@gmail.com'} target="_blank">Contact</Link>
        </Button>
      </Toolbar>
    </AppBar>
    {children}
  </ThemeProvider>
);

export default Layout;
