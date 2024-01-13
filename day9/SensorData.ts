import { exit } from "process";

export class SensorData {

    private mappedData: number[][];

    constructor(dataPoints: number[]) {
        this.mappedData = this.calculate(dataPoints);
    }

    public extrapolateForward(): number {
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

    public extrapolateBackwards(): number {
        let m = this.mappedData;

        for (let i = m.length - 1; i >= 0; i--) {
            if (i + 1 >= m.length) {
                m[i].unshift(0);
            } else {
                m[i].unshift(m[i][0] - m[i+1][0]);
            }
        }

        return m[0][0];
    }

    private calculate(dataPoints: number[]): number[][] {
        let dataMap: number[][] = [];
        dataMap.push(dataPoints);

        let cur = 0;
        while (!dataMap[cur].every(v => v === 0)) {
            let row: number[] = [];

            for (let i = 1; i < dataMap[cur].length; i++) {
                row.push(dataMap[cur][i] - dataMap[cur][i-1]); //2105961943
            }

            dataMap.push(row);
            cur++;
        }

        return dataMap;
    }

}