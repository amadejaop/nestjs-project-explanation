import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

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
    }
}
