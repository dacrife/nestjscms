import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ReadBookDto } from './dtos/read-book.dto';
import { CreateBookDto } from './dtos/create-book.dto';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/roletype.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { GetUser } from '../auth/user.decorator';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':bookId')
  getBook(
    @Param('bookIid', ParseIntPipe) bookId: number,
  ): Promise<ReadBookDto> {
    return this.bookService.get(bookId);
  }

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this.bookService.getAll();
  }

  @Get('author/:authorId')
  @UseGuards(AuthGuard())
  getBooksByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<ReadBookDto[]> {
    return this.bookService.getBooksByAuthor(authorId);
  }

  @Post('create')
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(@Body() book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this.bookService.create(book);
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBookByAuthor(
    @Body() book: Partial<CreateBookDto>,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this.bookService.createByAuthor(book, authorId);
  }

  @Patch(':bookId')
  updateBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() book: Partial<UpdateBookDto>,
    @GetUser('id') authorId: number,
  ) {
    return this.bookService.update(bookId, book, authorId);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<void> {
    return this.bookService.delete(bookId);
  }
}
