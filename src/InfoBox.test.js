import { render, screen } from "@testing-library/react"
import InfoBox from "./InfoBox"

it("Info Box EmptyPlaceholder exists", () => {
    render(<InfoBox />);
    expect(screen.getByText(/Click on the topic to see more info/i)).toBeInTheDocument();
})


test("Selected topic missing values", () => {
    render(<InfoBox selectedTopic={{ "id": "1751295897__DJ", "label": "DJ" }} />);

    expect(screen.getByText(/Information on the topic: DJ/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Mentions: 0/i)).toBeInTheDocument();
})

it("Selected topic Happy Path", () => {
    render(<InfoBox selectedTopic={{ "id": "1751295897__DJ", "label": "DJ", "volume": 48, "sentiment": { "neutral": 46, "positive": 2 } }} />);

    expect(screen.getByText("Information on the topic: DJ")).toBeInTheDocument();
    expect(screen.getByText("Total Mentions: 48")).toBeInTheDocument();
    expect(screen.getByText("Neutral Mentions: 46")).toBeInTheDocument();
    expect(screen.getByTestId('positive')).toHaveTextContent('Positive Mentions:2');
    expect(screen.getByTestId('negative')).toHaveTextContent('Negative Mentions:0');

})