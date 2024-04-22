import React, { useState, useEffect } from 'react';
import './App.css';
import { format } from 'date-fns';

const WebsiteList = () => {
  const [darkPatternList, setDarkPatternList] = useState([]);
  const [uniqueDomains, setUniqueDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [uniqueURLs, setUniqueURLs] = useState([]);
  const [selectedURL, setSelectedURL] = useState(null);
  const [selectedDarkPatterns, setSelectedDarkPatterns] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState('');
  const apiEndpoint = 'http://localhost:3000/items'; // Replace with your API endpoint URL

  // Fetch DarkPatternList from the API when the component mounts
  useEffect(() => {
    const fetchDarkPatternList = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDarkPatternList(data);

        // Extract unique domains from the fetched data
        const domains = [...new Set(data.map(item => item.domain))];
        setUniqueDomains(domains);
      } catch (error) {
        console.error('Error fetching dark pattern list:', error);
      }
    };

    fetchDarkPatternList();
  }, [apiEndpoint]);

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    setSelectedURL(null);
    setSelectedDarkPatterns([]);
    setSelectedTimestamp('');

    // Filter darkPatternList for selected domain and extract unique URLs
    const uniqueURLs = [
      ...new Set(darkPatternList.filter(item => item.domain === domain).map(item => item.web_url))
    ];
    setUniqueURLs(uniqueURLs);
  };

  const handleURLClick = (webURL) => {
    setSelectedURL(webURL);
    const websiteData = darkPatternList.filter(item => item.web_url === webURL);

    if (websiteData) {
      const patterns = websiteData.map((item) => { return { pattern: item.text, time: item.timestamp } });
      setSelectedDarkPatterns(patterns);
      //setSelectedTimestamp(websiteData.timestamp);
    }
  };

  return (
    <div className='maindiv'>
      <h1 className='main-heading'>Dark Pattern Buster Statistics</h1>
      <div className="container">
        <div className="domain-list">
          <h2 className='sub-heading'>Domain List</h2>
          <ul>
            {uniqueDomains.map((domain) => (
              <li
                key={domain}
                onClick={() => handleDomainClick(domain)}
                className={selectedDomain === domain ? 'selected' : ''}
                role="button"
                tabIndex={0}
              >
                {domain}
              </li>
            ))}
          </ul>
        </div>
        <div className="url-list">
          <h2 className='sub-heading'>URLs</h2>
          {selectedDomain && (
            <div>
              <ul>
                {uniqueURLs.map((webURL) => (
                  <li
                    key={webURL}
                    onClick={() => handleURLClick(webURL)}
                    className={selectedURL === webURL ? 'selected' : ''}
                    role="button"
                    tabIndex={0}
                  >
                    {webURL.substr(0, 40)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="dark-pattern-list">
          <h2 className='sub-heading'>Dark Patterns</h2>
          {selectedURL && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>detected dark pattern</th>
                    <th>detected on</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDarkPatterns.map((row, index) => (
                    <tr key={index}>
                      <td>{row.pattern}</td>
                      <td>{format(new Date(row.time), 'dd/MM/yyyy hh:mm')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteList;
