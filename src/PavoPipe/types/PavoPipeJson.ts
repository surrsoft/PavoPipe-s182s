import { FieldName, FieldDesc, FieldValue } from "./types";

/**
 * !pp-object! - представление формата PavoPipe в виде JS объекта
 */
export interface PavoPipeObj {
  /** !pp-k-arr! - поля с данными */
  data: Record<FieldName, FieldValue>[];
  /** !pp-d-arr! - описание полей */
  descriptions: Record<FieldName, FieldDesc>;
}
