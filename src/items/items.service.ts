import { Body, Injectable, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/items.interfaces';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(@Param('id') id): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async Create(item: Item): Promise<Item> {
    const newItem = await this.itemModel.create(item);
    return await newItem.save();
  }

  async delete(@Param('id') id): Promise<Item> {
    return await this.itemModel.findOneAndDelete({ _id: id });
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item);
  }
}
