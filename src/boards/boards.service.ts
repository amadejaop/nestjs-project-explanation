import { Injectable } from '@nestjs/common';
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
        return this.boards.find(board => board.id === id);
    }

    deleteBoard(id: string): void {
        // create a new array with boards where id does NOT match the id provided for deletion of a board
        this.boards = this.boards.filter(board => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
