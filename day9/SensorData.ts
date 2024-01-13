import { exit } from "process";

export class SensorData {

    private mappedData: number[][];

    constructor(dataPoints: number[]) {
        this.mappedData = this.calculate(dataPoints);
    }

    public getResult() {
        let m = this.mappedData;

        for (let i = m.length - 1; i >= 0; i--) {
            if (i + 1 >= m.length) {
                m[i].push(0);
            } else {
                m[i].push(m[i][m[i].length-1] + m[i+1][m[i+1].length-1])
            }
        }
    
        return m[0][m[0].length - 1];
    }

    // Map into a 2d array where each subsequenc calculation is pre filled with zeros.
    private calculate(dataPoints: number[]): number[][] {
        let dataMap: number[][] = [];
        dataMap.push(dataPoints);

        let cur = 0;
        while (!dataMap[cur].every(v => v === 0)) {
            let row: number[] = [];
            let start = cur + 1;
            row.push(...Array(start).fill(0));

            for (let i = start; i < dataMap[cur].length; i++) {
                row.push(dataMap[cur][i] - dataMap[cur][i-1]);
            }

            dataMap.push(row);
            cur++;
        }

        return dataMap;
    }

}