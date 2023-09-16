import React from "react";

import DetailJob from "../../../components/Public/Job/DetailJob";
import LayoutHome from "../Layout/LayoutHome";
import SubscriptionUser from "../../../components/Public/Card/SubscriptionUser";
import JobCard from "../../../components/Public/Card/JobCard";
const JobPage = () => {
  return (
    <LayoutHome>
      <DetailJob />
      <div className="pt-6">
        <JobCard />
        <SubscriptionUser />
      </div>
    </LayoutHome>
  );
};

export default JobPage;
