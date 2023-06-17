import { Injectable } from '@nestjs/common';
import { UserEntity } from '../User/Controller/userEtity';

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async toSave(user: UserEntity) {
        this.users.push(user);
    }

    async list() {
        return this.users;
    }

    async existsWithEmail(email: string) {
        const possibleUser = this.users.find(
            user => user.email === email
        );

        return possibleUser !== undefined;
    }

    private searchId(id: string) {
        const possibleUser = this.users.find(
            user => user.id === id
        );

        if (!possibleUser) {
            throw new Error('User does not exist');
        }

        return possibleUser;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = this.searchId(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async deleteUser(id: string) {
        const user = this.searchId(id);
        this.users = this.users.filter(userSaved => userSaved.id !== id);

        return user;
    }
}
