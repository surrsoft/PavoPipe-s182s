import { FieldName, FieldDesc, FieldValue } from "./types";

/**
 * Представление PavoPipe в формате JSON
 */
export interface PavoPipeJson {
  /** Массив объектов с данными */
  data: Record<FieldName, FieldValue>[];
  /** Массив объектов с описаниями полей */
  descriptions: Record<FieldName, FieldDesc>;
}
