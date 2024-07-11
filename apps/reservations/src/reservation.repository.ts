import { Abstractrepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ReservationDocument } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends Abstractrepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationDocument.name);

    constructor(
        @InjectModel(ReservationDocument.name)
        reservationModel: Model<ReservationDocument>,
    ) {
        super(reservationModel);
    }
}
