import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import wordcloud from 'highcharts/modules/wordcloud'

export default function WordCloudChart({ chartData, topicUpdate }) {

    var selectedTopicId = null;
    var [data, setData] = useState();
    data = chartData;

    wordcloud(Highcharts);


    function handleOnTopicSelect() {
        return topicUpdate(selectedTopicId);
    }

    let weightsArray = [];

    Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (relativeWeight) {
        // relativeWeight = relativeWeight * 10;
        var maxFontSize = 8;
        // Will return a fontSize between 0px and 25px.
        let weight = Math.floor(maxFontSize * relativeWeight);

        // !weightsArray.includes(weight) ? weightsArray.push(weight) : console.log('exists');

        weightsArray.push(weight * 12.5)

        // console.log('final weight ', weightsArray.includes(weight));
        return weight ? weight * 10 : 8;
    };

    console.log('weightsArray ', weightsArray);

    var options = {
        series: [{
            type: 'wordcloud',
            data,
            name: 'Occurrences', //Todo: change the name on tooltip
            rotation: { // Disable word rotation
                from: 0,
                to: 0,
            },
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
        }]
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
    )
}
