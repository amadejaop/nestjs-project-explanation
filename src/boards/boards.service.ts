import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where: {id: id}});

        if (!found) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }

        return found;
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        await this.boardRepository.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log(result);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }


    /* private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        // destructuring
        const { title, description } = createBoardDto;
        const board: Board = {
            // title: title, can omit : title because values are the same
            id: uuid(), // db makes the id automatically upon creation
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        //put this object in the array created above
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find(board => board.id === id);

        if (!found) {
            throw new NotFoundException(`Cant find board with id ${id}`);
        }

        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        // create a new array with boards where id does NOT match the id provided for deletion of a board
        this.boards = this.boards.filter(board => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    } */
}
