import React from 'react'
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder'

export default function InfoBox({ selectedTopic }) {
    console.log('InfoBox selected topic ', selectedTopic)

    return (
        !selectedTopic ? <InfoBoxEmptyPlaceholder></InfoBoxEmptyPlaceholder> : 
        <>
            <h2>Information on the topic: {selectedTopic.label} </h2>

            <p>Total Mentions: {selectedTopic.volume ? selectedTopic.volume : 0}</p>

            <ul>
                <li>Positive Mentions:
                    <span className='text-green'>
                        {selectedTopic.sentiment?.positive ? selectedTopic.sentiment.positive : 0}
                    </span>
                </li>
                <li>Neutral Mentions: {selectedTopic.sentiment?.neutral ? selectedTopic.sentiment.neutral : 0}</li>
                <li>Negative Mentions:
                    <span className='text-red'>
                        {selectedTopic.sentiment?.negative ? selectedTopic.sentiment.negative : 0}
                    </span>
                </li>
            </ul>
        </>
    )
}
