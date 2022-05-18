import React from 'react'
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder'

export default function InfoBox({ selectedTopic }) {

    return (

        <>
            {!selectedTopic && <InfoBoxEmptyPlaceholder placeholderText={"Click on the topic to see more info"} />}

            {selectedTopic && <>

            <h2>Information on the topic: {selectedTopic.label} </h2>

            <p>Total Mentions: {selectedTopic.volume ? selectedTopic.volume : 0}</p>


                <p data-testid="positive">Positive Mentions:
                    <span className='text-green'>
                        {selectedTopic.sentiment?.positive ? selectedTopic.sentiment.positive : 0}
                    </span>
                </p>
                <p>Neutral Mentions: {selectedTopic.sentiment?.neutral ? selectedTopic.sentiment.neutral : 0}</p>
                <p data-testid="negative">Negative Mentions:
                    <span className='text-red'>
                        {selectedTopic.sentiment?.negative ? selectedTopic.sentiment.negative : 0}
                    </span>
                </p>
            </>
            }
        </>
    )
}
