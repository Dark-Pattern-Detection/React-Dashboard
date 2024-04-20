import React, { useState, useEffect } from 'react';
import './App.css';

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
    
    window.open('https://www.google.com/', '_blank');
    setSelectedURL(webURL);
    //console.log(webURL);
    const websiteData = darkPatternList.filter(item => item.web_url === webURL);
    
    if (websiteData) {
      const patterns=websiteData.map((item)=>{return {pattern:item.text,time:item.timestamp}});
      console.log(patterns);
      setSelectedDarkPatterns(patterns);
      //setSelectedTimestamp(websiteData.timestamp);
    }
  };

  return (
    <div className='maindiv'>
    <div className='topdiv'>
      <h2>total dark patterns detacted till now : {darkPatternList.length}</h2>

    </div>
    <div className="container">
      <div className="domain-list">
        <h1>Domain List</h1>
        <ul>
          {uniqueDomains.map((domain) => (
            <li
              key={domain}
              onClick={() => handleDomainClick(domain)}
              role="button"
              tabIndex={0}
            >
              {domain}
            </li>
          ))}
        </ul>
      </div>
      <div className="url-list">
        {selectedDomain && (
          <div>
            <h2>URLs for {selectedDomain}</h2>
            <ul>
              {uniqueURLs.map((webURL) => (
                <li
                  key={webURL}
                  onClick={() => handleURLClick(webURL)}
                  role="button"
                  tabIndex={0}
                >
                  {webURL}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="dark-pattern-list">
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
                                <td>{row.time}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* <h2>Dark Patterns for {selectedURL}</h2>
            <ul>
              {selectedDarkPatterns.map((pattern, index) => (
                <li key={index}>{pattern} </li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default WebsiteList;
