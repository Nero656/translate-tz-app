export class ItemType {
    'id': number;
    'order': number;
    'text': string;
    "enabled": boolean;
}

export class BoardType {
    'id': number;
    'items': ItemType[];
}
