export type RgbColor = [number, number, number, number?];

export type ResourceItem = { resourceId: number; resourceName?: string };

export type TableHeaderItem = {
  sort?: number;
  id?: number;
  key?: string;
  name?: string;
  selected?: boolean;
  disable?: boolean;
  title?: string;
  dataIndex?: string;
  width?: number;
  fixed?: string;
  render?: unknown;
};

export type KeyVal = { [key: string]: string };
