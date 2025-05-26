type RgbColor = [number, number, number, number?];
type ResourceItem = {
    resourceId: number;
    resourceName?: string;
};
type TableHeaderItem = {
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
type KeyVal = {
    [key: string]: string;
};

export type { KeyVal, ResourceItem, RgbColor, TableHeaderItem };
