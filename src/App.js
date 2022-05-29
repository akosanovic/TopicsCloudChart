import { useEffect, useState, useCallback } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import WordCloudChart from './WordCloudChart';
import staticData from './topics.json'
import { COLOR_GREEN, COLOR_GREY, COLOR_RED } from './Config';
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder';


function App() {
  const [topics, setTopics] = useState()
  const [selectedTopic, setSelectedTopic] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();


  function fetchChartData() {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      // resolve(staticData.topics);
      setTimeout(() => {
        resolve(staticData.topics);
      }, 500);  // simlate "slower" requeset 
    });

  }


  const getChartData = useCallback(async () => {

    try {
      const res = await fetchChartData();
      setIsLoading(false);
      if (!res) { // should be if(!res.ok) for the real api calls
        throw new Error('Somethning went wrong');
      }

      setError(false);

      setTopics(res);
      const transformedTopics = res.map(topic => {
        return {
          name: topic.label,
          weight: topic.volume,
          color: getTopicColor(topic.sentimentScore)
        }
      })
      setChartData(transformedTopics);

    } catch (error) {
      setError('Somethning went wrong');
      setIsLoading(false);
    }

  });

  // Only called once - on app load
  useEffect(() => {
    getChartData();
  }, [])


  function getTopicColor(sentimentScore) {

    let assignedColor = COLOR_GREY;
    if (sentimentScore > 60) return assignedColor = COLOR_GREEN;
    if (sentimentScore < 40) return assignedColor = COLOR_RED;

    return assignedColor;
  };






  function onTopicSelected(selectedId) {
    setSelectedTopic(() => { return topics[selectedId] });
  }

  function showChartContent() {
    if (chartData?.length > 0) {
      return <WordCloudChart topicUpdate={onTopicSelected} chartData={chartData}></WordCloudChart>
    }

    if (chartData?.length < 0) {
      return <InfoBoxEmptyPlaceholder placeholderText={"No Data to show"} />
    }

    if (error) {
      return <p>{error}</p>;
    }
    if (isLoading) {
      return <p>Loading...</p>
    }


  }
  return (
    <div className="app">
      <header className="app-header">
        <h1> My Topics Challenge </h1>
      </header>

      <div className='app-content'>
        <div className="chartContainer">
          {showChartContent()}
        </div>

        <div className='infoBox-container'>
          <InfoBox selectedTopic={selectedTopic}></InfoBox>
        </div>
      </div>
    </div>
  );
}

export default App;
