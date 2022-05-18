// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import WordCloudChart from './WordCloudChart';
import data from './topics.json'
import { COLOR_GREEN, COLOR_GREY, COLOR_RED } from './Config';

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

    let assignedColor = COLOR_GREY;
    if (sentimentScore > 60) return assignedColor = COLOR_GREEN;
    if (sentimentScore < 40) return assignedColor = COLOR_RED;

    return assignedColor;
  };




  // useEffect(() => {
  //   // localStorage.setItem(LOCAL_STORAGE_SELECTED_TOPIC, JSON.stringify(selectedTopic));
  //   selectedTopic = selectedTopic ? selectedTopic : null;
  // }, [selectedTopic])

  // // // Only called once - on app load
  // useEffect(() => {
  //   console.log('Todo: handle set chart data');
  // //   selectedTopic = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TOPIC));
  // }, [])




  function onTopicSelected(selectedId) {
    setSelectedTopic(() => { return topics[selectedId] });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1> My Topics Challenge </h1>
      </header>

      <div className='app-content'>
        <div className="chartContainer">
          <WordCloudChart topicUpdate={onTopicSelected} chartData={chartData}></WordCloudChart>
        </div>

        <div className='infoBox-container'>
          <InfoBox selectedTopic={selectedTopic}></InfoBox>
        </div>
      </div>
    </div>
  );
}

export default App;
