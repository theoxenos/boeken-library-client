import {type MouseEvent, useState} from "react";

type TStarRatingProps = {
    value: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
    max?: number;
};

const StarRating = ({value, onChange, readOnly = false, max = 5}: TStarRatingProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const activeIndex = hovered !== null ? hovered : value;

    const getIcon = (index: number) => {
        if (activeIndex >= index + 1) return "bi-star-fill";
        if (activeIndex >= index + 0.5) return "bi-star-half";
        return "bi-star";
    };

    const handleMouseMove = (index: number, event: MouseEvent<HTMLSpanElement>) => {
        const rect = (event.target as HTMLSpanElement).getBoundingClientRect();
        const mouseOffsetX = event.clientX - rect.left;
        setHovered(mouseOffsetX < rect.width / 2 ? index + 0.5 : index + 1);
    };

    return (
        <div
            className="d-inline-flex text-warning fs-5"
            style={{cursor: readOnly ? "default" : "pointer"}}
        >
            {Array.from({length: max}).map((_, index) => (
                <span
                    key={index}
                    className={`bi ${getIcon(index)}`}
                    style={{
                        transition: "transform 0.1s ease, color 0.15s ease",
                        transform: !readOnly && hovered !== null && index <= hovered ? "scale(1.25)" : "scale(1)",
                        color: index < activeIndex ? "#ffc107" : "#d3d3d3",
                    }}
                    onMouseMove={(event) => !readOnly && handleMouseMove(index, event)}
                    onMouseLeave={() => !readOnly && setHovered(null)}
                    onClick={() => !readOnly && onChange?.(hovered!)}
                />
            ))}
        </div>
    );
};

export default StarRating;
