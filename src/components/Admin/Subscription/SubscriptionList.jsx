import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    getSubscription();
  }, []);
  const getSubscription = async () => {
    const response = await axios.get("http://localhost:5000/api/subscription");
    setSubscriptions(response.data);
  };
  const deleteSubscription = async (subscriptionId) => {
    await axios.delete(
      `http://localhost:5000/api/subscription/${subscriptionId}`
    );
    getSubscription();
  };
  return (
    <div>
      <h1 className="title"> Subscription</h1>
      <h2 className="subtitle">List of Subscriptions</h2>
      <table className="table is-striped is-fullwidth mt-2">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={subscription.uuid}>
              <td>{index + 1}</td>
              <td>{subscription.name}</td>
              <td>{subscription.email}</td>
              <td>
                <Link
                  onClick={() => deleteSubscription(subscription.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionList;
