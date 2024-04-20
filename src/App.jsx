import React, { useState, useEffect } from 'react';
import './App.css';

const WebsiteList = () => {
  const [darkPatternList, setDarkPatternList] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [selectedDarkPatterns, setSelectedDarkPatterns] = useState([]);
  const apiEndpoint = 'http://localhost:3000/items'; // Replace with your API endpoint URL

  // Fetch DarkPatternList from the API when the component mounts
  useEffect(() => {
    const fetchDarkPatternList = async () => {
      try {
        const response = await fetch(apiEndpoint,{mode:'cors'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDarkPatternList(data);
      } catch (error) {
        console.error('Error fetching dark pattern list:', error);
      }
    };

    fetchDarkPatternList();
  }, []);

  const handleWebsiteClick = (website) => {
    
    setSelectedWebsite(website);
    // Find the dark patterns for the selected website
    const websiteData = darkPatternList.find(
      (item) => item.domain === website
    );
    if (websiteData) {
      //console.log(websiteData.texts);
      setSelectedDarkPatterns(websiteData.texts);
    }
  };

  return (
    <div className="container">
      <div className="website-list">
        <h1>Website List</h1>
        <ul>
          {darkPatternList.map((item) => (
            <li
              key={item.domain}
              onClick={() => handleWebsiteClick(item.domain)}
              role="button"
              tabIndex={0}
            >
              {item.domain}
            </li>
          ))}
        </ul>
      </div>
      <div className="dark-pattern-list">
        {selectedWebsite && (
          <div id="right">
            <h1>Dark Patterns for {selectedWebsite}</h1>
            <ul>
              {selectedDarkPatterns.map((pattern, index) => (
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
