import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { ReadBookDto } from './dtos/read-book.dto';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { In } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(bookId: number): Promise<ReadBookDto> {
    if (!bookId) {
      throw new BadRequestException('es requerido el id del libro');
    }
    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!book) {
      throw new NotFoundException('El libro que solicitas no existe');
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE' },
    });
    return books.map(book => plainToClass(ReadBookDto, book));
  }

  async getBooksByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) {
      throw new BadRequestException('Es necesario el id del author');
    }

    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE', authors: In([authorId]) },
    });

    return books.map(books => plainToClass(ReadBookDto, books));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: 'AVTIVE' },
      });

      if (!authorExists) {
        throw new NotFoundException(
          `Este no es un autor con este Id: ${authorId}`,
        );
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException('Este usuario no es un autor');
      }

      authors.push(authorExists);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async createByAuthor(
    book: Partial<CreateBookDto>,
    authorId: number,
  ): Promise<ReadBookDto> {
    const author = await this._userRepository.findOne(authorId, {
      where: { status: 'INACTIVE' },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.AUTHOR,
    );

    if (!isAuthor) {
      throw new UnauthorizedException('Este usuario no es un autor');
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async update(
    bookId: number,
    book: Partial<UpdateBookDto>,
    authorId: number,
  ): Promise<ReadBookDto> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException(
        'El libro que intentas actualizar no se encuentra',
      );
    }

    const esPropietario = bookExists.authors.some(
      author => author.id === authorId,
    );

    if (!esPropietario) {
      throw new UnauthorizedException(
        'No eres author de este libro, no puedes actualizar',
      );
    }
    const updateBook = await this._bookRepository.update(bookId, book);
    return plainToClass(ReadBookDto, updateBook);
  }

  async delete(bookId: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('Este libro no existe');
    }

    await this._bookRepository.update(bookId, { status: 'INACTIVE' });
  }
}
