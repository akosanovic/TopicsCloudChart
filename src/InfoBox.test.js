import { render, screen } from "@testing-library/react"
import InfoBox from "./InfoBox"

it("Info Box EmptyPlaceholder exists", () => {
    render(<InfoBox />);
    expect(screen.getByText("Click on the topic to see more info")).toBeInTheDocument();
})


it("Selected topic missing values", () => {
    render(<InfoBox selectedTopic={{ "id": "1751295897__DJ", "label": "DJ" }} />);

    expect(screen.getByText("Information on the topic: DJ")).toBeInTheDocument();
    expect(screen.getByText("Total Mentions: 0")).toBeInTheDocument();
})