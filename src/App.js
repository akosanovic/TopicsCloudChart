import { useEffect, useState, useCallback } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import WordCloudChart from './WordCloudChart';
import staticData from './topics.json'
import { COLOR_GREEN, COLOR_GREY, COLOR_RED } from './Config';
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder';


function App() {
  console.count('app.js')

  const [topics, setTopics] = useState()
  const [selectedTopic, setSelectedTopic] = useState();
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();


  function fetchChartData() {
    setIsLoading(true);
    console.count('fetchChartData')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject("API request fail");
        resolve(staticData.topics);

        if (!staticData.topics) {
          reject('Data is not valid');
        }

      }, 1500);  // simlate "slower" requeset 
    }).catch(err => {
      setError(err);
      setIsLoading(false);
    })

  }


  const getChartData = useCallback(async () => {

    const res = await fetchChartData();
    //    if (!res) return;
    try {
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
      setError('Something went wrong');
      setIsLoading(false);
    }

  });

  // Only called once - on app load
  useEffect(() => {
    console.count('use effect')

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
