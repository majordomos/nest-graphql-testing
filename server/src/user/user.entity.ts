import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
@ObjectType()
export class User {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;
    @Prop()
    @Field(() => String)
    firstName: string;
    @Prop()
    @Field(() => String)
    lastName: string;
    @Prop()
    @Field(() => String)
    email: string;
    @Prop()
    @Field(() => String)
    password: string;
    @Prop()
    @Field(() => String)
    role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
    const user = this;

    if (this.isModified || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});

export { UserSchema };