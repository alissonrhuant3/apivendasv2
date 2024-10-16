import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import { IUsersRepository } from '@modules/users/domains/repositories/IUsersRepository';
import { IReqCreateUser } from '@modules/users/domains/models/IReqCreateUser';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({name, email, password}: IReqCreateUser): Promise<User> {
    const user = this.ormRepository.create({name, email, password});

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);

    return updatedUser;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}

