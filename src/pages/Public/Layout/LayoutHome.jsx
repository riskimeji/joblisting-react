import React from "react";
import HomeNav from "../../../components/Public/Layout/HomeNav";
import Footer from "../../../components/Public/Layout/Footer";
import SubscriptionUser from "../../../components/Public/Card/SubscriptionUser";
import StepCard from "../../../components/Public/Card/StepCard";
const LayoutHome = ({ children }) => {
  return (
    <React.Fragment>
      <HomeNav />
      <div style={{ paddingTop: "60px" }}>{children}</div>
      <SubscriptionUser />
      <StepCard />
      <Footer />
    </React.Fragment>
  );
};

export default LayoutHome;
