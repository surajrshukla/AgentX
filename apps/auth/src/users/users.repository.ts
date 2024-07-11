import { Abstractrepository, UserDocument } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends Abstractrepository<UserDocument> {
    protected readonly logger = new Logger(UserDocument.name);

    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
}
