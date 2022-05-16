import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import wordcloud from 'highcharts/modules/wordcloud'

export default function WordCloudChart({ chartData, onTopicUpdate }) {

    var selectedTopicId = null;
    var [data, setData] = useState();
    data = chartData;

    wordcloud(Highcharts);


    function handleOnTopicSelect() {
        return onTopicUpdate(selectedTopicId);
    }


    var options = {
        series: [{
            type: 'wordcloud',
            data,
            name: 'Occurrences',
            point: {
                events: {
                    click: function (event, asdf) {

                        selectedTopicId = event.point.index;
                        handleOnTopicSelect();

                        // console.log('event ', event);
                        // console.log('asdf ', event.point.index, ' ', event.point.name)
                        // alert('Category: ' + this.category + ', value: ' + this.y);
                    }
                }
            }
        }]
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
    )
}
