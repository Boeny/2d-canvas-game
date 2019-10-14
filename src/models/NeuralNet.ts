import { INeuralNet, INeuralNetConfig } from "interfaces";
import { Helpers } from "helpers";

class Neuron {
    public inputKoef: number[] = [];
    public output = 0;
    public nextLayer: Neuron[] = [];

    constructor(inputKoef?: number[]) {
        if (inputKoef) {
            this.inputKoef = inputKoef;
        }
    }

    public run(input: number[]) {
        const sum = input.reduce((result, value, i) => result + value * this.inputKoef[i], 0);
        this.output = Helpers.lerp(0, 1, 0, input.length, sum);
    }
}

 // TODO: implement
export class NeuralNet implements INeuralNet {

    /** Config */
    private instantReaction?: boolean;
    /** Neurons */
    private layers: Neuron[][] = [];

    public get output(): number[] {
        return this.layers[this.layers.length - 1].map(n => n.output);
    }

    constructor({ inputAxonCount, outputAxonCount, hiddenLayerAxonCount, instantReaction }: INeuralNetConfig) {
        this.instantReaction = instantReaction;
        this.layers = this.getLayers(inputAxonCount, outputAxonCount, hiddenLayerAxonCount);
    }

    private getLayers(inputAxonCount: number, outputAxonCount: number, hiddenLayerAxonCount: number[]): Neuron[][] {

        const outputLayer = Helpers.range(1, outputAxonCount).map(() => new Neuron());
        const layers: Neuron[][] = [Helpers.range(1, inputAxonCount).map(() => new Neuron([1]))];

        for (let i = 1; i < hiddenLayerAxonCount.length; i += 1) {

            const layer: Neuron[] = [];

            for (let j = 0; j < hiddenLayerAxonCount[i - 1]; j += 1) {

                const neuron = new Neuron();
                layers[i - 1].forEach(n => {
                    n.nextLayer.push(neuron);
                    neuron.inputKoef.push(1);
                });

                if (i === hiddenLayerAxonCount.length - 1) {
                    outputLayer.forEach(n => {
                        neuron.nextLayer.push(n);
                        n.inputKoef.push(1);
                    });
                }
                layer.push(neuron);
            }
            layers.push(layer);
        }
        return layers;
    }

    private provideDataToTheNextLayer = (layer: Neuron[], input: number[]) => {
        layer.forEach(n => n.run(input));
    }

    public run(input: number[]) {
        this.layers.forEach((l, i) => {
            if (i === 0) {
                this.provideDataToTheNextLayer(l, [input[i]]);
            }
            else {
                this.provideDataToTheNextLayer(l, this.layers[i - 1].map(n => n.output));
            }
        });
    }
}
