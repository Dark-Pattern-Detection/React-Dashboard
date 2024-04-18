import React, { useState } from 'react';
import './App.css'

const DarkPatternList =
{
  "amazon.com": [
    "Forcing users into signing up for Prime by making the 'No Thanks' option less prominent.",
    "Misleading product recommendations to push certain items."
  ],
  "ebay.com": [
    "Displaying misleading countdown timers to create a sense of urgency in purchasing.",
    "Hiding shipping costs until the final stages of checkout."
  ],
  "walmart.com": [
    "Manipulating product comparison charts to highlight their own brand.",
    "Automatically adding additional items to the cart without user consent."
  ],
  "alibaba.com": [
    "Offering misleading discounts by inflating original prices.",
    "Automatically subscribing users to marketing emails."
  ],
  "etsy.com": [
    "Hiding shipping costs until the final stages of checkout to increase perceived value of items.",
    "Implementing confusing search filters to promote certain products."
  ],
  "target.com": [
    "Using pre-selected checkboxes to opt-in users for promotional emails without clear consent.",
    "Manipulating reviews to highlight certain products."
  ],
  "bestbuy.com": [
    "Implementing confusing rebate systems to discourage returns and refunds.",
    "Automatically signing users up for subscription services."
  ],
  "aliexpress.com": [
    "Employing fake scarcity tactics by displaying 'Only X left in stock' messages.",
    "Misleading product descriptions to exaggerate quality."
  ],
  "flipkart.com": [
    "Offering misleading discounts by inflating original prices.",
    "Hiding negative reviews for certain products."
  ],
  "zalando.com": [
    "Implementing dark patterns in unsubscribe processes to keep users subscribed to marketing emails.",
    "Manipulating search results to prioritize sponsored items."
  ]
}

  // Add other dark patterns here...
  ;

const WebsiteList = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const handleWebsiteClick = (website) => {
    setSelectedWebsite(website);
  };

  return (
    <div className="container">
      <div className="website-list">
        <h1>Website List</h1>
        <ul>
          {Object.keys(DarkPatternList).map((website) => (
            <li key={website} onClick={() => handleWebsiteClick(website)}>
              {website}
            </li>
          ))}
        </ul>
      </div>
      <div className="dark-pattern-list">
        {selectedWebsite && (
          <div id='right'>
            <h1>Dark Patterns for {selectedWebsite}</h1>
            <ul>
              {DarkPatternList[selectedWebsite].map((pattern, index) => (
                <li key={index}>{pattern}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteList;
