import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import wordcloud from 'highcharts/modules/wordcloud'
import { NO_OF_SIZE_VARIENTS } from './Config';

export default function WordCloudChart({ chartData, topicUpdate }) {

    var selectedTopicId = null;
    var [data, setData] = useState();
    data = chartData;

    wordcloud(Highcharts);


    function handleOnTopicSelect() {
        return topicUpdate(selectedTopicId);
    }

    // Limit the no of font size variants in the chart 
    Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (relativeWeight) {
        // Each topic should have one of 6 different text sizes
        // with the most popular topics largest, and least popular smallest 
        // https://gist.github.com/vsomogyi/5d6de0be7caa73dcdd602f61cede1421#file-topics-json
        let weight = Math.round(NO_OF_SIZE_VARIENTS * relativeWeight);
        // min font size to 8
        return weight ? weight * 10 : 8;
    };

    var options = {
        series: [{
            type: 'wordcloud',
            data,
            name: 'Popularity',
            rotation: { // Disable word rotation
                from: 0,
                to: 0,
            },
            minFontSize: 8,

            style: {
                fontFamily: 'Verdana',
            },
            point: {
                events: { 
                    click: function (event) { // Dispatch Event: show info box on topic click 
                        selectedTopicId = event.point.index;
                        handleOnTopicSelect();
                    }
                }
            }
        }],
        chart: {
            marginTop: 0,
            marginBottom: 0,
            "type": "wordcloud",
        },
        title: {
            text: ''
        }
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
    )
}
