import {Module} from '@nestjs/common';
import {TaskModule} from './task/task.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TaskModule, UserModule,
        // DECOUPLE
        // TypeOrmModule.forRoot({
        //     type: "postgres",
        //     host: "localhost",
        //     port: 5432,
        //     username: "enginooby",
        //     password: "password",
        //     database: "task_manager",
        //     autoLoadEntities: true,
        //     synchronize: true,
        // })
    ],
})
export class AppModule {
}
