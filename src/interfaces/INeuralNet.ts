
export interface INeuralNetConfig {
    inputAxonCount: number;
    outputAxonCount: number;
    hiddenLayerAxonCount: number[];
    instantReaction?: boolean;
}

export interface INeuralNet {
    run(input: number[]): void;
    output: number[];
}
