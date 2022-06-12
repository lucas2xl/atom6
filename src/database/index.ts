import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../dtos/userDTO';

export const database = {
  key: '@atom6_teste',
  async createUser(user: IUser): Promise<void> {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(`${this.key}:user`, jsonValue);
  },

  async getUser(): Promise<IUser | null> {
    const jsonValue = await AsyncStorage.getItem(`${this.key}:user`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(`${this.key}:user`);
  },
};
