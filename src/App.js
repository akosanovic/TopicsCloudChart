// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder';
import WordCloudChart from './WordCloudChart';
import data from './topics.json'

// const LOCAL_STORAGE_SELECTED_TOPIC = 'selectedTopic';

function App() {
  var chartData, selectedTopic; 
  var [selectedTopic, setSelectedTopic] = useState();

  const topics = data.topics;

  chartData = topics.map(topic => {
    return {
      name: topic.label,
      weight: topic.volume,
      color: getTopicColor(topic.sentimentScore)
    }
  });

  function getTopicColor(sentimentScore) {
    const red = "#ff5277";
    const green = "#6fcdcd";
    const grey = "#666666"

    let assignedColor = grey;
    if (sentimentScore > 60) return assignedColor = green;
    if (sentimentScore < 40) return assignedColor = red;

    return assignedColor;
  };




  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_SELECTED_TOPIC, JSON.stringify(selectedTopic));
    selectedTopic = selectedTopic ? selectedTopic : null;
  }, [selectedTopic])

  // // Only called once - on app load
  useEffect(() => {
    console.log('Todo: handle set chart data');
  //   selectedTopic = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TOPIC));
  }, [])




  function onTopicSelected(selectedId) {
    setSelectedTopic(() => { return topics[selectedId] });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> My Topics Challenge </h1>
      </header>

      {/* <div className='content' style={{ display: 'flex' }}> */}
      <div>

        <WordCloudChart className="chartContainer" topicUpdate={onTopicSelected} chartData={chartData}></WordCloudChart>

        <div className='infoBox-container'>
          {selectedTopic ? <InfoBox selectedTopic={selectedTopic}></InfoBox> : <InfoBoxEmptyPlaceholder></InfoBoxEmptyPlaceholder>}
        </div>
      </div>
    </div>
  );
}

export default App;
