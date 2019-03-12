import { iTag } from './tag.interface';

export interface iProduct {
    id: number
    name: string;
    description: string;
    price: number;
    imageUrls: string;
    stockCount: number;
    tagString: string;
    tags: iTag[];
    inStoreOnly: boolean;
  }
  