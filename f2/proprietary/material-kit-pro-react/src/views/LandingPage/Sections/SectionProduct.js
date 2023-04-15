import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import PublicIcon from "@material-ui/icons/Public";
import Book from "@material-ui/icons/Book";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import productStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";






const useStyles = makeStyles(productStyle);

export default function SectionProduct() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>Really good software made with love</h2>
          <h5 className={classes.description}>
            Webi ai is a software development company built on strong
            foundations in computer science and artificial intelligence. We know
            how to make great software because we enjoy doing it
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Internet Computer Projects"
              description="Working on the Internet Computer helps bring modern best in class applications to the new internet."
              icon={AllInclusiveIcon}
              iconColor="danger"
              vertical={true}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
          <a href="https://map.webi.ai">
            <InfoArea
              title="Maps"
              description="Combining amazing mapping technology with advanced artificial intelligence"
              icon={PublicIcon}
              iconColor="primary"
              vertical={true}
              
            /></a>  
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
          <a href="https://nycpj-syaaa-aaaad-qatda-cai.raw.ic0.app/pointofinterest.doc.html">
            <InfoArea
              title="API Documentation"
              description="Come check out our api docs!"
              icon={Book}
              iconColor="success"
              vertical={true}
            /></a>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
