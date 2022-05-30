import React from 'react'
import './customWordCloud.css';

export default function CustomWordCloudComponent({ chartData, topicUpdate }) {


    function handleClick(selectedTopicId) {
        return topicUpdate(selectedTopicId);
    }

    return (

        chartData.map(function (topic, i) {
            return <a className="topic" key={i} style={{ fontSize: topic.fontSize + 'px', color: topic.color }} onClick={() => handleClick(i)}>
                {topic.name}
            </a >
        })
    )

}
