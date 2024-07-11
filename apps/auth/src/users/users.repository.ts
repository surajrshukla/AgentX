import { Abstractrepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from '@app/common/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends Abstractrepository<UserDocument> {
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
}
