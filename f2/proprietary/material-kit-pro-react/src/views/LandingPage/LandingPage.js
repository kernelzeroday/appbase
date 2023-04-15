/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionContact from "views/AboutUsPage/Sections/SectionContact.js";
import "./plug.css"
const useStyles = makeStyles(landingPageStyle);

const coffeeAmount = 5_000_000;

// Initialises the application listeners and handlers
function main() {
  const button = document.querySelector('#buy-me-coffee');
  button.addEventListener("click", onButtonPress);
}

// Button press handler
async function onButtonPress(el) {
  el.target.disabled = true;

  const hasAllowed = await window.ic?.plug?.requestConnect();

  if (hasAllowed) {
    el.target.textContent = "Plug wallet is connected"

    const balance = await window.ic?.plug?.requestBalance();

    if (balance[0]?.amount  > coffeeAmount/100000000) {
      el.target.textContent = "Plug wallet has enough balance"

      const requestTransferArg = {
        to: '4dply-luza5-h45oq-zzcqo-inhui-z5pba-rl3vd-wyzzg-ucqoj-lu7lw-bqe',
        amount: coffeeAmount,
      };
      const transfer = await window.ic?.plug?.requestTransfer(requestTransferArg);

      const transferStatus = transfer?.transactions?.transactions[0]?.status;

      if (transferStatus === 'COMPLETED') {
        el.target.textContent = `Plug wallet transferred ${coffeeAmount} e8s`;
      } else if (transferStatus === 'PENDING') {
        el.target.textContent = "Plug wallet is pending.";
      } else {
        el.target.textContent = "Plug wallet failed to transfer";
      }
    } else {
      el.target.textContent = "Plug wallet doesn't have enough balance";
    }
  } else {
    el.target.textContent = "Plug wallet connection was refused";
  }

  setTimeout(() => {
    el.target.disabled = false;
    el.target.textContent = "Buy us a coffee"
  }, 5000);
}

// Calls the Main function when the document is ready
document.addEventListener("DOMContentLoaded", main);



export default function LandingPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("assets/img/space_bg2.jpg").default} filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
            <h1>
                  webi 
                  <span className={classes.proBadge}>ai</span>
                </h1>              <h4>
                we make decentralized technological solutions for a decentralized technological world.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionProduct />
          <SectionTeam />
          <SectionContact />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
            &copy; {1900 + new Date().getYear()} 
              </div>
            <div className={classes.right}>
              
            <button id="buy-me-coffee" >Buy us a coffee</button>
              made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://webi.ai"
                target="_blank"
              >
                webi ai 
              </a>{" "}
            </div>
          </div>
        }
      />
    </div>
  );
}
