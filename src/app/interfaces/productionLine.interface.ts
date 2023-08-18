import { ObjectItem } from "./object.interface";

export interface ProductionLine {
    _id: string,
    productionLineTitle: string,
    productionLineInputs: ObjectItem[],
    productionLineOutputs: ObjectItem[],
}