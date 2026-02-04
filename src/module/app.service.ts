import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    healthCheck() {
        return 'Healthy';
    }
}
