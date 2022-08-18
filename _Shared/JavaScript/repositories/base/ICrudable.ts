import {IModel} from "../../models/base/IModel";
import {IReadable} from "./IReadable";
import {IWritable} from "./IWritable";

export interface ICrudable<T extends IModel> extends IReadable<T>, IWritable<T> {
}