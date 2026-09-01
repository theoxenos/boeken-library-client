import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, vi} from "vitest";
import StarRating from "./StarRatingComponent.tsx";

describe("StarRating", () => {
    test("renders the correct number of stars (default max = 5)", () => {
        render(<StarRating value={0}/>);
        // each star is a <span> with class "bi"
        const stars = document.querySelectorAll(".bi");
        expect(stars).toHaveLength(5);
    });

    test("renders correct number of stars when max is overridden", () => {
        render(<StarRating value={0} max={3}/>);
        const stars = document.querySelectorAll(".bi");
        expect(stars).toHaveLength(3);
    });

    test("filled stars reflect the value prop", () => {
        render(<StarRating value={3}/>);
        const stars = document.querySelectorAll(".bi");
        // first 3 should be filled, last 2 empty
        expect(stars[0].className).toContain("bi-star-fill");
        expect(stars[1].className).toContain("bi-star-fill");
        expect(stars[2].className).toContain("bi-star-fill");
        expect(stars[3].className).toContain("bi-star");
        expect(stars[4].className).toContain("bi-star");
    });

    test("cursor is 'default' when readOnly", () => {
        render(<StarRating value={0} readOnly/>);
        const container = document.querySelector(".d-inline-flex");
        expect(container?.getAttribute("style")).toContain("cursor: default");
    });

    test("cursor is 'pointer' when not readOnly", () => {
        render(<StarRating value={0}/>);
        const container = document.querySelector(".d-inline-flex");
        expect(container?.getAttribute("style")).toContain("cursor: pointer");
    });

    test("calls onChange when a star is clicked", () => {
        const onChange = vi.fn();
        render(<StarRating value={0} onChange={onChange}/>);
        const stars = document.querySelectorAll(".bi");

        // Simulate mouse move over the right half of star index 2, then click
        fireEvent.mouseMove(stars[2], {
            clientX: 999, // large value → right half → hovered = 3
            target: {getBoundingClientRect: () => ({left: 0, width: 20})},
        });
        fireEvent.click(stars[2]);

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("does not call onChange when readOnly", () => {
        const onChange = vi.fn();
        render(<StarRating value={3} onChange={onChange} readOnly/>);
        const stars = document.querySelectorAll(".bi");

        fireEvent.mouseMove(stars[1]);
        fireEvent.click(stars[1]);

        expect(onChange).not.toHaveBeenCalled();
    });

    test("resets hovered state on mouse leave", () => {
        render(<StarRating value={5}/>);
        const stars = document.querySelectorAll(".bi");

        fireEvent.mouseMove(stars[0], {
            clientX: 999,
            target: {getBoundingClientRect: () => ({left: 0, width: 20})},
        });
        fireEvent.mouseLeave(stars[0]);

        // After leave, value=5 → all stars filled
        expect(stars[4].className).toContain("bi-star-fill");
    });
});