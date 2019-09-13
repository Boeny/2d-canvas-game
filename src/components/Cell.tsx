import React from "react";
import { RegularPolygon } from "react-konva";
import { observable, runInAction, action } from "mobx";
import { observer } from "mobx-react";
import { Helpers } from "helpers";

interface IColor {
    r: number;
    g: number;
    b: number;
}

export class ICell {

    divisionCount = 0;
    radius = 10;

    minInitialSubstanceConcentration = 0.01;
    maxDivisionCount = 5;

    color: IColor;
    initialSubstanceConcentration: number;

    @observable
    x = 0;

    @observable
    y = 0;

    @observable
    children: ICell[] = [];

    constructor(x: number, y: number, initialSubstanceConcentration: number, color: IColor) {
        this.move(x, y);
        this.initialSubstanceConcentration = initialSubstanceConcentration;
        this.color = {
            r: Helpers.clamp(color.r + Helpers.random(-50, 50), 0, 255),
            g: Helpers.clamp(color.g + Helpers.random(-50, 50), 0, 255),
            b: Helpers.clamp(color.b + Helpers.random(-50, 50), 0, 255)
        };
    }

    @action
    move(deltaX: number, deltaY: number) {
        this.x += deltaX;
        this.y += deltaY;
        this.children.forEach(cell => cell.move(deltaX, deltaY));
    }

    clone() {
        if (this.divisionCount >= this.maxDivisionCount) {// || this.initialSubstanceConcentration < this.minInitialSubstanceConcentration) {
            return;
        }
        this.divisionCount += 1;
        this.initialSubstanceConcentration = this.initialSubstanceConcentration / 2;

        const delta = 2 * this.radius;
        runInAction(() => {
            this.children.forEach(cell => cell.move(delta, 0));
            this.children.push(new ICell(this.x + delta, this.y, this.initialSubstanceConcentration, this.color));
        });
    }
}

interface IProps {
    item: ICell;
}

@observer
export class Cell extends React.PureComponent<IProps> {

    showConcentration = false;

    get color(): IColor {

        const { item } = this.props;

        if (this.showConcentration) {
            const c = 255 * (1 - item.initialSubstanceConcentration);
            return { r: c, g: c, b: c };
        }
        return item.color;
    }

    public render() {

        const { item } = this.props;
        const color = this.color;

        return (
            <React.Fragment>
                <RegularPolygon
                    x={item.x}
                    y={item.y}
                    sides={6}
                    radius={item.radius}
                    fill={`rgb(${color.r}, ${color.g}, ${color.b})`}
                    stroke="black"
                    shadowBlur={1}
                    onClick={() => item.clone()}
                />
                {item.children.map((x, i) => <Cell key={i} item={x} />)}
            </React.Fragment>
        );
    }
}
